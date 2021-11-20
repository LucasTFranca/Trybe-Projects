SELECT
JOB_TITLE AS 'Cargo',
ROUND(AVG(employee.SALARY), 2) AS 'Média salarial',
CASE
WHEN ROUND(AVG(employee.SALARY), 2) AND ROUND(AVG(employee.SALARY), 2) <= 5800  THEN 'Júnior'
WHEN ROUND(AVG(employee.SALARY), 2) >= 5801 AND ROUND(AVG(employee.SALARY), 2) <= 7500  THEN 'Pleno'
WHEN ROUND(AVG(employee.SALARY), 2) >= 7501 AND ROUND(AVG(employee.SALARY), 2) <= 10500 THEN 'Sênior'
ELSE 'CEO'
END AS 'Senioridade'
FROM hr.jobs AS jobs
INNER JOIN hr.employees AS employee ON employee.JOB_ID = jobs.JOB_ID
GROUP BY Cargo
ORDER BY `Média salarial`, Cargo;
