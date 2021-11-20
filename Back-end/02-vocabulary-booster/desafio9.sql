SELECT CONCAT(employee.FirstName, ' ', employee.LastName) AS 'Nome completo',
COUNT(orders.OrderID) AS 'Total de pedidos'
FROM w3schools.orders AS orders
INNER JOIN w3schools.employees AS employee ON employee.EmployeeID = orders.EmployeeID
GROUP BY `Nome completo`
ORDER BY `Total de pedidos`;
