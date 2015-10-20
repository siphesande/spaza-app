exports.show =function (req, res, next){

	req.getConnection(function(err, connection){

		if (err) return next(err);
		    connection.query('SELECT Products.product_name,Sales.sale_date,Sales.price,Sales.qty FROM Sales INNER JOIN Products ON Sales.product_id= Products.product_id ORDER BY Sales.sale_date',[], function(err, results){
            connection.query('SELECT * from Products' ,[], function(err, products){
            	if (err) return next(err);
            	res.render('sales',{
            	no_sales : results.length === 0,
            	sales : results,
            	products : products
            	});
            });

		 });
	});
};
exports.home =function(req, res){
	res.render('home')
}

exports.showAdd = function (req, res){
	res.render('addSales');

}

exports.addSales = function(req, res, next) {
	req.getConnection(function(err, connection ){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			
			product_id :input.product_id,
			qty :input.qty,
			price :input.price,
			sale_date:input.sale_date
		};
		connection.query('insert into Sales set ?' , data, function(err, results){
			if (err) return next(err);
			   res.redirect('/sales');
		});
     });
};
exports.getSales = function (req,res, next){
	var id = req.params.id;
	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM Sales WHERE id = ?',[id], function (err,rows){
			if (err) return next(err);
			res.render('edit' ,{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};
 exports.update = function(req, res,next){

 	var data = JSON.parse(JSON.stringify(req.body));
 	var id = req.params.id;
 	    req.getConnection(function(err,connection){
 	    	connection.query('UPDATE Sales SET ? WHERE id = ?',[data, id], function(err, rows){
 	    		if(err) next(err);
 	    		res.redirect('/sales');
 	    	});
 	    });
 };

 exports.delete = function(req, res, next){

 	var id = req.params.id;
 	req.getConnection(function(err, connection){
 		connection.query('DELETE FROM Sales WHERE id = ?', [id],function(err,rows){
 			if(err) return next(err);
 			res.redirect('/sales');
 		});
 	});
 }















