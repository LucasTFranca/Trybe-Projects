SELECT UPPER(CONCAT(FIRST_NAME, ' ', LAST_NAME)) AS 'Nome completo',
START_DATE AS 'Data de início',
employee.SALARY AS 'Salário'
FROM hr.job_history AS job_history
INNER JOIN hr.employees AS employee ON employee.EMPLOYEE_ID = job_history.EMPLOYEE_ID
WHERE MONTH(START_DATE) BETWEEN 1 AND 3
ORDER BY `Nome completo`, `Data de início`;
