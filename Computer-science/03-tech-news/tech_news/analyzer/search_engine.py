from tech_news.database import search_news
from datetime import datetime


# Requisito 6
def search_by_title(title):
    found_list = search_news({
        'title': {'$regex': f'{title}', '$options': 'i'}
    })
    formated_list = [
        (item['title'], item['url']) for item in found_list
    ]
    return formated_list


# Requisito 7
def search_by_date(date):
    try:
        formated_date = datetime.strptime(date, '%Y-%m-%d')
        formated_date = formated_date.date()
        found_list = search_news({'timestamp': {'$regex': f'{formated_date}'}})
        formated_list = [
            (item['title'], item['url']) for item in found_list
        ]
    except ValueError:
        raise ValueError('Data inválida')
    return formated_list


# Requisito 8
def search_by_source(source):
    found_list = search_news({
        'sources': {'$regex': f'{source}', '$options': 'i'}
    })
    formated_list = [
        (item['title'], item['url']) for item in found_list
    ]
    return formated_list


# Requisito 9
def search_by_category(category):
    found_list = search_news({
        'categories': {'$regex': f'{category}', '$options': 'i'}
    })
    formated_list = [
        (item['title'], item['url']) for item in found_list
    ]
    return formated_list
