from time import sleep
from tech_news.database import create_news
import requests
import parsel


# Requisito 1
def fetch(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        sleep(1)
        return response.text
    except (requests.HTTPError, requests.ReadTimeout):
        return None


# Requisito 2
def scrape_novidades(html_content):
    selector = parsel.Selector(html_content)
    print(selector)

    link_list = []
    for item in selector.css(".tec--list__item"):
        link = item.css(".tec--card__title__link::attr(href)").get()
        link_list.append(link)

    return link_list


# Requisito 3
def scrape_next_page_link(html_content):
    selector = parsel.Selector(html_content)
    next_page_link = selector.css(".tec--btn::attr(href)").get()

    return next_page_link


# Requisito 4
def scrape_noticia(html_content):
    selector = parsel.Selector(html_content)

    url = selector.css("head link[rel='canonical']::attr(href)").get()

    title = selector.css(".tec--article__header__title::text").get()
    timestamp = selector.css("#js-article-date::attr(datetime)").get()
    writer = selector.css(".z--font-bold ::text").get()
    writer = None if writer is None else writer.strip()

    shares_count = selector.css(".tec--toolbar__item::text").get()
    if not shares_count:
        shares_count = 0
    else:
        shares_count = int(shares_count.strip("Compartilharam"))

    comments_count = int(
        selector.css(
            ".tec--toolbar__item #js-comments-btn::attr(data-count)"
        ).get()
    )

    summary_html_content = selector.css(".tec--article__body p").getall()
    summary_final_html_content = parsel.Selector(summary_html_content[0])
    summary_text_content = summary_final_html_content.css("::text").getall()
    summary = ""
    for item in summary_text_content:
        summary += item

    primary_badges = selector.css(".tec--badge--primary::text").getall()
    primary_badges = [badge.strip() for badge in primary_badges]
    categories = primary_badges

    sources = []
    for item in selector.xpath(
        '//a[contains(@class,"tec--badge") and not(contains(@class,'
        + '"tec--badge--primary")) ]/text()'
    ).getall():
        sources.append(item.strip())

    return {
        "url": url,
        "title": title,
        "timestamp": timestamp,
        "writer": writer,
        "shares_count": shares_count,
        "comments_count": comments_count,
        "summary": summary,
        "sources": sources,
        "categories": categories,
    }


# Requisito 5
def get_tech_news(amount):
    url = "https://www.tecmundo.com.br/novidades"
    html_content = fetch(url)

    news = scrape_novidades(html_content)

    while len(news) < amount:
        next_page_link = scrape_next_page_link(html_content)
        next_page_html_content = fetch(next_page_link)
        new_news = scrape_novidades(next_page_html_content)

        for news_page_link in new_news:
            news.append(news_page_link)

    last_news = news[:amount]

    news_content_list = []
    for news_url in last_news:
        html_content = fetch(news_url)
        news_content = scrape_noticia(html_content)
        news_content_list.append(news_content)

    create_news(news_content_list)
    return news_content_list
