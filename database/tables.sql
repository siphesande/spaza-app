DROP TABLE IF EXISTS `Categories`;
CREATE TABLE Categories (
    id int not null auto_increment,
    category_name char(100),
    primary key(id),
    CONSTRAINT uc_category_name  UNIQUE (category_name)
    #CONSTRAINT Categories_unique UNIQUE (catagory_name)
)ENGINE=InnoDB;


DROP TABLE IF EXISTS `Products`;
CREATE TABLE Products (
    id int not null auto_increment,
    product_name char(100),
    category_id int(42),
    primary key(id),
    FOREIGN KEY(category_id) REFERENCES Categories(category_id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Suppliers`;
create table Suppliers (
     id int not null auto_increment,
     supplier_name char(100),
     primary key(id),
     CONSTRAINT uc_supplier_name  UNIQUE (supplier_name)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Purchases`;
CREATE TABLE Purchases (
    id int not null auto_increment,   
    qty int(42),
    purchase_date date,
    cost_price decimal(42,2),
    supplier_id int(42),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id),
    product_id int(42),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    primary key(id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Sales`;
CREATE TABLE  Sales (
    id int not null auto_increment,
    qty int(42),
    price int(42),
    sale_date DATE,
    product_id int(42),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    primary key(id)
)ENGINE=InnoDB;
