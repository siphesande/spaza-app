
var express = require("express");
var connectionProvider = require('connection-provider');
var exphbs = require("express-handlebars");
var morgan = require("morgan");
var mysql = require("mysql");



var ProductsDataService = require('./products-data-service');
var app = express();

var dbOptions = {
	host:'localhost',
	user:'root',
	password:'password',
	port:3000,
	database: 'spaza-app'
};

var setupCallback = function(connection){
	return{
		productDataService : new ProductsDataServisce(connection)
	}
};
app.use(connectionProvider(dbOptions, setupCallback));

app.use(morgan('dev'));
app.use(errorHandler);
//setup template handlebars as the template engine
app.set('views',__dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cookieParser('12345-67890-09876-54321'));//secret key
app.use(express.static(__dirname + '/'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

app.use(bodyParser.json());
//app.use(cookieParser());
app.use(session({

secret : 'a4f8071f-c873-4447-8ee2', resave : true,   saveUninitialized: true, cookie: { maxAge:2628000000 }}));


app.get('/products', ProductsDataService.getProduct);




var portNumber = process.env.CRUD_PORT_NR || 3000;

//start everything up
app.listen(portNumber, function (){
console.log('Create, Read, Update, and Delete (CRUD) spaza-app server listening on:', portNumber);
});
