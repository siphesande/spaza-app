


exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from Products, Categories WHERE Products.category_id = Categories.category_id', [], function(err, results) {
        if (err) return next(err);
    		res.render( 'sphe', {
					no_products : results.length === 0,
					products : results,
    		});
      });
	});
};

exports.showAdd = function(req, res){
	res.render('add');
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		product_name : input.product_name,
  	};
		connection.query('insert into Products set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/products');
		});
	});
};

exports.get = function(req, res, next){
	var product_id = req.params.product_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Products WHERE product_id = ?', [product_id], function(err,rows){
			if(err) return next(err);
			res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
  var product_id = req.params.product_id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE Products SET ? WHERE product_id = ?', [data, product_id], function(err, rows){
    			if (err) next(err);
          res.redirect('/products');
    		});

    });
};

exports.delete = function(req, res, next){
	var product_id = req.params.product_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Products WHERE product_id = ?', [product_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
};
