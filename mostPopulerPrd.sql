SELECT product_id,
SUM(qty) AS qty FROM Sales
GROUP BY product_id
ORDER BY qty DESC
LIMIT 1