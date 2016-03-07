exports.show =function (req, res, next){
    req.getConnection(function(err, connection){
        if (err) return next(err);
		//connection.query('SELECT Qty AS AmtSold ,Sales_date, Sales_price,  product_name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id ORDER BY Sales_date DESC',[], function(err, results){
        connection.query('SELECT Sales.Id,Products.product_name,Sales.Qty,DATE_FORMAT(Sales.Sales_date, "%d/%m/%Y") as Sales_date,Sales.qty,Sales.Sales_price FROM Sales INNER JOIN Products ON Sales.Product_Id = Products.Id ORDER BY Sales.Sales_date DESC',[],function(err, results){
            connection.query('SELECT * from Products',[], function(err, products){
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


exports.add = function (req, res, next) {
    req.getConnection(function(err, connection){
         if (err){
            return next(err);
            }

         var input = JSON.parse(JSON.stringify(req.body));
         var data = {
             Product_Id:input.Id,
             Qty :input.Qty,
             Sales_date:input.Sales_date,
             Sales_price:input.Sales_price
             //sold :input.Qty
         };
         connection.query('insert into Sales set ?', data, function(err, results) {
            if (err) return next(err);
            console.log("Error inserting : %s ",err );
            res.redirect('/sales');
         });
     });
};

exports.getSales = function(req, res, next){
     //return res.send("......");
    req.getConnection(function(err, connection){
        if (err){
            //console.log(err)
            return next(err);
        }
        var salesId = Number(req.params.Id);
        //var salesId = Number(req.params.sale_Id);
        //console.log( 'salesId : ' + salesId);

        //var salesql = 'SELECT * from sales p where p.Id = ?'; 
        var saleSql = 'SELECT * FROM Sales WHERE Id = ?';
         connection.query(saleSql, [salesId], function(err, sales, fields) {
                    if (err){
                       // console.log(err)
                        return next(err);
                    }
      
                     connection.query('SELECT * FROM Products', [], function(err, products, fields) {
                        if (err)
                            return next(err);
                        //console.log(product)
                        var sale = sales.length > 0 ? sales[0] : {};
                        var productList = products.map(function(product){
                             //console.log(product.Id);
                            //console.log(sale);
                            var result = {
                                Id : product.Id,
                                Name : product.product_name,
                                selectedProduct : product.Id === sale.Product_Id
                            };
                            //console.log("**** : " + result.selected);
                            return result;
                        }); 
                           var context = {
                            products : productList,
                            sale: sales.length > 0 ? sales[0] : {},
                           //sale: sale,
                            //suppliers: suppList
                        };
                        //console.log(context);
                        res.render('editSales', context);
                    });
            //});
        });
    });
}








// exports.getSales = function (req,res, next){
// 	var id = req.params.Id;
// 	req.getConnection(function(err,connection){
// 		connection.query('SELECT * FROM Sales WHERE id = ?',[id], function (err,rows){
//             connection.query('SELECT * from Products',[], function(err, product){
// 			    if (err) return next(err);
// 			    res.render('editSales',{page_title:"Edit Sales - Node.js", 
//                 data : rows[0],
//                 product : product
 
//                });
//             });
// 	    });
// 	});
// };
exports.update = function(req, res,next){
    var data = JSON.parse(JSON.stringify(req.body));
 	var id = req.params.Id;
 	    req.getConnection(function(err,connection){
 	    	connection.query('UPDATE Sales SET ? WHERE Id = ?',[data, id], function(err, rows){
 	    		if(err)return next(err);
 	    		res.redirect('/sales');
 	        });
 	    });
};

exports.delete = function(req, res, next){

 	var id = req.params.Id;
 	req.getConnection(function(err, connection){
 		connection.query('DELETE FROM Sales WHERE Id = ?', [id],function(err,rows){
 			if(err) return next(err);
 			res.redirect('/sales');
 		});
 	});
 }

 exports.mostPopurPrd =function (req, res, next){
     req.getConnection(function(err, connection){
          if (err) return next(err);
          //connection.query('SELECT Qty AS AmtSold ,Sales_date, Sales_price, product_name from Sales s INNER JOIN Products p ON s.Product_Id = p.Id ORDER BY Sales_date DESC',[], function(err, results){
          connection.query('SELECT * from Products',[], function(err, most){
               if (err) return next(err);
               res.render('mostPopurPrd',{
               no_sales : results.length === 0,
               most : most
               });
           });
      });
}









