
--drop table suppliers if exists;

CREATE TABLE Suppliers
(
	Id int NOT NULL auto_increment primary key,
	Name varchar(255) NOT NULL
);

CREATE TABLE Categories
(
	Id int NOT NULL auto_increment primary key,
	Name char (100) not null
);

 CREATE TABLE Products
(
	Id int NOT NULL auto_increment,
	Name char (100) not null,
	Category_Id int not NULL,
	PRIMARY KEY (Id),
	FOREIGN KEY (Category_Id) REFERENCES Categories(Id)
);

CREATE TABLE Purchases
(
	Id int NOT NULL auto_increment,
	Purchase_date Date,
        Purchase_price char (100) not null,
	Qty int NOT NULL,
	Product_Id int,
	Supplier_Id int,
	PRIMARY KEY (Id),
	FOREIGN KEY (Supplier_Id) REFERENCES Suppliers(Id),
	FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);



CREATE TABLE Sales
(
	Id int NOT NULL auto_increment,
	Sales_date Date,
	Qty int NOT NULL,
	Sales_price decimal(10,2),
	Product_Id int,
	PRIMARY KEY (Id),
	FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);

CREATE TABLE Users
(
	Id int NOT NULL auto_increment,
	Username char (100) not null,
        Password varchar (100) not null,
        User_role varchar (100) not null,
        PRIMARY KEY (Id)
);
 
