'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),//node-mysql module
    myConnection = require('express-myconnection'),//express-my connection module
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    categories = require('./routes/categories'),
    suppliers = require('./routes/suppliers'),
    purchases =  require('./routes/purchases');
    
var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '08386354',
      port: 3306,
      database: 'spaza'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers
app.get('/',function(req,res){res.render('index');});
app.get('/products', products.show);
app.get('/products/edit/:Id', products.get);
app.post('/products/update/:Id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/mostPopulerPrd', products.mostPopulerPrd);
app.get('/products/leastPopulerPrd', products.leastPopulerPrd);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:Id', products.delete);


app.get('/sales', sales.show); 
app.post('/sales/add',sales.add);
app.get('/sales/edit/:Id', sales.getSales);
app.post('/sales/update/:Id', sales.update);
//app.get('/sales/addSales', sales.showAdd);
app.get('/sales/delete/:Id', sales.delete);




app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/edit/:Id', categories.get);
app.post('/categories/update/:Id',categories.update);

app.get('/categories/mostPopulerCat', categories.mostPopulerCat);
app.get('/categories/leastPopulerCat', categories.leastPopulerCat);
app.get('/categories/delete/:Id', categories.delete);



app.get('/purchases', purchases.show);
app.post('/purchases/add',purchases.add);
app.get('/purchases/edit/:Id', purchases.get);
app.post('/purchases/update/:Id', purchases.update);
app.get('/purchases/delete/:Id', purchases.delete);


app.get('/suppliers', suppliers.show);
app.post('/suppliers/add',suppliers.add);
app.get('/suppliers/edit/:Id', suppliers.get);
app.post('/suppliers/update/:Id', suppliers.update);
app.get('/suppliers/delete/:Id', suppliers.delete);


app.use(errorHandler);
//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3001;

//start everything up
app.listen(portNumber, function (){
console.log('Create, Read, Update, and Delete (CRUD) spaza-app server listening on:', portNumber);
});
