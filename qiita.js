const puppeteer = require('puppeteer');

(async () => {
  const options = {
    headless: false,
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.type('input[title="検索"]', "Qiita");
  await page.evaluate(() => {
    document.querySelector('input[value^="Google"]').click();
  });
  await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});

  await Promise.all([
    page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
    page.click('.rc > .r > a'),
  ]);
  
  await Promise.all([
    page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
    page.click('.nl-SocialSignup__button')
  ]);

  await page.type('input[name="login"]', "username**");
  await page.type('input[name="password"]', "password***");
  
  await Promise.all([
    page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
    page.click('input[type=submit]')
  ]);

  await Promise.all([
    page.waitForNavigation({waitUntil: ['load', 'networkidle2']}),
    page.click('.tr-Item:nth-child(1) > .tr-Item_body > .tr-Item_title')
  ]);
  
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
