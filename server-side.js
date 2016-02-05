'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),//node-mysql module
    myConnection = require('express-myconnection'),//Connect/Express middleware that auto provides mysql connections 
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'), 
    session = require('express-session'),
    cookieSession =require('cookie-session'),
    //bcrypt = require('bcrypt-nodejs'),
    bcrypt = require('bcrypt'),
    request = require('request'),
    //These are my routes
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    categories = require('./routes/categories'),
    suppliers = require('./routes/suppliers'),
    purchases =  require('./routes/purchases'),
    loggin = require('./routes/login'),
    register = require('./routes/Users'),
    usrs =require('./routes/Users');
    
  
var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '08386354',
      port: 3306,
      database: 'spaza_app'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));//Connect/Express middleware provides a consistent API for MySQL connections during request/response life cycle
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

app.use(bodyParser.json());
//app.use(cookieParser());
app.use(session({ 

secret : 'a4f8071f-c873-4447-8ee2', resave : true,   saveUninitialized: true, cookie: { maxAge:2628000000 }}));

var fs = require('fs');

app.use(function(req, res, next){
  console.log('middleware!');
  //proceed to the next middleware component
  next();
});

 var contains = function(str, part){
   return str.indexOf(part) !== -1;
};

var checkUser = function(req, res, next){
  console.log("path : " + req.path);
  if (req.session.user){

    var pathNeedsAdminRights = contains(req.path, "add") || 
          contains(req.path, "edit") || 
          contains("delete");

    if(pathNeedsAdminRights && req.session.role !== "Admin"){
      //why is there are error
      res.send(500, "ACCESS DENIED");
    }

    return next();
  }


  // the user is not logged in redirect them to the login page
  res.redirect('/');
};







app.post('/home', loggin.login);

app.get('/home', function (req, res) {
    res.render('login', {layout: false})
});

app.get('/login', function (req, res) {
  res.render('login');
});

 app.get('/signup', function(req, res){
  res.render('signup', {layout: false})
});


  



 



function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', 
    { error: err 
    });
}
app.use(errorHandler);

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

app.get('/products/EarningsPro', products.EarningsPro);
app.get('/products/Profits', products.Profits)


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
app.get('/categories/EarningsCateg', categories.EarningsCateg);


app.get('/purchases', purchases.show);
app.post('/purchases/add',purchases.add);
app.get('/purchases/edit/:Id', purchases.get);
app.post('/purchases/update/:Id', purchases.update);
//app.get('/purchases/updete/:Id')
app.get('/purchases/delete/:Id', purchases.delete);


app.get('/suppliers', suppliers.show);
app.post('/suppliers/add',suppliers.add);
app.get('/suppliers/edit/:Id', suppliers.get);
app.post('/suppliers/update/:Id', suppliers.update);
app.get('/suppliers/delete/:Id', suppliers.delete);

//these are the logout
  

app.get('/logout', function(req, res){
  delete req.session.user;
  res.redirect('/');
  
});


app.get('/signup', function(req, res){
      app.post('/signup', function(req, res){
    var user = JSON.parse(JSON.stringify(req.body));
    if(user.password === user.confirm_password){
      if(user[user.username] === undefined){
        user[user.username] = user.password;
        res.redirect('/');
      }
    }
    res.render('signup');
  });
});
app.get('/signup', register.get);
app.post('/signup', register.add);
  
 app.get('/signup/edit/:id', register.get);
 app.post('/signUp/update/:id', register.update);
 app.post('/signup/add', register.add);
 //this should be a post but this is only an illustration of CRUD - not on good practices
 app.get('/signup/delete/:id', register.delete);





//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3001;

//start everything up
app.listen(portNumber, function (){
console.log('Create, Read, Update, and Delete (CRUD) spaza-app server listening on:', portNumber);
});
