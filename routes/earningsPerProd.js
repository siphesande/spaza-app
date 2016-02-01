exports.EarnProduct = function(req, res, next){
 	req.getConnection(function(error, connection){
  			if(error){
  				return next(error);
  			}
			connection.query('SELECT products.product_name, SUM(sales.sale_price * sales.no_sold) as EarningPerProduct FROM sales INNER JOIN products ON sales.product_Id = products.Id GROUP BY product_name order by SUM(sales.sale_price) DESC;', [], function(error, results) {
			    if (error) return next(error);
			    console.log(results);
			    res.render( 'EarniPerProducts', {
				EarnProduct : results,
		    });

  		});

    });  
  }

  exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
			var input = JSON.parse(JSON.stringify(req.body));
			var data = {
	            		product_name : input.product_name,	
	            		earningPerProduct : input.earningPerProduct
	            }
		connection.query('insert into products set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/EarningsProd');
      		});
	});
};

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT products.product_name FROM sales WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('productsEdit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var Id = req.params.Id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE products SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/EarningsProd');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE Id = ?', [Id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/EarningsProd');
		});
	});
};