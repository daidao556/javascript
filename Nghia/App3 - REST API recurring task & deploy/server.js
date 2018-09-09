
const crawler = require('./crawlvnexpress.js')

const interval = 3600000;
const timeout = interval * 10;

let knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'crawler'
    }
});
let oldData = [];
(async () => {
    oldData = await knex.select('*').from('articles').orderBy('id', 'desc').limit(15);
    (function pollFunc(fn, timeout, interval) {
        let startTime = (new Date()).getTime();
        curData = crawler.data;
        interval = interval || 1000,
            canPoll = true;

        (function p() {
            canPoll = ((new Date).getTime() - startTime) <= timeout;
            if (!fn() && canPoll) {
                setTimeout(p, interval);
            }
        })();
    })(() => { crawlAndInsertData(); }, timeout, interval);
})();



function comparer(otherArray) {
    return function (current) {
        return otherArray.filter(function (other) {
            return other.url === current.url;
        }).length == 0;
    }
}

function differentFromOld(newData, oldData) {
    return onlyInNewData = newData.filter(comparer(oldData));
}

async function insertData(data) {
    data = data.map(i => ({
        title: i.title,
        summary: i.summary,
        url: i.url,
        imageUrl: i.imageUrl,
        pubDate: i.pubDate || new Date().toISOString().slice(0, 19).replace('T', ' '),
        category: i.category || 'unknown'
    }));
    data.forEach(item => {
        (async () => {
            await knex('articles').insert(item);
        })()
    });
}

async function crawlAndInsertData() {
    await crawler.crawlVnexpress();
    let difData = await differentFromOld(crawler.data, oldData);
    insertData(difData);
    oldData = Object.assign(crawler.data);
};


