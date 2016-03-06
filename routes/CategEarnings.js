'use strict'
exports.EarningsCateg = function(req, res, next){
	req.getConnection(function(error, connection){
		if(error){
			return next(error);
		}

		connection.query('SELECT categories.category_name, SUM(sales.no_sold*sales.sale_price) AS Total FROM sales INNER JOIN products ON sales.product_Id = products.Id INNER JOIN categories ON products.Category_Id = categories.Id GROUP BY categories.category_name ORDER BY Total DESC;', [], function(error, results) {
			if (error) {
				return next(error);
			}
			console.log(results);
			res.render('EarningsCatego', {
			EarningsPerCatego : results
			});
		});
	});		
};