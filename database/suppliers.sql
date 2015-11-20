INSERT INTO Suppliers (supplier_name)
SELECT DISTINCT shop FROM stock_purchases_csv; 
