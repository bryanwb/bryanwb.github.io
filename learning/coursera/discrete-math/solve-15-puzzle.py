

def increment_counter(counter):
    counter += 1
    if counter > 1000:
        raise RuntimeError('In infinite loop')

    
class Puzzle:

    def __init__(self, p):
        self.p = p
        self.moves = []
        self.counter = 0
        self.current_row = 1
        self.current_col = 1

    def increment_counter(self):
        self.counter += 1
        if self.counter > 500:
            import pdb; pdb.set_trace()

            raise RuntimeError('In infinite loop')

    
def get_column_nums(col, row):
    currentval = col + ((row - 1) * 4)
    return range(currentval, 16, 4)


def get_row_nums(col, row):
    currentval = col + ((row - 1) * 4)
    max = row * 4 + 1
    return range(currentval, max, 1)


def get_next(puzzle):
    def find_out_of_order(pieces):
        return list(filter(lambda piece: puzzle.p.index(piece) != piece - 1, pieces))

    # if we get here, we're done
    if puzzle.current_col == 4 or puzzle.current_row == 4:
        return False

    column_nums = get_column_nums(puzzle.current_col, puzzle.current_row)
    row_nums = get_row_nums(puzzle.current_col, puzzle.current_row)
    if len(column_nums) <= len(row_nums):
        set_ooo = column_nums
        set_ooo = find_out_of_order(set_ooo)
        if len(set_ooo) < 1:
            puzzle.current_col += 1
            return get_next(puzzle)
    else:
        set_ooo = row_nums
        set_ooo = find_out_of_order(set_ooo)
        if len(set_ooo) < 1:
            puzzle.current_row += 1
            return get_next(puzzle)

    length = len(set_ooo)

    if length > 2:
        return [set_ooo[0]]
    else:
        set_ooo.reverse()
        return set_ooo


def is_swappable(num, puzzle):
    z_index = puzzle.p.index(0)
    num_index = puzzle.p.index(num)

    swappable_range = [num_index + 4, num_index - 4, num_index - 1, num_index + 1]
    return z_index in swappable_range


def swap(num, puzzle):
    assert is_swappable(num, puzzle)
    z_index = puzzle.p.index(0)
    num_index = puzzle.p.index(num)
    puzzle.p[z_index] = num
    puzzle.p[num_index] = 0
    puzzle.increment_counter()
    puzzle.moves.append(num)


def get_row(num, puzzle):
    return int(puzzle.p.index(num) / 4) + 1


def get_column(num, puzzle):
    col = (puzzle.p.index(num) + 1) % 4
    if col == 0:
        col = 4
    return col

    
def move_to_target(num, puzzle):
    # move to space below if possible
    if puzzle.p.index(num) % 4 == 0:
        target_index = puzzle.p.index(num) + 4
    else:
        target_index = puzzle.p.index(num) - 1

    if puzzle.p.index(0) == target_index:
        swap(num, puzzle)
    else:
        target_row = int(target_index / 4) + 1
        target_col = (target_index + 1) % 4
        z_row = get_row(0, puzzle)
        z_col = get_column(0, puzzle)

        # if target is below current z-index, move down
        if target_col != z_col:
            if target_col > z_col:
                swap(puzzle.p[puzzle.p.index(0) + 1], puzzle)
            else:
                swap(puzzle.p[puzzle.p.index(0) - 1], puzzle)
        elif target_row != z_row:
            if target_row > z_row:
                swap(puzzle.p[puzzle.p.index(0) + 4], puzzle)
            else:
                swap(puzzle.p[puzzle.p.index(0) - 4], puzzle)

    if puzzle.p.index(num) == num - 1:
        return True

    return move_to_target(num, puzzle)
        
    
def solve(nums, puzzle):
    if len(nums) > 1:
        # ensure they are next to each other
        assert abs(puzzle.p.index(nums[0]) - puzzle.p.index(nums[1])) == 1

    while(len(nums) > 0):
        if puzzle.p.index(nums[0]) == nums[0] - 1:
            break
        
        move_to_target(nums[0], puzzle)
        nums.remove(nums[0])


def _solution(position, rounds=None):
    max = 999999999
    if rounds:
        max = rounds
        
    counter = 0
    puzzle = Puzzle(position)
    nums = get_next(puzzle)
    while(nums):
        solve(nums, puzzle)
        counter += 1
        if counter > max:
            return puzzle
        
        nums = get_next(puzzle)

    return puzzle


def solution(position):
    puzzle = _solution(position)

    return puzzle.moves
    

# position = [1, 2, 3, 4, 5, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
# expected = [15, 14, 10, 13, 9, 10, 14, 15]
# actual = solution(position)
# assert actual == expected, 'Actual was %s' % actual

def test_solve_complex():
    input = [5, 1, 4, 8, 9, 6, 3, 11, 10, 2, 15, 7, 13, 14, 12, 0]
    # expected = list(range(16))
    expected = [1, 0, 4, 8, 5, 6, 3, 11, 9, 2, 15, 7, 10, 13, 14, 12]
    expected.append(0)
    puzzle = _solution(input, rounds=1)
    assert puzzle.p == expected


def test_solve_column():
    input_w_column = [1, 2, 3, 4, 5, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    puzzle = Puzzle(input_w_column)
    nums = get_next(puzzle)
    solve(nums, puzzle)
    assert puzzle.p[8] == 9
    assert puzzle.p[12] == 13


def test_solve_column_backwards():
    input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    nums = get_next(puzzle)
    solve(nums, puzzle)
    assert puzzle.p[9] == 10
    assert puzzle.p[13] == 14
    

def test_solve_row():
    input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]
    expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
    puzzle = Puzzle(input)
    nums = get_next(puzzle)
    solve(nums, puzzle)
    assert puzzle.p == expected


def test_solve_simple():
    input = [1, 2, 3, 4, 5, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    expected = [15, 14, 10, 13, 9, 10, 14, 15]
    actual = solution(input)
    assert actual == expected

    
def test_compute_col_row():
    assert get_column_nums(1, 1) == [1, 5, 9, 13]
    assert get_row_nums(2, 1) == [2, 3, 4]
    assert get_column_nums(2, 2) == [6, 10, 14]
    assert get_row_nums(3, 2) == [7, 8]
    assert get_column_nums(3, 3) == [11, 15]
    
    
def test_find_next():
    expected = [13, 9]
    input_w_column = [1, 2, 3, 4, 5, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    puzzle = Puzzle(input_w_column)
    actual = get_next(puzzle)
    assert actual == expected

    expected = [5]
    input_w_row = [1, 2, 3, 5, 4, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    puzzle = Puzzle(input_w_row)
    actual = get_next(puzzle)
    assert actual == expected

    expected = [1]
    input_w_row = [2, 1, 3, 5, 4, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    puzzle = Puzzle(input_w_row)
    actual = get_next(puzzle)
    assert actual == expected

    expected = [6]
    input_w_row = [1, 2, 3, 4, 5, 8, 7, 6, 9, 10, 11, 12, 13, 14, 15, 0]
    puzzle = Puzzle(input_w_row)
    actual = get_next(puzzle)
    assert actual == expected

    # if the column length is less than the row length, solve the column
    input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    expected = [14, 10]
    actual = get_next(puzzle)
    assert actual == expected
    
