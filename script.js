$('.dropdown-toggle').dropdown();
$('.input-daterange').datepicker({
    format: "mm/dd/yyyy",
    todayBtn: "linked",
    autoclose: true,
    keyboardNavigation: false,
});
$('#formDate').datepicker({
	format: "mm/dd/yyyy",
    todayBtn: "linked",
    autoclose: true,
    keyboardNavigation: false,
});
$(function() {
	$.getJSON("JSON/articles.json", function(objects) {
		for (var i = 0; i<objects.allArticles.length; i++){
			allArticles.push({
				title : objects.allArticles[i].title,
				img : objects.allArticles[i].img,
				author : objects.allArticles[i].author,
				topic : objects.allArticles[i].topic,
				date : objects.allArticles[i].date,
				text : objects.allArticles[i].text
			});
		}
		data.articles = [allArticles[0], allArticles[1]];
		setMostPopular();
		createPages(allArticles);
		infoLeft.html(Mustache.render(template, data));
		infoRight.html(Mustache.render(popularTemplate, data));
	});
}); 
var info = $("#info");
var infoLeft = $(".articles");
var infoPages = $(".pages");
var infoRight = $(".info-right");
var links = $("#links");
var addForm = $(".addForm");
var template = infoLeft.html();
var pagesTempl = infoPages.html();
var popularTemplate = infoRight.html();
var imgTemplate = links.html();
var topic = 'All';
var allArticles = [];
var articles = allArticles;
var data = {
	allArticles: [],
	articles: articles,
	pages: []
};

var setMostPopular = function(){
	data.allArticles = [];
	for(var i=1; i<=5; i++){
		data.allArticles.push(allArticles[allArticles.length-i]);
	}
};

var addArticle = function(){
	info.hide();
	links.hide();
	addForm.show();
};

var dateValidation = function(date){
	regexp = /(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20|21)\d\d/;
	return regexp.test(date);
};

var validate = function(){
	if(dateValidation(document.forms.addArticleForm.formDate.value)){
		return true;
	} else {
		alert("wrong date format");
		return false;
	}
};

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
	addForm.hide();
	info.show();
	infoLeft.html(Mustache.render(template, data));
};

var showOne = function(title){
	array = [];
	for (var i=0; i<allArticles.length; i++) {
		article = allArticles[i];
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
	for (var i=0; i<allArticles.length; i++) {
		article = allArticles[i];
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
		for (var i=0; i<allArticles.length; i++) {
			article = allArticles[i];
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
		if(!(dateValidation($("#startDateSearch").val()) & dateValidation($("#endDateSearch").val()))){
			alert("wrong date format");
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
		for (var i=0; i<allArticles.length; i++) {
			article = allArticles[i];
			if (new Date(article.date) >= start & new Date(article.date) <= end) {
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
	addForm.hide();
	links.show();
	links.html(Mustache.render(imgTemplate, data));
};

