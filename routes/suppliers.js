"use strict"
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		    connection.query('SELECT * from Suppliers', [], function(err, results) {
               if (err) return next(err);
    		       res.render( 'suppliers', {
				   no_suppliers : results.length === 0,
				   user: req.session.user,
				   role: req.session.role,
				   Id: req.session.Id,
				   
				   suppliers: results
    		      });

            });
	});
};


// Add my Suppliers From browser to the data bases
exports.add = function (req, res, next) {
	   'use strict'
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		supplier_name : input.supplier_name,
      		Id :input.Id
  	    };      
		connection.query('insert into Suppliers set ?', data, function(err, results){
  		if (err) return next(err);
			res.redirect('/suppliers');
		});
	});
}

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Suppliers WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.render('editSupplier',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
}

exports.update = function(req, res, next){
     'use strict'
	var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
        req.getConnection(function(err, connection){
			connection.query('UPDATE Suppliers SET ? WHERE Id = ?', [data, Id], function(err,rows){
    			if (err) return next(err);
                res.redirect('/suppliers');
    		});

       });
}
//dele from the list of my suppliers
exports.delete = function(req, res, next){
	  'use strict'
	var Id= req.params.Id;
	    req.getConnection(function(err, connection){
		connection.query('DELETE FROM Suppliers WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/suppliers');
		});
	});
}
