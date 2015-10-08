/*INSERT INTO Suppliers(supplier_name) VALUES ('China Town');
INSERT INTO Suppliers(supplier_name) VALUES('Epping Market');
INSERT INTO Suppliers(supplier_name) VALUES('HomeMade');
INSERT INTO Suppliers(supplier_name) VALUES('Makro');*/
INSERT INTO Suppliers (supplier_name)
SELECT DISTINCT shop
FROM stock_purchases_csv;