-- DROP TABLE IF EXISTS `Categories`;
-- CREATE TABLE Categories (
--     Id int not null auto_increment,
--     category_name char(100),
--     primary key(Id),
--     CONSTRAINT uc_category_name  UNIQUE (category_name)
--     #CONSTRAINT Categories_unique UNIQUE (catagory_name)
-- )ENGINE=InnoDB;


-- DROP TABLE IF EXISTS `Products`;
-- CREATE TABLE Products (
--     Id int not null auto_increment,
--     product_name char(100),
--     Category_Id int(42),
--     primary key(Id),
--     FOREIGN KEY(Category_Id) REFERENCES Categories(Category_Id)
-- )ENGINE=InnoDB;

-- DROP TABLE IF EXISTS `Suppliers`;
-- create table Suppliers (
--      Id int not null auto_increment,
--      supplier_name char(100),
--      primary key(Id),
--      CONSTRAINT uc_supplier_name  UNIQUE (supplier_name)
-- )ENGINE=InnoDB;

-- DROP TABLE IF EXISTS `Purchases`;
-- CREATE TABLE Purchases (
--     Id int not null auto_increment,   
--     Qty int(42),
--     Purchase_date date,
--     Purchase_price decimal(42,2),
--     Supplier_Id int(42),
--     FOREIGN KEY (Supplier_Id) REFERENCES Suppliers(Id),
--     Product_Id int(42),
--     FOREIGN KEY (Product_Id) REFERENCES Products(Id),
--     primary key(Id)
-- )ENGINE=InnoDB;

-- DROP TABLE IF EXISTS `Sales`;
-- CREATE TABLE  Sales (
--     Id int not null auto_increment,
--     Qty int(42),
--     Sales_price int(42),
--     Sales_date DATE,
--     Product_Id int(42),
--     FOREIGN KEY (Product_Id) REFERENCES Products(Id),
--     primary key(Id)
-- )ENGINE=InnoDB;


DROP TABLE IF EXISTS `users`;
CREATE TABLE  users(
Id int NOT NULL auto_increment primary key,
usename VARCHAR(30) NOT NULL,
password VARCHAR(100) NOT NULL,
role VARCHAR(15) NOT NULL
);
DROP TABLE IF EXISTS `Categories`;
CREATE TABLE Categories (
    Id int not null auto_increment,
    category_name char(100),
    primary key(Id),
    CONSTRAINT uc_category_name  UNIQUE (category_name)
    #CONSTRAINT Categories_unique UNIQUE (catagory_name)
)ENGINE=InnoDB;


DROP TABLE IF EXISTS `Products`;
CREATE TABLE Products (
    Id int not null auto_increment,
    product_name char(100),
    Category_Id int(42),
    primary key(Id),
    FOREIGN KEY(Category_Id) REFERENCES Categories(Id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Suppliers`;
create table Suppliers (
     Id int not null auto_increment,
     supplier_name char(100),
     primary key(Id),
     CONSTRAINT uc_supplier_name  UNIQUE (supplier_name)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Purchases`;
CREATE TABLE Purchases (
    Id int not null auto_increment,   
    Qty int(42),
    Purchase_date date,
    Purchase_price decimal(42,2),
    Supplier_Id int(42),
    FOREIGN KEY (Supplier_Id) REFERENCES Suppliers(Id),
    Product_Id int(42),
    FOREIGN KEY (Product_Id) REFERENCES Products(Id),
    primary key(Id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE  Sales (
    Id int not null auto_increment,
    Qty int(42),
    Sales_price int(42),
    Sales_date DATE,
    Product_Id int(42),
    FOREIGN KEY (Product_Id) REFERENCES Products(Id),
    primary key(Id)
)ENGINE=InnoDB;
