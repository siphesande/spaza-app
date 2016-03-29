'use strict'
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		    connection.query('SELECT * from Categories', [], function(err, results) {
               if (err) return next(err);
    		   res.render( 'categories', {
			   no_categories : results.length === 0,
			   user: req.session.user,
			   role: req.session.role,
			   Id: req.session.Id,
			   categories: results
    		   });
           });
	});
	
}

exports.showAdd = function(req, res){
	res.render('addCat');
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		category_name : input.category_name,
      		Id :input.Id
  	    };      
		connection.query('insert into Categories set ?', data, function(err, results){
  		    if (err) return next(err);
			res.redirect('/categories');
		});
	});
}

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Categories WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.render('editCategories',{page_title:"Edit Categories - Node.js", data : rows[0]});
		});
	});
}

exports.update = function(req, res, next){
    var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
        req.getConnection(function(err, connection){
			connection.query('UPDATE Categories SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err) return next(err);
                res.redirect('/categories');
    		});
        });
}

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Categories WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
}

exports.mostPopulerCat =function (req, res, next){
  
    req.getConnection(function(err, connection){

        connection.query('SELECT Categories.Id,Categories.category_name, sum( Sales.qty ) AS TotalQty FROM Sales INNER JOIN Products ON Sales.product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.category_name ORDER BY TotalQty DESC LIMIT  1;',[], function(err, results){
             if (err) return next(err);
             res.render('mostPopulerCat',{
             most: results,
             user: req.session.user,
             role: req.session.role,
             Id: req.session.Id
               
            });

        });
    });
}

exports.leastPopulerCat =function (req, res, next){
   
    req.getConnection(function(err, connection){
        connection.query('SELECT Categories.Id,Categories.category_name, sum( Sales.qty ) AS TotalQty FROM Sales INNER JOIN Products ON Sales.product_id = Products.Id INNER JOIN Categories ON Products.Category_id = Categories.Id GROUP BY Categories.category_name ORDER BY TotalQty ASC LIMIT  1;',[], function(err, results){
            if (err) return next(err);
            res.render('leastPopulerCat',{
                least : results,
                user: req.session.user,
                role: req.session.role,
                Id: req.session.Id,
               
            });

        });
    });
}

exports.EarningsCateg = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT Categories.category_name, SUM(Sales.Qty*Sales.Sales_price) AS Total FROM Sales INNER JOIN Products ON Sales.Product_Id = Products.Id INNER JOIN Categories ON Products.Category_Id = Categories.Id GROUP BY Categories.category_name ORDER BY Total DESC;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('EarningsCatego', {
			    EarningsPerCatego : results,
			    user: req.session.user,
			    role: req.session.role,
			    Id: req.session.Id
			    });
		   });
	   });		
};

