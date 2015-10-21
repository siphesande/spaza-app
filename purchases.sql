insert into Purchases(Supplier_Id,Qty,Purchase_price,Purchase_date,Product_id)
select Suppliers.Id,stock_purchases_csv.quantity,stock_purchases_csv.cost,stock_purchases_csv.date,Products.Id
FROM stock_purchases_csv
INNER JOIN Suppliers
ON Suppliers.Name=stock_purchases_csv.shop
INNER JOIN Products
ON Products.Name=stock_purchases_csv.item;
