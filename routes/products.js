exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
	    connection.query('SELECT Products.Id, Products.product_name, Categories.category_name FROM Products INNER JOIN Categories ON Categories.Id = Products.Category_Id ORDER BY Id LIMIT 0 , 30', [], function(err, results) {
			connection.query('SELECT * FROM Categories', [], function(err, categories) {
        	if (err) return next(err);
			res.render( 'products', {
					no_products :results.length === 0,
					products : results,
					categories: categories
			    });
	        });
		});
	});
};
//exports.home =function(req, res){
	//res.render('home')
//}
exports.showAdd = function(req, res){
	res.render('add');
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		product_name : input.product_name,
      		Category_Id :input.Category_Id
  	    };      
		connection.query('insert into Products set ?', data, function(err, results){
  		if (err) return next(err);
  		console.log("Error inserting : %s ",err );
			res.redirect('/products');
		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Products WHERE Id = ?', [Id], function(err,rows){
		connection.query('SELECT * FROM Categories', [], function(err, results) {	
			if(err) return next(err);
            console.log(results);
			res.render('edit',{page_title:"Edit Products - Node.js", 
			data : rows[0],
			category : results

   
			});
		 });

	   });
   });
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
    req.getConnection(function(err, connection){
			connection.query('UPDATE Products SET ? WHERE Id = ?',[data, Id], function(err, rows){
    			if (err) return next(err);
                res.redirect('/products');
    		});

    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Products WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
};
exports.mostPopulerPrd =function (req, res, next){
    var id = req.params.Id;
    req.getConnection(function(err, connection){

        connection.query('SELECT Products.product_name, Products.Id,Categories.category_name, SUM( Sales.qty ) AS qty FROM Sales INNER JOIN Products ON Sales.product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Products.product_name ORDER BY qty DESC LIMIT 1 ',[], function(err, results){
                if (err) return next(err);
                res.render('mostPopulerPrd',{
                most : results
               
            });

         });
    });
};

exports.leastPopulerPrd =function (req, res, next){
    var id = req.params.Id;
    req.getConnection(function(err, connection){
        connection.query('SELECT Products.product_name, Products.Id,Categories.category_name, SUM( Sales.qty ) AS qty FROM Sales INNER JOIN Products ON Sales.product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Products.product_name ORDER BY qty ASC LIMIT 1 ',[], function(err, results){
                if (err) return next(err);
                res.render('leastPopulerPrd',{
                least : results
               
            });

         });
    });
};

