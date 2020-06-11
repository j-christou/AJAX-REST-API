const express = require('express');
const application = express();
const bodyParser = require('body-parser');

application.use(express.static('.'));
application.use(bodyParser.json());

const books = require('./books.js');

var connection = require('./database.js');
connection.connect(function(err) {
    if(err) {
        console.error('Error connecting to database:' + err.stack);
        return;
    }
    console.log("Database connected succesfully\r\n");
    module.exports = connection;
});

var i=0;
application.post('/books/', function(req, res) {
    console.log(JSON.stringify(req.body,null,4));
    books.push(req.body);
    var sql = require('./post.js');
    connection.query(sql.command, books[i++], function(err) {
        if(err) {
            console.log(err.stack);
            res.send('Please insert only numbers in price field');
        }
        console.log("Book inserted into database succesfully\r\n");
        res.send('Book inserted');
    });
    
});

application.get('/books/:keyword', function(req,res) {
    var keyword = req.params.keyword;
    console.log('Results for keyword: '+keyword+'');
    var sql = require('./get.js');
    connection.query(sql.command, [keyword,keyword], function(err, rows) {
        if(err) {
            throw err;
        }
        console.log(rows);
        res.send(rows);
        console.log('\r\n');
    });
});

application.listen(3000);