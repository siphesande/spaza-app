INSERT INTO Suppliers (Name)
SELECT DISTINCT shop FROM stock_purchases_csv; 
