import sys


def process(path_file, instance):
    if path_file not in instance.queue:
        instance.enqueue(path_file)

        file_object = {}

        with open(path_file, "r") as file:
            lines = file.read().split("\n")

            file_object["nome_do_arquivo"] = path_file
            file_object["qtd_linhas"] = len(lines)
            file_object["linhas_do_arquivo"] = lines

        print(file_object)


def remove(instance):
    if len(instance.queue) == 0:
        return print("Não há elementos")

    path_file = instance.queue[0]
    instance.dequeue()

    print(f"Arquivo {path_file} removido com sucesso")


def file_metadata(instance, position):
    if len(instance.queue) < position or position < 0:
        return sys.stderr.write("Posição inválida")
    else:
        file_object = {}
        path_file = instance.queue[position]

        with open(path_file, "r") as file:
            lines = file.read().split("\n")

            file_object["nome_do_arquivo"] = path_file
            file_object["qtd_linhas"] = len(lines)
            file_object["linhas_do_arquivo"] = lines

        print(file_object)
