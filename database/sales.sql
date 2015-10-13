/*INSERT INTO Sales(sale_name)
SELECT DISTINCT  stock_item FROM sales_csv;*/
insert into Sales (product_id,sale_date,price,qty)
select Products.product_id,sales_csv.date,sales_csv.sales_price,sales_csv.no_sold
FROM sales_csv
INNER JOIN Products
ON Products.product_name=sales_csv.stock_item;
/*SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID=Customers.CustomerID;*/