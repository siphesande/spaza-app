
exports.searchProducts = function(req,res){
  req.getConnection(function(err, connection){
    var input = JSON.parse(JSON.stringify(req.body));
      var key = input.key;
     
       



    if (err) return err;
    connection.query('SELECT product_name from Products where product_name like "%'+req.input.key+'%"', function(err, rows, fields) {
    if (err) throw err;
    var data=[];
    for(i=0;i<rows.length;i++)
      {
        data.push(rows[i].product_name);
      }
      JSON.stringify(data);
      res.render('products',{
      data :data

    });
});




