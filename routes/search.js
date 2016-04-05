
exports.searchProducts = function(req, res, next){
  req.getConnection(function(error, connection){
    if(error) return next(error);
        var searchVar = req.body.searchVar;
        //var searchVar = req.query.searchVar;
        searchVar = "%" + searchVar + "%";
        console.log(searchVar);

        //connection.query('SELECT * FROM Products WHERE product_name LIKE ?',[searchVar], function(error, results) {
          connection.query('SELECT Products.Id, Products.product_name,Categories.category_name FROM Products INNER JOIN Categories ON Categories.Id = Products.Category_Id WHERE product_name LIKE ?',[searchVar], function(error, results) {
          if (error) return console(error);
            res.render( 'search', {
            products_search : results
                   
            });
        }); 
    }); 
};


// exports.searchCategories = function(req, res, next){
//   req.getConnection(function(error, connection){
//     if(error) return next(error);
//     var searchVar = req.body.searchVar;
//         searchVar = "%" + searchVar + "%";
//         connection.query('SELECT * FROM Categories WHERE category_name LIKE ?',searchVar,function(err, results){
//           if (err) throw (err);
//           res.render('CategorySearching', {
//             search_categories : results
//           })
//         })

//   })
// }
exports.seachCategories = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        var searchResults = function(err, results){
            if (err) return next(err);
            
            res.render('category_search', {
                username : req.session.user,
                products : results,
                layout : false
            });            
        };

        connection.query('SELECT category_name FROM Categories where category_name Like ?',[searchValue], searchResults);
        
    })
};


exports.searchSales = function(req, res, next){
  req.getConnection(function(error, connection){
    if (error) throw next (error);
    var searchVar = req.body.searchVar;
        searchVar = "%" + searchVar + "%";
        connection.query('SELECT Sales.Id,Sales.Qty,Products.product_name,Sales.Sales_price,Sales.Sales_date FROM Products INNER JOIN Sales ON Products.Id = Sales.Product_Id WHERE product_name LIKE ?',searchVar,function(err, results){ 
          if (err) throw next (err);
          res.render('salesSearching',{
            search_sales : results
          });
      });

  });

};

exports.searchSuppliers = function(req, res, next){
  req.getConnection(function(err, connection){
    if (err) return err;
    var searchVar = req.body.searchVar;
        searchVar = "%" + searchVar + "%";
    connection.query('SELECT * FROM Suppliers WHERE supplier_name LIKE ?', searchVar, function(error, results){
        if (error) throw error;
        res.render('suppliersSearching',{
          search_suppliers: results
        });
    }); 

  });
}

