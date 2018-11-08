
move_count = 0


def move(from_index, to_index):
    global move_count
    global towers
    num = towers[from_index].pop()
    if len(towers[to_index]) > 0:
        if num > towers[to_index][-1]:
            import pdb; pdb.set_trace()

        assert num < towers[to_index][-1], \
            'tried to move bigger disc %d onto smaller disc %d' % (num, towers[to_index][-1])

    towers[to_index].append(num)
    print 'Moved %d from tower %d to tower %d' % (num, from_index, to_index)
    move_count += 1


def find(n):
    global towers
    if len(towers[0]) > 0 and towers[0][-1] == n:
        return 0
    if len(towers[1]) > 0 and towers[1][-1] == n:
        return 1
    if len(towers[2]) > 0 and towers[2][-1] == n:
        return 2

    return None


def find_best_place(n, current):
    global towers
    sibling_spot = find(n + 1)
    if sibling_spot and sibling_spot != current:
        return sibling_spot

    for i in range(3):
        if len(towers[i]) == 0:
            return i

    else:
        for i in range(3):
            if towers[i][-1] > n:
                return i

        raise RuntimeError('Could not find a spot to move %d to' % n)


def hanoi(n):
    global towers
    if n == 1:
        current = find(n)
        # best_place = find_best_place(n, current)
        next_place = current + 1
        if next_place > 2:
            next_place = 0
        move(current, next_place)
    else:
        hanoi(n - 1)
        current = find(n)
        best_place = find_best_place(n, current)
        move(current, best_place)
        hanoi(n - 1)
        
    
n = 6
first_tower = range(1, n+1)
first_tower.reverse()
towers = [first_tower, [], []]
hanoi(n)
print 'Move count is %d' % move_count
print towers
