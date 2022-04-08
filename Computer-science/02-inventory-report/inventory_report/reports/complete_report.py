from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    @classmethod
    def generate(cls, data):
        enterprise_counter = {}
        enterprise_name = enterprise_counter.keys()

        for row in data:
            if not row["nome_da_empresa"] in enterprise_counter:
                enterprise_counter[row["nome_da_empresa"]] = 1
            else:
                enterprise_counter[row["nome_da_empresa"]] += 1

        simple_report_return = SimpleReport.generate(data)

        enterprise_list_result = list(
            map(
                lambda enterprise: (
                    f"- {enterprise}: {enterprise_counter[enterprise]}\n"
                ),
                enterprise_name,
            )
        )

        enterprise_string_result = ""
        for row in enterprise_list_result:
            enterprise_string_result += row

        return (
            f"{simple_report_return}\n"
            "Produtos estocados por empresa: \n"
            f"{enterprise_string_result}"
        )
