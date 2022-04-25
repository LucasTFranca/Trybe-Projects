def is_palindrome_recursive(word, low_index, high_index):
    if len(word) == 0:
        return False

    half_word = len(word) / 2

    if word[low_index] == word[high_index]:
        if low_index == high_index:
            return True
        elif low_index == half_word or high_index == half_word:
            return True

        return is_palindrome_recursive(word, low_index + 1, high_index - 1)
    else:
        return False
