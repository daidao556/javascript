const express = require('express');
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


let knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'crawler'
    }
});

app.get('/search', (req, res) => {
    let searchStr = req.query.string || '';
    searchStr = searchStr.toString().toLowerCase();
    knex('articles').where('title', 'like', '%' + searchStr + '%').then(result => { res.send(result); });
})

app.get('/paging', (req, res) => {
    let limit = req.query.limit || 10;
    let pageID = req.query.pageID || 1;
    if (limit >= 1 && pageID >= 1) {
        knex('articles').limit(limit).offset((pageID - 1) * limit).then(result => { res.send(result); });
    }
})


app.listen(8081, () => console.log('App listening on port 8081!'))
