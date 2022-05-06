import csv


def day_and_menu_verify(item, days, menu):
    if item[1] not in days:
        days.append(item[1])

    if item[0] not in menu:
        menu.append(item[0])


def object_constructor(data):
    orders = {customer: {} for customer in data.keys()}
    menu = []
    days = []

    for customer in data.keys():
        for item in data[customer]:
            day_and_menu_verify(item, days, menu)

            if item[0] not in orders[customer]:
                orders[customer][item[0]] = 1
            else:
                orders[customer][item[0]] += 1

    return orders, menu, days


def maria_analyze(orders):
    maria_most_order = ''

    for food in orders['maria']:
        if maria_most_order == '':
            maria_most_order = food
        elif orders['maria'][food] > orders['maria'][maria_most_order]:
            maria_most_order = food

    return maria_most_order


def joao_order_analyze(orders, menu):
    joao_never_ordered = set()

    for food in menu:
        if food not in orders['joao']:
            joao_never_ordered.add(food)

    return joao_never_ordered


def joao_went_analyze(data, days):
    joao_never_went = set()

    for day in days:
        for line in data['joao']:
            if day not in line[1]:
                joao_never_went.add(day)

    return joao_never_went


def analyze_orders(data, orders, menu, days):
    maria_most_order = maria_analyze(orders)

    joao_never_ordered = joao_order_analyze(orders, menu)

    joao_never_went = joao_went_analyze(data, days)

    return maria_most_order, joao_never_ordered, joao_never_went


def analyze_log_constructor(path_to_file):
    with open(path_to_file, 'r') as file:
        reader = csv.reader(file)
        log_list = list(reader)

        data = {}

        for line in log_list:
            if line[0] not in data:
                data[line[0]] = [line[1:]]
            else:
                data[line[0]].append(line[1:])

        orders, menu, days = object_constructor(data)

        (
            maria_most_order, joao_never_ordered, joao_never_went
        ) = analyze_orders(data, orders, menu, days)

        how_much_hamburguer_arnaldo = orders['arnaldo']['hamburguer']

        with open('./data/mkt_campaign.txt', 'w') as write_file:
            write_file.write(f'{maria_most_order}\n')
            write_file.write(f'{how_much_hamburguer_arnaldo}\n')
            write_file.write(f'{joao_never_ordered}\n{joao_never_went}')


def analyze_log(path_to_file):
    try:
        analyze_log_constructor(path_to_file)

    except FileNotFoundError:
        if path_to_file.split('.')[-1] != 'csv':
            raise FileNotFoundError(f"Extensão inválida: '{path_to_file}'")
        else:
            raise FileNotFoundError(f"Arquivo inexistente: '{path_to_file}'")


analyze_log('./data/orders_1.csv')
