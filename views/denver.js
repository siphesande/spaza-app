  exports.show = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
                connection.query('SELECT p.Id, DATE_FORMAT(Purchase_date,"%d %b %y") as Purchase_date,Qty, Purchase_price,s.Name,c.Name as names from Purchases p inner join Products s on p.Product_Id = s.Id inner join Suppliers c on p.Supplier_Id = c.Id order by Purchase_date desc', [], function(err, purchases, fields) {
                    if (err)
                        return next(err);
                        connection.query('SELECT * from Suppliers', [], function(err, supply, fields) {
                        if (err)
                        return next(err);
               var isAdmin = req.session.role === "admin"
                   var user = req.session.role !== "admin"

                connection.query('SELECT * FROM Products', [], function(err, product, fields) {
                    if (err)
                        return next(err);
                        //console.log(product)
                        //console.log(purchases)
                        res.render('addPurchase', {
                        products : product,
                        purchases: purchases,
                        in_ca: isAdmin, 
                        action: user,
                        Suppliers: supply
                    });
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
                    Supplier_Id:input.Supplier_Id,
                    Product_Id:input.Product_Id,
                    Purchase_date: input.Purchase_date,
                    Purchase_price: input.Purchase_price,
                    Qty:input.Qty
            };
            console.log(data)
        connection.query('insert into Purchases set ?', data, function(err, results) {
                if (err)
                        //console.log("Error inserting : %s ",err );

                res.redirect('/addPurchase');
            });
    });
    };

    exports.get = function(req, res, next){

    //return res.send("......");


    req.getConnection(function(err, connection){
        if (err){
            //console.log(err)
            return next(err);
        }


        var purchaseId = Number(req.params.purchase_Id);
        //
        //console.log( 'purchaseId : ' + purchaseId);

        var purchaseSql = 'SELECT * from Purchases p where p.Id = ?'; 
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
                                Name : storedSupplier.Name,
                                selectedSupplier : storedSupplier.Id === supplier.Supplier_Id                            
                            };

                            return supplierResult;
                        }); 
                        var alegra = {
                            supply : suppList,
                            supplier: supply.length > 0 ? supply[0] : {},
                            Suppliers: suppList
                        };



                    connection.query('SELECT * FROM Products', [], function(err, products, fields) {
                        if (err)
                            return next(err);
                        //console.log(product)

                        //res.send("...");

                        var purchase = purchases.length > 0 ? purchases[0] : {};

                        var productList = products.map(function(product){

                            //console.log(product.Id);
                            //console.log(purchase);

                            var result = {
                                Id : product.Id,
                                Name : product.Name,
                                selectedProduct : product.Id === purchase.Product_Id

                            };

                            //console.log("**** : " + result.selected);
                            return result;
                        }); 

                        var context = {
                            products : productList,
                            purchase: purchases.length > 0 ? purchases[0] : {},

                            //purchase: purchase,
                            Suppliers: suppList
                        };

                        //console.log(context);

                        res.render('purchase_edit', context);
                    });
            });
        });
    });
    };

    exports.update = function(req, res, next){
    var data = JSON.parse(JSON.stringify(req.body));
        var Id = req.params.Id;
        var Qty = req.params.Qty;
        var Purchase_date = req.params.Purchase_date;
        var Purchase_price = req.params.Purchase_price;
        var suppId = req.params.supplier_Id;
        var prodId = req.params.product_Id;
        req.getConnection(function(err, connection){
            connection.query('UPDATE Purchases SET ? WHERE Id = ?', [data, Id,Qty,Purchase_date,Purchase_price], function(err, rows){
                connection.query('UPDATE Suppliers SET ? WHERE Id = ?', [data, suppId], function(err, rows){
                 connection.query('UPDATE Products SET ? WHERE Id = ?', [data, prodId], function(err, rows){
                if (err){
                        console.log("Error Updating : %s ",err );
                }
                res.redirect('/addPurchase');
            });
        });
      });    
    });
    };
    exports.delete = function(req, res, next){
    var Id = req.params.Id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM Purchases WHERE Id = ?', [Id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.redirect('/addPurchase');
        });
    });
    };