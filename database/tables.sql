DROP TABLE IF EXISTS `Categories`;
CREATE TABLE Categories (
    category_id int not null auto_increment,
    category_name char(100),
    primary key(category_id),
    CONSTRAINT uc_category_name  UNIQUE (category_name)
    #CONSTRAINT Categories_unique UNIQUE (catagory_name)
)ENGINE=InnoDB;


DROP TABLE IF EXISTS `Products`;
CREATE TABLE Products (
    product_id int not null auto_increment,
    product_name char(100),
    category_id int(42),
    primary key(product_id),
    FOREIGN KEY(category_id) REFERENCES Categories(category_id),
    CONSTRAINT uc_product_name  UNIQUE (product_name)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Suppliers`;
create table Suppliers (
     supplier_id int not null auto_increment,
     supplier_name char(100),
     primary key(supplier_id),
     CONSTRAINT uc_supplier_name  UNIQUE (supplier_name)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Purchases`;
CREATE TABLE Purchases (
    purchase_id int not null auto_increment,
    
    qty int(42),
    cost_price decimal(42,2),
    supplier_id int(42),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id),
    product_id int(42),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    primary key(purchase_id)
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
