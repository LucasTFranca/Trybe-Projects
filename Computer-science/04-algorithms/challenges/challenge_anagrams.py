def is_anagram(first_string, second_string):
    if first_string == '' or second_string == '':
        return False

    first_word = list(first_string.lower())
    second_word = list(second_string.lower())

    quicksort(first_word, 0, len(first_word) - 1)
    quicksort(second_word, 0, len(second_word) - 1)

    if ''.join(first_word) == ''.join(second_word):
        return True
    else:
        return False


def quicksort(array, low, high):
    if len(array) == 1:
        return array

    if low < high:
        partition_index = partition(array, low, high)

        quicksort(array, low, partition_index - 1)
        quicksort(array, partition_index + 1, high)


def partition(array, low, high):
    i = low - 1

    pivot = array[high]

    for j in range(low, high):
        if array[j] <= pivot:

            i = i + 1
            array[i], array[j] = array[j], array[i]
    array[i + 1], array[high] = array[high], array[i + 1]

    return i + 1
