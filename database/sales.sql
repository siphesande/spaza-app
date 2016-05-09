INSERT INTO Sales (Qty,sales_price,sales_date,Product_Id)
SELECT sales_csv.no_sold,sales_csv.sales_price,sales_csv.date, Products.Id
FROM sales_csv 
INNER JOIN Products
ON Products.product_name = sales_csv.stock_item;
