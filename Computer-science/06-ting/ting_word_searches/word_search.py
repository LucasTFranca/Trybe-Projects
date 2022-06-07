def exists_word(word, instance):
    exists_word_list = []

    for path_name in instance.queue:
        with open(path_name, "r") as file:
            lines = file.read().split("\n")

            exists_word_list.append({
                "palavra": word,
                "arquivo": path_name,
                "ocorrencias": [],
            })

            for index, line in enumerate(lines):
                if word.lower() in line.lower():
                    exists_word_list[-1]["ocorrencias"].append({
                        "linha": index + 1,
                    })

            if exists_word_list[-1]["ocorrencias"] == []:
                exists_word_list.pop()

    return exists_word_list


def search_by_word(word, instance):
    exists_word_list = []

    for path_name in instance.queue:
        with open(path_name, "r") as file:
            lines = file.read().split("\n")

            exists_word_list.append({
                "palavra": word,
                "arquivo": path_name,
                "ocorrencias": [],
            })

            for index, line in enumerate(lines):
                if word.lower() in line.lower():
                    exists_word_list[-1]["ocorrencias"].append({
                        "linha": index + 1,
                        "conteudo": line,
                    })

            if exists_word_list[-1]["ocorrencias"] == []:
                exists_word_list.pop()

    return exists_word_list
