
def is_permutation(p):
    return set(p) == set(range(len(p)))


def bryansort(alist):
    counter = 0
    s = 0
    while(s < len(alist)):
        minval = alist[s]
        min = s
        t = s + 1
        while(t < len(alist)):
            if alist[t] < minval:
                minval = alist[t]
                min = t
            t += 1

        # do the swap if not the same as current
        if alist[min] != alist[s]:
            tmp = alist[s]
            alist[s] = alist[min]
            alist[min] = tmp
            counter += 1

        s += 1

    return alist, counter


def is_even(p):
    if not set(p) == set(range(len(p))):
        return False

    def dosort(alist):
        counter = 0
        s = 0
        while(s < len(alist)):
            minval = alist[s]
            min = s
            t = s + 1
            while(t < len(alist)):
                if alist[t] < minval:
                    minval = alist[t]
                    min = t
                t += 1

            # do the swap if not the same as current
            if alist[min] != alist[s]:
                tmp = alist[s]
                alist[s] = alist[min]
                alist[min] = tmp
                counter += 1

            s += 1

        return alist, counter

    _, counter = dosort(p)
    return counter % 2 == 0


# def is_even_permutation(p):
#     if not is_permutation(p):
#         return False

    # sorted_list, counter = bryansort(p)
    # return counter % 2 == 0
    

def test_sorting():
    sorted_list, counter = bryansort([1, 4, 0, 5, 3, 2])
    assert sorted_list == [0, 1, 2, 3, 4, 5]

    sorted_list, counter = bryansort([1, 4, 0, 5, 3, 2])
    assert sorted_list == [0, 1, 2, 3, 4, 5]

    assert is_even([0])
    assert is_even([0, 2, 1]) is False
    assert is_even([0, 2, 1, 4, 3]) is True
    assert is_even([0, 3, 2, 4, 5, 6, 7, 1, 9, 8]) is True
