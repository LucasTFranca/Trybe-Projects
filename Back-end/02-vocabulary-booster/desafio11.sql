SELECT t1.ContactName AS 'Nome',
t1.Country AS 'País',
(
SELECT COUNT(Country) - 1
FROM w3schools.customers AS t2
WHERE t1.Country = t2.Country
GROUP BY t2.Country
) AS 'Número de compatriotas'
FROM w3schools.customers AS t1
WHERE (
SELECT COUNT(Country) - 1
FROM w3schools.customers AS t2
WHERE t1.Country = t2.Country
GROUP BY t2.Country
) > 0
ORDER BY t1.ContactName;
