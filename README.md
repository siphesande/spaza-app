insert into Sales (product_id,price,qty)
select Products.product_id as id,
       
       sales_csv.sales_price as price,
       sales_csv.no_sold as qty, 
from sales_csv,Products 
where Products.product_name=sales_csv.stock_item# spaza-app
