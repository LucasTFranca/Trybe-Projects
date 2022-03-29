import numbers
from src.jobs import read


def get_unique_job_types(path):
    rows = read(path)
    result = []

    for row in rows:
        if row['job_type'] not in result:
            result.append(row['job_type'])

    return result


def filter_by_job_type(jobs, job_type):
    filtered_jobs = []

    for job in jobs:
        if job['job_type'] == job_type:
            filtered_jobs.append(job)

    return filtered_jobs


def get_unique_industries(path):
    rows = read(path)
    result = []

    for row in rows:
        if row['industry'] not in result and row['industry'] != '':
            result.append(row['industry'])

    return result


def filter_by_industry(jobs, industry):
    filtered_jobs = []

    for job in jobs:
        if job['industry'] == industry:
            filtered_jobs.append(job)

    return filtered_jobs


def get_max_salary(path):
    rows = read(path)
    max_salary = 0

    for row in rows:
        if (row['max_salary'] != '' and row['max_salary'] != 'invalid'):
            if float(row['max_salary']) > max_salary:
                max_salary = float(row['max_salary'])

    return max_salary


def get_min_salary(path):
    rows = read(path)
    min_salary = float(rows[3]['min_salary'])

    for row in rows:
        if (row['min_salary'] != '' and row['min_salary'] != 'invalid'):
            if float(row['min_salary']) < min_salary:
                min_salary = float(row['min_salary'])

    return min_salary


def matches_salary_range(job, salary):
    if 'min_salary' not in job or 'max_salary' not in job:
        raise ValueError()

    max_salary = job['max_salary']
    min_salary = job['min_salary']

    if (
        not isinstance(max_salary, numbers.Number)
        or not isinstance(min_salary, numbers.Number)
    ):
        raise ValueError()

    if min_salary > max_salary:
        raise ValueError()

    if min_salary <= salary <= max_salary:
        return True

    return False


def filter_by_salary_range(jobs, salary):
    filtered_jobs = []

    for job in jobs:
        try:
            validate_salary_value = matches_salary_range(job, salary)

            if validate_salary_value is True:
                filtered_jobs.append(job)
        except(KeyError, TypeError, NameError, ValueError):
            continue

    return filtered_jobs
