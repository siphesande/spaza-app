exports.show =function (req, res, next){

	req.getConnection(function(err, connection){

		if (err) return next(err);
		    connection.query('SELECT * from Suppliers',[], function(err, suppliers){
            connection.query('SELECT * from Products' ,[], function(err, products){
            connection.query('SELECT Purchases.Id,Suppliers.supplier_name, Products.product_name, Purchases.Purchase_date, Purchases.Qty, Purchases.Purchase_price FROM Purchases INNER JOIN Products ON Purchases.Product_Id = Products.Id INNER JOIN Suppliers ON Purchases.Supplier_Id = Suppliers.Id ORDER BY Purchases.Purchase_date LIMIT 0 , 30' ,[], function(err, purchases){
            	if (err) return next(err);
            	res.render('purchases',{
            	no_purchases : purchases.length === 0,
            	suppliers : suppliers,
            	products : products,
                purchases : purchases
            	});
             });
         });
	  });
   });
};
exports.home =function(req, res){
	res.render('home')
}

exports.showAdd = function (req, res){
	res.render('add');

}

exports.add = function (req, res, next) {
        req.getConnection(function(err, connection){
            if (err){
                return next(err);
            }

            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                        Product_Id:input.Id,
                        Qty :input.Qty,
                        Purchase_date:input.Purchase_date,
                        Purchase_price:input.Purchase_price,
                        Supplier_Id :input.Id

                             //sold :input.Qty
                };
            connection.query('insert into Purchases set ?', data, function(err, results) {
                    if (err)
                            console.log("Error inserting : %s ",err );

                    res.redirect('/purchases');
                });
        });
    };

exports.get = function (req,res, next){
	var id = req.params.Id;
	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM Purchases WHERE id = ?',[id], function (err,rows){
			if (err) return next(err);
			res.render('edit' ,{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};
 exports.update = function(req, res,next){

 	var data = JSON.parse(JSON.stringify(req.body));
 	var id = req.params.Id;
 	    req.getConnection(function(err,connection){
 	    	connection.query('UPDATE Purchases SET ? WHERE Id = ?',[data, id], function(err, rows){
 	    		if(err) next(err);
 	    		res.redirect('/purchases');
 	    	});
 	    });
 };

 exports.delete = function(req, res, next){

 	var id = req.params.Id;
 	req.getConnection(function(err, connection){
 		connection.query('DELETE FROM Purchases WHERE Id = ?', [id],function(err,rows){
 			if(err) return next(err);
 			res.redirect('/purchases');
 		});
 	});
 }