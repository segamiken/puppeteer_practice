const puppeteer = require('puppeteer');

(async () => {
  const options = {
    headless: false, // ヘッドレスをオフに
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.type('input[title="検索"]', "渋谷");
  await page.evaluate(() => {
    document.querySelector('input[value^="Google"]').click();
  });

  await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});

  await Promise.all([
    page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
    page.click('.rc > .r > a'),
  ]);
  
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
