
CREATE TABLE Categories (
    category_id int not null auto_increment,
    category_name char(100),
    primary key(category_id),
    CONSTRAINT uc_category_name  UNIQUE (category_name)
    #CONSTRAINT Categories_unique UNIQUE (catagory_name)
)ENGINE=InnoDB;

CREATE TABLE Products (
    product_id int not null auto_increment,
    product_name char(100),
    category_id int(42),
    primary key(product_id),
    FOREIGN KEY(category_id) REFERENCES Categories(category_id),
    CONSTRAINT uc_product_name  UNIQUE (product_name)

)ENGINE=InnoDB;

 create table Suppliers (
     supply_id int not null auto_increment,
     supply_name char(100),
     primary key(supply_id)
)ENGINE=InnoDB;

CREATE TABLE Purchases (
    purchase_id int not null auto_increment,
    name char(100),
    cost_price int(42),
    product_id int(42),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    primary key(purchase_id)
)ENGINE=InnoDB;

CREATE TABLE  Sales (
   sale_id int not null auto_increment,
    qty int(42),
    sales_price int(42),
    product_id int(42),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    primary key(sale_id)
 )ENGINE=InnoDB;
