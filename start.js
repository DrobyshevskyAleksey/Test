var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('DB/blog.db');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.get('/articles', function(req, res) {
	db.serialize(function() {
		db.all("SELECT * FROM articles", function(err, rows) {
			data = {
				"allArticles" : rows.reverse()
			};
			res.json(data);
		});
	});
});

app.post('/addArticle', function(req, res) {
	article = req.body;
	db.serialize(function() {
		db.run("INSERT INTO articles VALUES (?, ?, ?, ?, ?, ?)", article.title, article.img, article.author, article.topic, article.date, article.text);
		console.log("article inserted");
		res.end();
	});
});

var server = app.listen(3000, function() {
	console.log('Started at 3000 port');
});

process.on('SIGINT', function() {
	db.close();
	console.log('Finifhed...');
	process.close();
});