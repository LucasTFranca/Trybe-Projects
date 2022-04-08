from datetime import datetime


class SimpleReport:
    @classmethod
    def generate(cls, data):
        current_date = datetime(2022, 3, 31)
        old_date = data[0]["data_de_fabricacao"]
        expiry_date = data[0]["data_de_validade"]
        enterprise_counter = {}

        for row in data:
            if old_date > row["data_de_fabricacao"]:
                old_date = row["data_de_fabricacao"]

            if (
                current_date < datetime.fromisoformat(row["data_de_validade"])
                and expiry_date > row["data_de_validade"]
            ):
                expiry_date = row["data_de_validade"]

            if not row["nome_da_empresa"] in enterprise_counter:
                enterprise_counter[row["nome_da_empresa"]] = 1
            else:
                enterprise_counter[row["nome_da_empresa"]] += 1

        enterprise = cls.calculate_enterprise_more_products(
            enterprise_counter
        )["name"]

        return f"""Data de fabricação mais antiga: {old_date}
Data de validade mais próxima: {expiry_date}
Empresa com maior quantidade de produtos estocados: {enterprise}
"""

    @classmethod
    def calculate_enterprise_more_products(cls, enterprises):
        enterprise_more_products = {"value": 0, "name": ""}

        for enterprise in enterprises.keys():
            if enterprises[enterprise] > enterprise_more_products["value"]:
                enterprise_more_products["name"] = enterprise
                enterprise_more_products["value"] = enterprises[enterprise]

        return enterprise_more_products
