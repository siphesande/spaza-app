'use strict'

exports.show =function (req, res, next){

    req.getConnection(function(err, connection){
        if (err) return next(err);
		    connection.query('SELECT * from Suppliers',[], function(err, suppliers){
            connection.query('SELECT * from Products' ,[], function(err, products){
                connection.query('SELECT Purchases.Id,Suppliers.supplier_name, Products.product_name, DATE_FORMAT(Purchases.Purchase_date, "%d/%m/%Y") as Purchase_date , Purchases.Qty, Purchases.Purchase_price FROM Purchases INNER JOIN Products ON Purchases.Product_Id = Products.Id INNER JOIN Suppliers ON Purchases.Supplier_Id = Suppliers.Id ORDER BY Id DESC' ,[], function(err, purchases){
            	      if (err) return next(err);
            	      res.render('purchases', {
            	      no_purchases : purchases.length === 0,
                      user: req.session.user,
                      role: req.session.role,
                      Id: req.session.Id,
            	      suppliers : suppliers,
            	      products : products,
                      purchases : purchases
            	      });
                  });
              });
	      });
    });
}
// Add the the Purcheses
exports.add = function (req, res, next) {
    req.getConnection(function(err, connection){
         if (err)return next(err);
         var input = JSON.parse(JSON.stringify(req.body));
         var data = {
                    Product_Id : input.Product_Id,
                    Qty : input.Qty,
                    Purchase_date: input.Purchase_date,
                    Purchase_price: input.Purchase_price,
                    Supplier_Id : input.Supplier_Id
                
         };
         console.log(data);
         connection.query('insert into Purchases set ?', data, function(err, results) {
             if (err) return next(err);
             console.log("Error inserting : %s ",err );
             res.redirect('/purchases');
         });
    });
}


exports.get = function(req, res, next){
     //return res.send("......");
    req.getConnection(function(err, connection){
        if (err){
          
            return next(err);
        }
        var purchaseId = Number(req.params.Id);
        //var purchaseId = Number(req.params.purchase_Id);
        //console.log( 'purchaseId : ' + purchaseId);

        //var purchaseSql = 'SELECT * from Purchases p where p.Id = ?'; 
        var purchaseSql = 'SELECT * FROM Purchases WHERE Id = ?';
        connection.query(purchaseSql, [purchaseId], function(err, purchases, fields) {
                    if (err){
                       // console.log(err)
                        return next(err);
                    }
                     connection.query('SELECT * from Suppliers', [], function(err, supply, fields) {
                        if (err)
                            return next(err);
                     var supplier = purchases.length > 0 ? purchases[0] : {};
                     var suppList = supply.map(function(storedSupplier){
                            //console.log(product.Id);
                            //console.log(purchase);
                            var supplierResult = {
                                Id : storedSupplier.Id,
                                Name : storedSupplier.supplier_name,
                                selectedSupplier : storedSupplier.Id === supplier.Supplier_Id                            
                            };
                           return supplierResult;
                        }); 
                        var alegra = {
                            supply : suppList,
                            supplier: supply.length > 0 ? supply[0] : {},
                            suppliers: suppList
                        };
                     connection.query('SELECT * FROM Products', [], function(err, products, fields) {
                        if (err)
                            return next(err);
                        //console.log(product)
                        var purchase = purchases.length > 0 ? purchases[0] : {};
                        var productList = products.map(function(product){
                             //console.log(product.Id);
                            //console.log(purchase);
                            var result = {
                                Id : product.Id,
                                Name : product.product_name,
                                selectedProduct : product.Id === purchase.Product_Id
                            };
                            //console.log("**** : " + result.selected);
                            return result;
                        }); 
                           var context = {
                            products : productList,
                            purchase: purchases.length > 0 ? purchases[0] : {},
                           //purchase: purchase,
                            suppliers: suppList
                        };
                        //console.log(context);
                        res.render('editPurchases', context);
                    });
            });
        });
    });
};

//Update my Purchase list
exports.update = function(req, res,next){

 	var data = JSON.parse(JSON.stringify(req.body));
 	var id = req.params.Id;
 	req.getConnection(function(err,connection){
 	    connection.query('UPDATE Purchases SET ? WHERE Id = ?',[data, id], function(err, rows){
 	       if(err) return next(err);
 	    	 res.redirect('/purchases');
 	    });
 	 });
}

exports.delete = function(req, res, next){
  var id = req.params.Id;
 	req.getConnection(function(err, connection){
 		 connection.query('DELETE FROM Purchases WHERE Id = ?', [id],function(err,rows){
 			 if(err) return next(err);
 			 res.redirect('/purchases');
 		   });
 	 });
}