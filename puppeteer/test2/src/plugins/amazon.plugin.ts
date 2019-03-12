import * as csvtojson from 'csvtojson';
import { differenceInDays, format, parse } from 'date-fns';

import { addTag } from '../mutation-functions';

export class AmazonPlugin {
  public name = 'Amazon';
  private amazonOrders;
  private amazonItems;
  private orderTotals = {};

  public async loadAmazonOrders() {
    const rawOrders = await csvtojson().fromFile('./data/amazon-orders.csv');
    const rawItems = await csvtojson().fromFile('./data/amazon-items.csv');

    this.amazonItems = rawItems.reduce((previous, current) => {
      const id = current['Order ID'];
      previous[id] = previous[id] || [];

      previous[id].push({
        ...current,
        total: this.extractAmount(current['Item Total']),
        date: parse(current['Order Date'])
      });

      return previous;
    }, {});

    const orderGroups = rawOrders.reduce((previous, rawOrder) => {
      const id = rawOrder['Order ID'];
      previous[id] = previous[id] || [];
      previous[id].push(rawOrder);

      return previous;
    }, {});

    this.amazonOrders = Object.keys(orderGroups).reduce((previous, orderId) => {
      const orderTotal = this.getOrderTotal(orderGroups[orderId]);
      const orderKey = orderTotal.toFixed(2);
      const itemsTotal = this.getItemsTotal(this.amazonItems[orderId]);
      this.orderTotals[orderId] = {
        itemsTotal,
        charged: orderTotal,
        diffInCents: this.cents(orderTotal) - this.cents(itemsTotal)
      };
      if (this.orderTotals[orderId].diffInCents !== 0) {
        this.spreadOrderDiff(orderId);
      }
      previous[orderKey] = previous[orderKey] || [];
      previous[orderKey].push(orderId);

      return previous;
    }, {});
  }

  public needsUpdate(row) {
    const orderId = this.findBestMatch(row);

    if (orderId) {
      if (this.amazonItems[orderId].length > 1) {
        row.sharedPluginData.split = true;
        const rowCopy = JSON.parse(JSON.stringify(row));
        row.splitItems = [];
        this.amazonItems[orderId].forEach(orderItem => {
          const rowItem = JSON.parse(JSON.stringify(rowCopy));
          this.createUpdateItem(rowItem, orderItem, orderId);
          row.splitItems.push(rowItem);
        });
      } else {
        this.createUpdateItem(row, this.amazonItems[orderId][0], orderId);
      }

      return true;
    }
  }

  private createUpdateItem(row, item, orderId) {
    const itemAmount = -this.extractAmount(item['Item Total']);

    const urlBase = 'https://www.amazon.com/gp/your-account/order-details?ie=UTF8&orderID';
    const originalPrice = item.originalPrice ? `\n\nOriginal price: ${item.originalPrice}` : '';
    const description = item.Title + originalPrice + `\n\n${urlBase}=${orderId}`;
    row.note = description;
    addTag(row, 'Amazon');
    row.payee = item.Seller;
    const orderDate = item['Order Date'].split('/');
    row.date = format(
      parse(`20${orderDate[2]}-${orderDate[0]}-${orderDate[1]}`), // I know… 😐
      'YYYY-MM-DD'
    );

    if (item.Category) {
      row.sharedPluginData.amazonCateogry = item.Category;
      addTag(row, item.Category);
    }

    if (row.amount !== itemAmount) {
      row.amount = itemAmount;
    }

    if (item.originalPrice) {
      addTag(row, 'Adjustment');
    }

    if (row.sharedPluginData.split) {
      addTag(row, 'Split');
    }
  }

  // Returns an order id
  private findBestMatch(row) {
    if (row.original_payee.toLowerCase().match(/Amazon|amzn/) === null) {
      return;
    }
    const inputDate = parse(row.date);
    const priceKey = Math.abs(Number(row.amount)).toFixed(2);

    const possibleMatches = this.getPossibleMatches(priceKey, inputDate);

    if (possibleMatches.length === 0) {
      return;
    } else if (possibleMatches.length === 1) {
      return possibleMatches[0];
    }

    return possibleMatches.sort((a, b) => {
      const optionA = Math.abs(differenceInDays(a[0].date, inputDate));
      const optionB = Math.abs(differenceInDays(b[0].date, inputDate));

      return optionA - optionB;
    })[0]; // // dedup in v2 🙂
  }

  private getPossibleMatches(priceKey, input) {
    return (this.amazonOrders[priceKey] || []).filter(
      orderId => Math.abs(differenceInDays(this.amazonItems[orderId][0].date, input)) < 10
    );
  }

  private getItemsTotal(items) {
    return items.reduce((total, { total: itemTotal }) => total + itemTotal, 0).toFixed(2);
  }

  private getOrderTotal(items): number {
    return items.reduce((total, item) => total + this.extractAmount(item['Total Charged']), 0);
  }

  private spreadOrderDiff(orderId) {
    const spreadItems = this.amazonItems[orderId].length;
    const remainderInCents = this.orderTotals[orderId].diffInCents % spreadItems;
    const spreadTotalInCents = this.orderTotals[orderId].diffInCents - remainderInCents;
    const spreadInCents = spreadTotalInCents / spreadItems;

    this.amazonItems[orderId].forEach((item, index) => {
      const updateAmountInCents = spreadInCents + (index === 0 ? remainderInCents : 0);
      const amount = this.cents(this.extractAmount(item['Item Total']));
      const amountInCents = updateAmountInCents + amount;
      item.originalPrice = item['Item Total'];
      item['Item Total'] = `$${(amountInCents / 100).toFixed(2)}`;
    });
  }

  private extractAmount(input: string): number {
    return Number(input.slice(1));
  }

  private cents(input) {
    return Math.round(input * 100);
  }
}
