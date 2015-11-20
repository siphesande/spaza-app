INSERT INTO Purchases (Qty,Purchase_price,Purchase_date,Product_Id, Supplier_Id)
SELECT stock_purchases_csv.quantity,stock_purchases_csv.cost,stock_purchases_csv.date, Products.Id AS product_id, Suppliers.Id AS supplier_id
FROM stock_purchases_csv 
INNER JOIN Suppliers
ON Suppliers.supplier_name = stock_purchases_csv.shop
INNER JOIN Products
ON Products.product_name = stock_purchases_csv.item;
