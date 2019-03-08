import * as csvtojson from 'csvtojson';
import { differenceInDays, parse } from 'date-fns';

export class MatchingService {
  private amazonOrders;
  private amazonItems;

  public async getUpdates(pocketData) {
    console.log('saveUpdated - Started');
    await this.loadAmazonOrders();

    const updates = pocketData.reduce(this.updateRow.bind(this), []);

    console.log(`${updates.length} transactions updated`);
    console.log('saveUpdated - Done');
    return updates;
  }

  private updateRow(updates, row) {
    const urlBase = 'https://www.amazon.com/gp/your-account/order-details?ie=UTF8&orderID';
    const match = this.findBestMatch(row);
    if (match && !row.note) {
      const id = match['Order ID'];
      const description = this.amazonItems[id].Title + `\n\n${urlBase}=${id}`;
      row.note = description;

      updates.push(row);
    }

    return updates;
  }

  private findBestMatch(row) {
    if (row.original_payee.toLowerCase().match(/Amazon|amzn/) === null) {
      return;
    }
    const price = '$' + Math.abs(Number(row.amount)).toFixed(2);
    const possibleMatches = this.getPossibleMatches(price, parse(row.date));
    if (possibleMatches.length === 0) {
      return;
    } else if (possibleMatches.length === 1) {
      return possibleMatches[0];
    }

    return; // dedup in v2 🙂
  }

  private getPossibleMatches(price, input) {
    return (this.amazonOrders[price] || []).filter(
      ({ date }) => Math.abs(differenceInDays(date, input)) < 4
    );
  }

  private async loadAmazonOrders() {
    const rawOrders = await csvtojson().fromFile('./data/amazon-orders.csv');
    const rawItems = await csvtojson().fromFile('./data/amazon-items.csv');

    this.amazonOrders = rawOrders.reduce((previous, current) => {
      const total = current['Total Charged'];
      current.date = parse(current['Order Date']);
      previous[total] = previous[total] || [];
      previous[total].push(current);

      return previous;
    }, {});

    this.amazonItems = rawItems.reduce((previous, current) => {
      const id = current['Order ID'];
      previous[id] = current;

      return previous;
    }, {});
  }
}
