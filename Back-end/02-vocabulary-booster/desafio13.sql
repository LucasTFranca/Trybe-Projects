SELECT products.ProductName AS 'Produto',
products.Price AS 'Preço'
FROM w3schools.order_details
INNER JOIN w3schools.products ON order_details.ProductID = products.ProductID
WHERE Quantity > 80
ORDER BY `Produto`;
