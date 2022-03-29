from src.sorting import sort_by


def test_sort_by_criteria():
    jobs = [
        {"max_salary": 10000, "min_salary": 200},
        {"max_salary": 1500, "min_salary": 100},
    ]

    assert sort_by(jobs, 'min_salary') == jobs.sort(
        key=lambda job: job['min_salary']
    )

    assert sort_by(jobs, 'max_salary') == jobs.sort(
        key=lambda job: job['max_salary']
    )
