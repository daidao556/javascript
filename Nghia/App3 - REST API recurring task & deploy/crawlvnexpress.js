const puppeteer = require('puppeteer');
const VIEWPORT = { width: 1920, height: 1080 };

(() => {
    let data = {
        title: '',
        summary: '',
        url: '',
        imageUrl: '',
    }

    module.exports = crawler = {
        data: [],
        crawlVnexpress: async function () {
            const browser = await puppeteer.launch({ args: ["--ash-host-window-bounds=1920x1080", "--window-size=1920,1048", "--window-position=0,0"] });
            const page = await browser.newPage();

            const url = 'https://vnexpress.net';
            await page.setViewport(VIEWPORT);
            await page.goto(url);

            this.data = await page.evaluate(() => {

                let data = $('section.sidebar_home_1 > article.list_news');
                data = [...data];
                data = data.map(item => ({
                    title: item.childNodes[1].innerText,
                    summary: item.childNodes[5].innerText,
                    url: item.childNodes[1].childNodes[1].href,
                    imageUrl: item.childNodes[3].childNodes[1].childNodes[1].src,
                }));
                return data;
            });

            await browser.close();
        },
    }

    //crawler.crawlVnexpress();
})();



