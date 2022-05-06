class TrackOrders:
    def __init__(self):
        self.orders = []
        self.menu = []
        self.days = []

    def __len__(self):
        length = len(self.orders)
        return length

    def days_create(self, orders):
        if len(orders) == 0:
            return

        for line in orders:
            if line[2] not in self.days:
                self.days.append(line[2])

    def menu_create(self, orders):
        if len(orders) == 0:
            return
        else:
            for line in orders:
                if line[1] not in self.menu:
                    self.menu.append(line[1])

    def add_new_order(self, customer, order, day):
        self.orders.append([customer, order, day])

    def create_customer_order_dict(self, customer):
        customer_orders = {}

        for line in self.orders:
            if line[0] == customer:
                if line[1] not in customer_orders:
                    customer_orders[line[1]] = 1
                else:
                    customer_orders[line[1]] += 1

        return customer_orders

    def get_most_ordered_dish_per_customer(self, customer):
        customer_orders = self.create_customer_order_dict(customer)

        most_ordered_dish = ''

        for dish in customer_orders:
            if most_ordered_dish == '':
                most_ordered_dish = dish
            elif customer_orders[dish] > customer_orders[most_ordered_dish]:
                most_ordered_dish = dish

        return most_ordered_dish

    def get_never_ordered_per_customer(self, customer):
        self.menu_create(self.orders)
        customer_orders = self.create_customer_order_dict(customer)

        never_ordered = set()

        for dish in self.menu:
            if dish not in customer_orders:
                never_ordered.add(dish)

        return never_ordered

    def create_customer_day_dict(self, customer):
        self.days_create(self.orders)
        customer_days = {}

        for line in self.orders:
            if line[0] == customer:
                if line[2] not in customer_days:
                    customer_days[line[2]] = 1
                else:
                    customer_days[line[2]] += 1

        return customer_days

    def get_days_never_visited_per_customer(self, customer):
        customer_days = self.create_customer_day_dict(customer)

        never_visited = set()

        for day in self.days:
            if day not in customer_days:
                never_visited.add(day)

        return never_visited

    def get_how_much_visited_per_day(self):
        visited_per_day = {}

        for line in self.orders:
            if line[2] not in visited_per_day:
                visited_per_day[line[2]] = 1
            else:
                visited_per_day[line[2]] += 1

        return visited_per_day

    def get_busiest_day(self):
        visited_per_day = self.get_how_much_visited_per_day()

        busiest_day = ''

        for day in visited_per_day:
            if busiest_day == '':
                busiest_day = day
            elif visited_per_day[day] > visited_per_day[busiest_day]:
                busiest_day = day

        return busiest_day

    def get_least_busy_day(self):
        visited_per_day = self.get_how_much_visited_per_day()

        least_day = ''

        for day in visited_per_day:
            if least_day == '':
                least_day = day
            elif visited_per_day[day] < visited_per_day[least_day]:
                least_day = day

        return least_day
