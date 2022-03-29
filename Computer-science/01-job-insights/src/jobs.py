from functools import lru_cache
import csv


@lru_cache
def read(path):
    rows = []

    with open(path) as file:
        csvreader = csv.reader(file)
        header = next(csvreader)

        for row in csvreader:
            row_object = {}

            for index, item in enumerate(row, start=0):
                row_object[header[index]] = item

            rows.append(row_object)

    return rows
