import itertools


def change(amount):
    if amount == 12:
        return [5, 7]
    if amount % 5 == 0:
        return list(itertools.repeat(5, int(amount / 5)))
    if amount % 7 == 0:
        return list(itertools.repeat(7, int(amount / 7)))

    if amount == 6 or amount < 5:
        raise Exception('Encountered invalid value %s' % amount)

    new_list = change(amount - 7)
    new_list.append(7)

    return new_list


for i in range(24, 100):
    print(change(i))
