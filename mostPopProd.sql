SELECT Products.product_name, SUM(Sales.qty) AS qty
FROM Sales
INNER JOIN Products ON Sales.product_id = Products.product_id
GROUP BY Products.product_name
ORDER BY qty
DESC LIMIT 1;