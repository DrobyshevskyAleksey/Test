var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var app = express();
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(express.static(__dirname + '/'));

app.post('/addArticle', function(req, res) {
	rtitle = req.body.formTitle;
	rimg = req.body.formImg;
	rauthor = req.body.formAuthor;
	rtopic = req.body.formTopic;
	rdate = req.body.formDate;
	rtext = req.body.formText;
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
	connection.query('INSERT INTO articles VALUES ("' + rtitle + '", "' + rimg + '", "' + rauthor + '", "' + rtopic + '", "' + rdate + '", "' + rtext + '")');

	connection.query('SELECT * FROM articles', function(err, rows, fields) {
		data = {
			"allArticles" : rows.reverse()
		};
		fs.writeFileSync("JSON/example.json", JSON.stringify(data));
		res.redirect('/');
	});
	connection.end();
});

var server = app.listen(3000); 