
exports.searchProducts = function(req, res, next){
    req.getConnection(function(error, connection){
                if(error) return next(error);
        
        var searchVar = req.query.searchVar;
        searchVar = "%" + searchVar + "%";
        console.log(searchVar);

        connection.query('SELECT * FROM Products WHERE product_name LIKE ?',searchVar, function(error, results) {
            if (error) return console(error);
                res.render( 'search', {
                    products_search : results
                   
                });
        }); 
    }); 
};

// exports.searchProducts = function(req,res){
//   var input = JSON.parse(JSON.stringify(req.body));
//   var key = input.key;
     
//    req.getConnection(function(err, connection){
       
//        if (err) return err;
//        connection.query('SELECT product_name from Products where product_name like "%'+ key +'%"', function(err, rows, fields) {
//           if (err) throw err;
//           // var data=[];
//           // for(i=0;i<rows.length;i++)
//           // {
//           // data.push(rows[i].product_name);
//           // }
//           // JSON.stringify(data);
//           res.render('products',{
//           data: rows

//           });
//        });
//   });
// }


