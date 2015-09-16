var express = require('express');
var exphbs  = require('express-handlebars');
var product = require('./most_popular');
var category = require('./categoryTotals');
var leastPopulerP= require('./least_populer_product');
var mostPplcategory = require('./most_populer_category');
var leastPplcategory = require('./least_populer_catergory');
var fs = require("fs"); 

var app = express();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('home');

});

app.get('/sold', function (req, res) {
	var productName = product.productsSold('./files/Nelisa Sales History.csv');
    res.render('ProductSold',{products : productName} );   

});

 app.get('/most', function (req, res) {
	var productName = product.mostPopular('./Nelisa Sales History.csv');
    res.render('mostPopulerPdt',{products : productName} );   
});  

app.get('/leastPopulerPrd', function (req, res) {
	var productName = leastPopulerP.leastPopularProduct('./files/Nelisa Sales History.csv');
    res.render('leastPopulerProduct',{products : productName} );   
});  
 app.get('/Categories', function (req, res) {
	var categoryName = category.categoryTotals('./Nelisa Sales History.csv');
    res.render('category',{category : categoryName} );   
});  
 app.get('/mostPopulerCategory', function (req, res) {
	var categoryName = mostPplcategory.mostPopularCatagory('./Nelisa Sales History.csv');
    res.render('mostPopulerCategory',{category : categoryName} );   
});  
 app.get('/leastPopulerCategory', function (req, res) {
	var categoryName = leastPplcategory.leastPopularCategory('./Nelisa Sales History.csv');
    res.render('leastPopulerCategory',{category : categoryName} );   
}); 

 
//start the server 
var port = process.env.PORT || 3000;
var server = app.listen(port,function () {

    var host = server.address().address;
    var port = server.address().port;

     console.log('Example app listening at http://%s:%s', host, port);

});
