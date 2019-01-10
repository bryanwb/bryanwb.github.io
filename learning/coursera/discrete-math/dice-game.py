import itertools


def count_wins(dice1, dice2):
    assert len(dice1) == 6 and len(dice2) == 6
    dice1_wins, dice2_wins = 0, 0
    for d1, d2 in itertools.product(dice1, dice2):
        if d1 > d2:
            dice1_wins += 1
        elif d2 > d1:
            dice2_wins += 1

    return (dice1_wins, dice2_wins)


def find_the_best_dice(dices):
    winner = -1
    assert all(len(dice) == 6 for dice in dices)

    for index, dice in enumerate(dices):
        has_lost = False
        list_other_dice = dices.copy()
        list_other_dice.remove(dice)
        for other_dice in list_other_dice:
            wins1, wins2 = count_wins(dice, other_dice)
            if wins2 > wins1 or wins2 == wins1:
                has_lost = True

        if not has_lost:
            winner = index

    return winner


def find_first_better(index, dices):
    first_dice = dices[index]
    for i, other_dice in enumerate(dices):
        if i == index:
            pass
        else:
            wins1, wins2 = count_wins(first_dice, other_dice)
            if wins2 > wins1:
                return i

    raise RuntimeError('Unable to find a dice that can beat %s in dices %s' % (first_dice, dices))
    
    
def compute_strategy(dices):
    assert all(len(dice) == 6 for dice in dices)

    strategy = dict()
    strategy["choose_first"] = False
    winner = find_the_best_dice(dices)

    if winner != -1:
        strategy['choose_first'] = True
        strategy['first_dice'] = winner
        return strategy
        
    for i in range(len(dices)):
        strategy[i] = find_first_better(i, dices)
    
    return strategy


input1 = [[1, 1, 4, 6, 7, 8], [2, 2, 2, 6, 7, 7], [3, 3, 3, 5, 5, 8]]
expected = {'choose_first': False, 0: 1, 1: 2, 2: 0}
print(compute_strategy(input1) == expected)
input2 = [[4, 4, 4, 4, 0, 0], [7, 7, 3, 3, 3, 3], [6, 6, 2, 2, 2, 2], [5, 5, 5, 1, 1, 1]]
expected = {'choose_first': True, 'first_dice': 1}
print(compute_strategy(input2) == expected)

def test_compute_strategy():
    input1 = [[1, 1, 4, 6, 7, 8], [2, 2, 2, 6, 7, 7], [3, 3, 3, 5, 5, 8]]
    expected = {'choose_first': False, 0: 1, 1: 2, 2: 0}
    assert compute_strategy(input1) == expected
    input2 = [[4, 4, 4, 4, 0, 0], [7, 7, 3, 3, 3, 3], [6, 6, 2, 2, 2, 2], [5, 5, 5, 1, 1, 1]]
    expected = {'choose_first': True, 'first_dice': 1}
    assert compute_strategy(input2) == expected
    

def test_find_best_dice():
    input1 = [[1, 1, 6, 6, 8, 8], [2, 2, 4, 4, 9, 9], [3, 3, 5, 5, 7, 7]]
    assert find_the_best_dice(input1) == -1
    input2 = [[1, 1, 2, 4, 5, 7], [1, 2, 2, 3, 4, 7], [1, 2, 3, 4, 5, 6]]
    assert find_the_best_dice(input2) == 2

    input3 = [[3, 3, 3, 3, 3, 3], [6, 6, 2, 2, 2, 2],
              [4, 4, 4, 4, 0, 0], [5, 5, 5, 1, 1, 1]]
    assert find_the_best_dice(input3) == -1


def test_count_wins():
    dice1 = [1, 2, 3, 4, 5, 6]
    dice2 = [1, 2, 3, 4, 5, 6]
    assert count_wins(dice1, dice2) == (15, 15)

    dice1 = [1, 1, 6, 6, 8, 8]
    dice2 = [2, 2, 4, 4, 9, 9]
    assert count_wins(dice1, dice2) == (16, 20)


    
