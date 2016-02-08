-- Earnings is defined as the total income from sales
--Earnings per product
SELECT Products.product_name, SUM(Sales.qty * Sales.sales_price) AS earnings
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
GROUP BY Products.product_name
ORDER BY earnings
DESC ;

--putting products and categories into table
SELECT Products.product_id, Products.product_name, Categories.category_name
FROM Products
INNER JOIN Categories ON Categories.category_id = Products.category_id
ORDER BY product_id

--get category names and their earnings
SELECT Categories.category_name, Products.product_name
SUM(Sales.qty * Sales.sales_price ) AS earnings
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
INNER JOIN Categories ON Categories.category_id = Products.category_id
GROUP BY Categories.category_name
ORDER BY earnings
DESC;

--product names and profits
SELECT Products.product_name,
(SELECT SUM(Sales.qty * Sales.sales_price) FROM Sales WHERE Sales.product_id = Products.product_id) - (SELECT SUM(Purchases.qty * Purchases.cost_price) FROM Purchases WHERE Purchases.product_id = Products.product_id)
AS profits
GROUP BY Products.product_name
ORDER BY profits
DESC;

'SELECT product_name, min(salePrice-cost) as minProfit, max(salePrice-cost) as maxProfit FROM Products, Sales, stock where Products.products_Id = Sales.product_Id and Sales.product_Id = stock.product_Id group by product_name order by maxProfit desc', cb );exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {name : input.name,category_id:input.cat};
       	var queryStr ='insert into users set ?'
		console.log	(JSON.stringify(data))
		connection.query(queryStr, data, function(err,results){
			res.send({});
			console.log("-------ERR:"+err)
			console.log("-------results:"+results)
		})
	});
};



exports.update = function(req, res, next){
   console.log("\n\n------UPDATING USER")
	var data =req.body;
	console.log("DATA :"+JSON.stringify(data))
    	var id = req.body.id;
    	console.log("############# ID:"+id)
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/login');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.body.id;
	console.log(JSON.stringify(req.body))
	console.log('\n\n\n\ndeleting from users table id :'+id)
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM users WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/login');
		});
	});
};
