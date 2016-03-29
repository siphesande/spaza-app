exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
	    connection.query('SELECT Products.Id, Products.product_name, Categories.category_name FROM Products INNER JOIN Categories ON Categories.Id = Products.Category_Id ORDER BY Id LIMIT 0 , 30', [], function(err, results) {
			connection.query('SELECT * FROM Categories', [], function(err, categories) {
        	if (err) return next(err);
			res.render( 'products', {
			    no_products :results.length === 0,
			    user: req.session.user,
			    role: req.session.role,
			    Id: req.session.Id,
				products : results,
				categories: categories
			    });
	        });
		});
	});
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
}

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
}

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
    req.getConnection(function(err, connection){
			connection.query('UPDATE Products SET ? WHERE Id = ?',[data, Id], function(err, rows){
    			if (err) return next(err);
                res.redirect('/products');
    		});

    });
}

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Products WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
}
exports.mostPopulerPrd =function (req, res, next){
   
    req.getConnection(function(err, connection){

        connection.query('SELECT Products.product_name, Products.Id,Categories.category_name, SUM( Sales.qty ) AS qty FROM Sales INNER JOIN Products ON Sales.product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Products.product_name ORDER BY qty DESC LIMIT 1 ',[], function(err, results){
             if (err) return next(err);
             res.render('mostPopulerPrd',{
             user:req.session.user,
             role:req.session.role,
             Id:req.session.Id,
             most : results
             });

        });
    });
}

exports.leastPopulerPrd =function (req, res, next){
   
    req.getConnection(function(err, connection){
        connection.query('SELECT Products.product_name, Products.Id,Categories.category_name, SUM( Sales.qty ) AS qty FROM Sales INNER JOIN Products ON Sales.product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Products.product_name ORDER BY qty ASC LIMIT 1 ',[], function(err, results){
            if (err) return next(err);
            res.render('leastPopulerPrd',{
            user: req.session.user,
            role: req.session.role,
            Id: req.session.Id,
            least : results
            });

        });
    });
}

exports.EarningsPro = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('select Products.product_name, SUM(Sales.Sales_price * Sales.Qty) as earningPerProduct from Sales inner join Products on Sales.product_Id = Products.Id group by product_name order by SUM(Sales.Sales_price) DESC;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('Earnings', {
			EarningsPerProd : results,
			user: req.session.user,
			role: req.session.role,
			Id: req.session.Id
			});
		});
	});
};
exports.Profits = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);

		};
		connection.query('SELECT product_name, SUM(Purchase_price*Purchases.Qty) as purchased_at, SUM(Sales_price*Sales.Qty) as made, SUM((Purchase_price*Purchases.Qty) - (Sales_price*Sales.Qty)) AS profit from Purchases INNER JOIN Products ON Purchases.Product_Id = Products.Id INNER JOIN Sales ON Sales.Product_Id = Products.Id GROUP BY product_name ORDER BY profit DESC',[], function(error, results){
			if(error) {
				return next(error);
			}
			console.log(results);
			res.render('ProfitsProduct', {
			ProfitsProduct : results,
			user:req.session.user,
			role:req.session.role,
			Id: req.session.Id

			});
		});
	});
};



