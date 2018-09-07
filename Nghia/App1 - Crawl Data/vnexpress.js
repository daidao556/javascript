const puppeteer = require('puppeteer');




(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const url = "https://vnexpress.net/";
    await page.goto(url);

    const titles = await page.evaluate(() => {

        let data = document.querySelectorAll('h3.title_news > a:not(.icon_commend)');

        data = [...data];
        //var titles;
        //if (!data.hasClass("icon_commend")) {
        let titles = data.map(i => ({
            title: i.title,
            link: i.href
        }));
        //}

        return titles;
    });

    console.log(titles);

    await browser.close();
})();