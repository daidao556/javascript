const puppeteer = require('puppeteer');

// require("jsdom").env("", function (err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     var $ = require("jquery")(window);
// });
(() => {
    let data = {
        title: '',
        content: '',
        url: '',
        imageUrl: '',
    }

    let crawlData = {
        data: [],
        crawlVnexpress: async function () {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            const url = 'https://vnexpress.net';

            await page.goto(url);
            let _this = this;
            this.data = await page.evaluate(() => {

                let data = $('section.sidebar_home_1 > article.list_news');
                data = [...data];
                data = data.map(item => ({
                    title: item.childNodes[1].title,
                    url: item.childNodes[1].href,
                    imageUrl: item.childNodes[3].childNodes[1].childNodes[1].src
                }));
                return data;
            });
            console.log(this.data);

            await browser.close();
        },



    }
    let interval = 3600000;
    let timeout = interval * 10;

    function pollFunc(fn, timeout, interval) {
        var startTime = (new Date()).getTime();
        interval = interval || 1000,
            canPoll = true;

        (function p() {
            canPoll = ((new Date).getTime() - startTime) <= timeout;
            if (!fn() && canPoll) { // ensures the function exucutes
                setTimeout(p, interval);
            }
        })();
    }

    pollFunc(() => { crawlData.crawlVnexpress() }, timeout, interval);

})();



