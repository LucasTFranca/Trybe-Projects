SELECT CONCAT(FIRST_NAME, ' ', LAST_NAME) AS 'Nome completo',
jobs.JOB_TITLE AS 'Cargo',
START_DATE AS 'Data de início do cargo',
departments.DEPARTMENT_NAME AS 'Departamento'
FROM hr.job_history AS job_history
INNER JOIN hr.employees AS employees ON employees.EMPLOYEE_ID = job_history.EMPLOYEE_ID
INNER JOIN hr.jobs AS jobs ON jobs.JOB_ID = job_history.JOB_ID
INNER JOIN hr.departments AS departments ON departments.DEPARTMENT_ID = job_history.DEPARTMENT_ID
ORDER BY `Nome completo` DESC, CARGO;
