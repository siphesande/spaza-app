
exports.searchProducts = function(req, res, next){
  req.getConnection(function(error, connection){
    if(error) return next(error);
       var searchValue = "%" + req.params.searchValue + "%"; 
        console.log(searchValue);

      
          connection.query('SELECT Products.Id, Products.product_name,Categories.category_name FROM Products INNER JOIN Categories ON Categories.Id = Products.Category_Id WHERE product_name LIKE ?',[searchValue], function(error, results) {
          if (error) return next(error);
          console.log(results);
            res.render( 'search', {
              username :req.session.user,
              products : results,
              layout :false

                   
            });
        }); 
    }); 
};



exports.searchCategories = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        
        var searchValue = "%" + req.params.searchValue + "%";        
        
         connection.query('SELECT category_name, Id FROM Categories where category_name Like ?',[searchValue], function(err, results){   
             if (err) return next(err); 
            res.render('category_search', {
                username : req.session.user,
                categories : results,
                layout : false
            });            
        });

        
        
    })
};

exports.searchSales = function(req, res, next){
  req.getConnection(function(error, connection){
    if (error) throw next (error);
    var searchVar = req.body.searchVar;
        searchVar = "%" + searchVar + "%";
        connection.query('SELECT Sales.Id,Qty,product_name,Sales_price,Sales_date FROM Products INNER JOIN Sales ON Products.Id = Sales.Product_Id WHERE product_name LIKE ?',searchVar,function(err, results){ 
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

