var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var app = express();

//app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.get('/articles', function(req, res){
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '0000',
		database : 'blog',
	});
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});
	connection.query('SELECT * FROM articles', function(err, rows, fields) {
		data = {"allArticles" : rows.reverse()};
		connection.end();
		res.json(data);
	});
	
});

app.post('/addArticle', function(req, res) {
	article = req.body;
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '0000',
		database : 'blog',
	});
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});
	connection.query('INSERT INTO articles VALUES ("' + article.title + '", "' + article.img + '", "' + article.author + '", "' + article.topic + '", "' + article.date + '", "' + article.text + '")');
	connection.end();
	res.end();
});

var server = app.listen(3000, function () {
  console.log('Started...');
}); 