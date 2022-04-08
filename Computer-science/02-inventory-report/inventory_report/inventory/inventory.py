from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport
import csv
import json
import xmltodict


class Inventory:
    @classmethod
    def import_data(cls, path, method_type):
        data = []

        if path.endswith('.csv'):
            with open(path) as csv_file:
                csv_reader = csv.DictReader(csv_file)
                data = list(csv_reader)
        elif path.endswith('json'):
            data = json.load(open(path))
        else:
            with open(path, 'r') as xml_file:
                data_dict = xmltodict.parse(xml_file.read())
                json_data = json.dumps(data_dict)
                data = json.loads(json_data)['dataset']['record']

        if method_type == 'simples':
            return SimpleReport.generate(data)
        elif method_type == 'completo':
            return CompleteReport.generate(data)
