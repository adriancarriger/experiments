const puppeteer = require('puppeteer');

run().catch(error => console.log(error));

async function run() {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  // await browser.close();
}
