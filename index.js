var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.post('/addArticle', function (req, res) {
	console.log(req.body);
	res.redirect('back');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});