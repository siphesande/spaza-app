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
