SELECT Country
FROM w3schools.customers
UNION
SELECT Country
FROM w3schools.suppliers
GROUP BY Country
ORDER BY Country
LIMIT 5;
