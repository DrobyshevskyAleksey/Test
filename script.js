// Code goes here
$('.dropdown-toggle').dropdown();
$('.input-daterange').datepicker({
    format: "mm/dd/yyyy",
    todayBtn: "linked",
    autoclose: true,
    keyboardNavigation: false,
});
var allArticles = [];
$(function() {
	$.getJSON("JSON/objects.json", function(data) {
		for (var index in data.allArticles) {
			allArticles.push({
				title : data.allArticles[index].title,
				img : data.allArticles[index].img,
				author : data.allArticles[index].author,
				topic : data.allArticles[index].topic,
				date : new Date(data.allArticles[index].date),
				stringDate : data.allArticles[index].stringDate,
				text : data.allArticles[index].text
			});
		}
		data.articles = [allArticles[0], allArticles[1]];
		data.allArticles = [allArticles[5], allArticles[7], allArticles[1], allArticles[0], allArticles[3]];
		var pages = [];
		for (var i = 1; i < (allArticles.length / 2) + 1; i++) {
			pages.push({
				page : i
			});
		}
		data.pages = pages;
		infoPages.html(Mustache.render(pagesTempl, data));
		infoLeft.html(Mustache.render(template, data));
		infoPages.html(Mustache.render(pagesTempl, data));
		infoRight.html(Mustache.render(popularTemplate, data));
	});
}); 
var info = $("#info");
var infoLeft = $(".articles");
var infoPages = $(".pages");
var infoRight = $(".info-right");
var links = $("#links");
var template = infoLeft.html();
var pagesTempl = infoPages.html();
var popularTemplate = infoRight.html();
var imgTemplate = links.html();
var topic = 'All';
var articles = allArticles;

var createPages = function(arr){
	data.pages.length = 0;
	for(var i = 1; i<(arr.length/2)+1; i++){
		data.pages.push({page: i});
	}
	infoPages.html(Mustache.render(pagesTempl, data));
	infoPages.show();
	if(data.pages.length<2){
		infoPages.hide();
	}
};

var changeTopic = function(topicName) {
	topic = topicName;
	changeData();
	createPages(articles);
	pagination(1);
	links.hide();
	info.show();
	infoLeft.html(Mustache.render(template, data));
};

var showOne = function(title){
	array = [];
	for (var index in allArticles) {
		article = allArticles[index];
		if(article.title==title){
			array.push(article);
			break;
		}
	};
	data.articles = array;
	createPages(data.articles);
	infoLeft.html(Mustache.render(template, data));
};

var changeData = function() {
	array = [];
	if (topic === 'All') {
		array = allArticles;
	}
	for (var index in allArticles) {
		article = allArticles[index];
		if (topic === article.topic) {
			array.push(article);
		}
	}
	articles = array;
};

var pagination = function(page) {
	data.articles = [];
	data.articles.push(articles[page*2-1-1]);
	if(articles[page*2-1]){
		data.articles.push(articles[page*2-1]);
	}
	infoLeft.html(Mustache.render(template, data));
};

var search = function(kind) {
	if (kind === 'title') {
		links.hide();
		array = [];
		regexp = $("#titleSearch").val().trim().toLowerCase();
		if(regexp==''){
			return;
		}
		for (var index in allArticles) {
			article = allArticles[index];
			if (article.title.toLowerCase().search(regexp) + 1) {
				array.push(article);
			}
		}
		$("#titleSearch").val('');
	}
	if (kind === 'date') {
		if($("#startDateSearch").val()=='' & $("#endDateSearch").val()==''){
			return;
		}
		start = new Date($("#startDateSearch").val());
		end = new Date($("#endDateSearch").val());
		
		if (start > end) {
			alert("Wrong date range");
			return;
		}
		links.hide();
		array = [];
		for (var index in allArticles) {
			article = allArticles[index];
			if (article.date >= start & article.date <= end) {
				array.push(article);
			}
		}
	}
	articles = array;
	pagination(1);
	createPages(articles);
	infoLeft.html(Mustache.render(template, data));
	info.show();
};

var photoGallery = function() {
	data.articles = allArticles;
	info.hide();
	links.show();
	links.html(Mustache.render(imgTemplate, data));
};

var data = {
	allArticles: [],
	articles: articles,
	pages: []
};

//init
/*data.articles = [allArticles[0], allArticles[1]];
createPages(articles);
infoLeft.html(Mustache.render(template, data));
infoPages.html(Mustache.render(pagesTempl, data));
infoRight.html(Mustache.render(popularTemplate, data));*/

