//grab the things I need 

var express = require('express'),
    exphbs  = require('express-handlebars'),
    morgan = require('morgan'),
    mysql = require('mysql'),//node-mysql module
    myConnection = require('express-myconnection'),//Connect/Express middleware that auto provides mysql connections 
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'), 
    session = require('express-session'),
    cookieSession =require('cookie-session'),
    bcrypt = require('bcryptjs'),
    
    request = require('request'),
    morgan = require('morgan'),
    flash = require('express-flash'),

    //These are my routes:
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    categories = require('./routes/categories'),
    suppliers = require('./routes/suppliers'),
    purchases =  require('./routes/purchases'),
    auth = require('./routes/login'),
    register = require('./routes/Users'),
    search  = require('./routes/search'),
    usrs = require('./routes/Users');
    
var app = express();
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'S.malgas91',
      port: 3306,
      database: 'spaza_app'
};

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { 
    error: err 
    });
}
app.use(morgan('dev'));
app.use(errorHandler);
//setup template handlebars as the template engine
app.set('views',__dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cookieParser('12345-67890-09876-54321'));//secret key
app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));//Connect/Express middleware provides a consistent API for MySQL connections during request/response life cycle
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(session({ 

   secret : 'a4f8071f-c873-4447-8ee2', 
   resave : true, saveUninitialized: true, 
   cookie: { maxAge:2628000000 }}));



app.use(flash());
app.use(function(req, res, next){
console.log('middleware!');
  //proceed to the next middleware component
  next();
  
});
var checkUser = function (req, res, next) {
   // console.log(req.path);
    if (req.session.user){
       console.log(req.session.user)
    // if (req.session.role === 'Admin' || req.session.role === 'View' ){
        next(); 
    }
    else{
         req.flash("info", 'You need to login first!!');
         res.redirect("/");

        }

    }

var checkAdmin = function (req,res,next){
    if(req.session.role === "Admin"){
       next();
    }
    else{
      res.redirect("/");
    }
}

app.post('/home',auth.login);
app.get('/home',checkUser,function (req, res) {

      res.render('home', {
      user:req.session.user, 
      role:req.session.role,
      Id:req.session.Id 
    });
});

//This is my landing page
app.get('/', function(req, res) {
  delete req.session.user;
    res.render('login', {
      layout: false,
    });
});



app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/signup', function(req, res){
  res.render('signup', {layout: false})
});


app.post('/signup', register.add);
  
 //app.get('/signup/edit/:id', register.get);
app.post('/signup/update/:id', register.update);
app.post('/signup/add', register.add);

app.get('/signup/delete/:id', register.delete);

//signup as Adiministrator
//app.get("/amin_signup",checkUser, register.adminSignup);
//app.post('/admin_signup',checkUser, register.adminSignup); 

app.get('/logout', function(req, res){
  delete req.session.user;
  res.redirect('/');
  
});

app.get('/products',checkUser, products.show);//show products to the screen
app.get('/products/edit/:Id',checkUser, products.get);
app.post('/products/update/:Id',checkUser, products.update);
app.post('/products/add',checkAdmin, products.add);
app.get('/products/mostPopulerPrd',checkUser, products.mostPopulerPrd);
app.get('/products/leastPopulerPrd',checkUser, products.leastPopulerPrd);
app.get('/products/delete/:Id',checkAdmin, products.delete);
app.get('/products/EarningsPro',checkUser, products.EarningsPro);
app.get('/products/Profits',checkUser, products.Profits);
app.get('/products/search/:searchValue',checkUser, search.searchProducts);



app.get('/sales',checkUser, sales.show); 
app.post('/sales/add',checkUser,sales.add);
app.get('/sales/edit/:Id',checkUser, sales.getSales);
app.post('/sales/update/:Id',checkUser, sales.update);
app.get('/sales/delete/:Id',checkUser, sales.delete);
app.post('/sales/salesSearching',checkUser, search.searchSales);


app.get('/categories', checkUser,categories.show);
app.post('/categories/add',checkUser, categories.add);
app.get('/categories/edit/:Id',checkUser, categories.get);
app.post('/categories/update/:Id',checkUser,categories.update);
app.get('/categories/delete/:Id', categories.delete);
app.get('/categories/mostPopulerCat',checkUser, categories.mostPopulerCat);
app.get('/categories/leastPopulerCat',checkUser, categories.leastPopulerCat);
app.get('/categories/EarningsCateg',checkUser, categories.EarningsCateg);
app.get('/categories/search/:searchValue',checkUser,search.searchCategories);



app.get('/purchases',checkUser, purchases.show);
app.post('/purchases/add',checkUser,purchases.add);
app.get('/purchases/edit/:Id',checkUser,purchases.get);
app.post('/purchases/update/:Id',checkUser,purchases.update);
//app.get('/purchases/updete/:Id')
app.get('/purchases/delete/:Id',checkUser,purchases.delete);


app.get('/suppliers',checkUser,suppliers.show);
app.post('/suppliers/add',checkUser,suppliers.add);
app.get('/suppliers/edit/:Id',checkUser, suppliers.get);
app.post('/suppliers/update/:Id',checkUser, suppliers.update);
app.get('/suppliers/delete/:Id',checkUser, suppliers.delete);
app.post('/suppliers/searchSuppliers',checkUser, search.searchSuppliers);


app.get('/user',checkUser,usrs.usser);
app.get('/user/add', checkUser, usrs.usser);
app.get('/user/edit/:Id',checkUser, usrs.update);
app.post('/user/update/:Id',checkUser,  usrs.update);
app.post('/user/add',checkUser, usrs.add);
app.get('/user/delete/:Id',checkUser,usrs.delete);
app.get('/user/admin/:Id',checkUser,usrs.admin);
app.get('/user/notAdmin/:Id',checkUser,usrs.notAdmin);



//configure the port number using and environment number
//The app starts a server and listens on port 3001 for connections

var portNumber = process.env.CRUD_PORT_NR || 8080;

//start everything up
app.listen(portNumber, function (){
console.log('Create, Read, Update, and Delete (CRUD) spaza-app server listening on:', portNumber);
});
