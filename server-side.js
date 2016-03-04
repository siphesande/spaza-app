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
    //These are my routes:
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    categories = require('./routes/categories'),
    suppliers = require('./routes/suppliers'),
    purchases =  require('./routes/purchases'),
    loggin = require('./routes/login'),
    register = require('./routes/Users'),
    usrs = require('./routes/Users');
    
var app = express();
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '08386354',
      port: 3306,
      database: 'spaza_app'
};

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', 
     { 
    error: err 
    });
}
app.use(errorHandler);
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




app.use(function(req, res, next){
  console.log('middleware!');
  //proceed to the next middleware component
  next();
});

 



app.post('/home', loggin.login);
app.post('/home',function(req, res){
   res.render("home");
})
app.get('/home', function (req, res) {
    res.render('home', {user:req.session.user, role:req.session.role,Id:req.session.Id });
});

//This is my landing page
app.get('/', function(req, res) {
    res.render('login', {
      layout: false,
    });
});

app.get('/file',usrs.usser);

app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/signup', function(req, res){
  res.render('signup', {layout: false})
});

// app.get('/signup', function(req, res){
// app.post('/signup', function(req, res){
//     var user = JSON.parse(JSON.stringify(req.body));
//     if(user.password === user.confirm_password){
//       if(user[user.username] === undefined){
//         user[user.username] = user.password;
//         res.redirect('/home');
//       }

//     }
    
//     });
//   res.render('signup');
// });
app.get('/signup', register.get);
app.post('/signup', register.add);
  
 //app.get('/signup/edit/:id', register.get);
app.post('/signup/update/:id', register.update);
app.post('/signup/add', register.add);
 //this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/signup/delete/:id', register.delete);

//signup as Adiministrator
app.get('/admin_signup', function(req, res){
  res.render('admin_signup', {layout: false})
});
app.get("/amin_signup", register.adminSignup);
app.post('/admin_signup',register.adminSignup); 
//app.get('/admin_signup', function(req, res){
// app.post('/admin_signup', function(req, res){
//     var user = JSON.parse(JSON.stringify(req.body));
//     //if(user.password === user.confirm_password){
//       if(user[user.username] === undefined){
//         user[user.username] = user.password;
//         res.redirect('/home');
//       }
//      //}
    
//     });
//     res.render('admin_signup');
// });
app.get('/logout', function(req, res){
  delete req.session.user;
  res.redirect('/');
  
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


//setup the handlers
app.get('/',function(req,res){res.render('index');});
//products.js
app.get('/products',checkUser, products.show);//show products to the screen
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

// sales.js
app.get('/sales',checkUser, sales.show); 
app.post('/sales/add',sales.add);
app.get('/sales/edit/:Id', sales.getSales);
app.post('/sales/update/:Id', sales.update);
app.get('/sales/delete/:Id', sales.delete);

// to get,add,update and delete categories
app.get('/categories', checkUser,categories.show);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/edit/:Id', categories.get);
app.post('/categories/update/:Id',categories.update);
app.get('/categories/delete/:Id', categories.delete);
app.get('/categories/mostPopulerCat',checkUser, categories.mostPopulerCat);
app.get('/categories/leastPopulerCat',checkUser, categories.leastPopulerCat);
app.get('/categories/EarningsCateg',checkUser, categories.EarningsCateg);

//purchases.js
app.get('/purchases',checkUser, purchases.show);
app.post('/purchases/add',purchases.add);
app.get('/purchases/edit/:Id', purchases.get);
app.post('/purchases/update/:Id', purchases.update);
//app.get('/purchases/updete/:Id')
app.get('/purchases/delete/:Id', purchases.delete);

//suppliers.js
app.get('/suppliers',checkUser, suppliers.show);
app.post('/suppliers/add',suppliers.add);
app.get('/suppliers/edit/:Id', suppliers.get);
app.post('/suppliers/update/:Id', suppliers.update);
app.get('/suppliers/delete/:Id', suppliers.delete);

//these are the logout
// to show the user??
app.get('/user',checkUser,  usrs.usser);
app.get('/user/add',  usrs.usser);
app.get('/user/edit/:Id', usrs.get);
app.get('/user/edit/:Id', usrs.update);
app.post('/user/update/:Id',  usrs.update);
app.post('/user/add', usrs.add);
app.get('/user/delete/:Id',checkUser,usrs.delete);
app.get('/user/admin/:Id',checkUser,usrs.admin);
app.get('/user/notAdmin/:Id',checkUser,usrs.notAdmin);
app.get('/user/edit/',usrs.get); 

app.use(function(req, res){
  res.sendStatus(404);
})


//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3001;

//start everything up
app.listen(portNumber, function (){
console.log('Create, Read, Update, and Delete (CRUD) spaza-app server listening on:', portNumber);
});
