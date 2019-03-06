import * as csvtojson from 'csvtojson';
import { differenceInDays, format, parse } from 'date-fns';
import * as fs from 'fs';
import { Parser as Json2csvParser } from 'json2csv';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

export class MatchingService {
  private amazonOrders;
  private amazonItems;

  public async saveUpdated() {
    await this.loadamazonOrders();
    const pocketData = await csvtojson().fromFile('./data/pocket.csv');

    const updated = pocketData.map(this.updateRow.bind(this));
    await this.saveAsCsv(updated);
    console.log('Update complete 🙂');
  }

  private updateRow(row) {
    const match = this.findBestMatch(row);
    if (match) {
      const id = match['Order ID'];
      const description = this.amazonItems[id].Title;
      row.Note = description;
    }

    return row;
  }

  private findBestMatch(row) {
    const price = '$' + Math.abs(Number(row.Amount)).toFixed(2);
    const possibleMatches = this.getPossibleMatches(price, parse(row.Date));
    if (possibleMatches.length === 0) {
      return;
    } else if (possibleMatches.length === 1) {
      return possibleMatches[0];
    }

    return; // dedup in v2 🙂
  }

  private getPossibleMatches(price, input) {
    return (this.amazonOrders[price] || []).filter(({ date }) => differenceInDays(date, input) < 4);
  }

  private async loadamazonOrders() {
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

  private async saveAsCsv(input) {
    const json2csvParser = new Json2csvParser();
    const csv = json2csvParser.parse(input);
    await writeFileAsync('./data/output.csv', csv);
  }
}
