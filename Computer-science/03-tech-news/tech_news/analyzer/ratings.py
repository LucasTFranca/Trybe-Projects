from tech_news.database import find_news


# Requisito 10
def top_5_news():
    news = find_news()

    news_ordened = []
    for news_item in news:
        counter = news_item['shares_count'] + news_item['comments_count']
        news_ordened.append({'url': news_item['url'], 'counter': counter})

    news_ordened.sort(key=lambda item: item['counter'], reverse=True)

    top_5_news = []
    for index, news_item in enumerate(news_ordened[:5], start=0):
        top_5_news.append((f'noticia_{index + 1}', news_item['url']))

    return top_5_news


# Requisito 11
def top_5_categories():
    news = find_news()

    categories = {}
    for news_item in news:
        for category in news_item['categories']:
            if category not in categories:
                categories[category] = 1
            else:
                categories[category] += 1

    categories_ordened = []
    for category_key in categories.keys():
        categories_ordened.append({
            'category': category_key, 'counter': categories[category_key]
        })

    categories_ordened.sort(key=lambda item: item['counter'], reverse=True)
    categories_ordened.sort(key=lambda item: item['category'])

    top_5_categories = [item['category'] for item in categories_ordened[:5]]

    return top_5_categories
