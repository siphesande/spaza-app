insert into Purchases(supplier_id,qty,cost_price,product_id)
select Suppliers.supplier_id,stock_purchases_csv.quantity,stock_purchases_csv.cost,Products.product_id
FROM stock_purchases_csv
INNER JOIN Suppliers
ON Suppliers.supplier_name=stock_purchases_csv.shop
INNER JOIN Products
ON Products.product_name=stock_purchases_csv.item;
