export.show =function (req, res, next){

	req.getConnection(function(err, connection){

		if (err) return next(err);
		    connection.query('SELECT * from Sales',[], function(err, results){
            connection.query('SELECT * from Products',[], function(err, Products){
            	if (err) return next(err);
            	res.render('sale',{
            	no_sales : results.length === 0,
            	sales : results,
            	Products : product_id
            	});
            });

		 });
	});
}

exports.showAdd = function (req, res){
	res.render('addSales');

}

export.addSales = function(req, res, next) {
	req.getConnection(function(err, connection ){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			
			product_id :input.product_id,
			qty :input.qty,
			price :input.price,
			sale_date:new.Date
		};
		connection.query('insert into Sales set ?' , data, function(err, results){
			if (err) return next(err);
			   res.redirect('/sales');
		});









	});
};


................................................................................
















