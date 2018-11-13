from copy import deepcopy

ALIGNMENTS = {3: (2, 2), 4: (2, 1),
              7: (2, 2), 8: (2, 1),
              9: (2, 2), 13: (1, 2),
              10: (2, 2), 14: (1, 2)}


class Puzzle:

    def __init__(self, position):
        self.matrix = []
        self._moves = []
        self.move_count = 0
        self.current_col = 0
        self.current_row = 0
        self.solved = []
        self._orig_position = position[:]
        _position = iter(position[:])
        for i in range(0, 4):
            self.matrix.append([next(_position), next(_position),
                                next(_position), next(_position)])

    def copy(self):
        _puzzle = Puzzle(self._orig_position)
        _puzzle._moves = self._moves[:]
        _puzzle.matrix = deepcopy(self.matrix)
        _puzzle.move_count = self.move_count
        _puzzle.current_col = self.current_col
        _puzzle.current_row = self.current_row
        _puzzle.solved = self.solved
        return _puzzle

    def is_solved(self):
        for row, _ in enumerate(self.matrix):
            for col, _ in enumerate(self.matrix[row]):
                index = (row * 4) + (col + 1)
                # special case for the zero element
                if index == 16:
                    index = 0
                if self.matrix[row][col] != index:
                    return False

        return True
        
    def add_move(self, value):
        if value in self.solved:
            raise RuntimeError('Moving previously solved value %d' % value)
        
        self._moves.append(value)
        self.move_count += 1
        if self.move_count > 1000:
            raise RuntimeError('In infinite loop')

    def is_aligned(self, num):
        if hasattr(num, '__iter__'):
            return all([self.get_coords(n) == ALIGNMENTS[n] for n in num])
        
        return self.get_coords(num) == ALIGNMENTS[num]
    
    def get_coords(self, num):
        for row, _ in enumerate(self.matrix):
            for col, _ in enumerate(self.matrix[row]):
                if self.matrix[row][col] == num:
                    return (col, row)

        raise RuntimeError('Unable to find num %d in matrix %s'
                           % (num, self.matrix))

    def is_in_place(self, nums):
        _in_place = True
        if not hasattr(nums, '__iter__'):
            nums = [nums]
            
        for num in nums:
            if self.get_coords(num) != self.get_target_coords(num):
                _in_place = False
        
        return _in_place
        
    def get_value(self, coords):
        return self.matrix[coords[1]][coords[0]]

    def set_value(self, coords, value):
        self.matrix[coords[1]][coords[0]] = value

    def get_target_coords(self, num):
        for row, _ in enumerate(self.matrix):
            for col, _ in enumerate(self.matrix[row]):
                index_num = (4 * row) + col + 1
                if index_num == num:
                    return (col, row)

        raise RuntimeError('Cannot find index for %d' % num)
        
    def index(self, num):
        for row, _ in enumerate(self.matrix):
            for col, _ in enumerate(self.matrix[row]):
                if self.matrix[row][col] == num:
                    return (row * 4) + (col + 1)

        raise RuntimeError('Unable to find num %d in matrix %s'
                           % (num, self.matrix))
                    

def rotate_clockwise(shape, matrix, friends=[]):
    z_coords = matrix.get_coords(0)
    z_index = shape.index(z_coords)
    if z_index - 1 < 0:
        next_index = len(shape) - 1
    else:
        next_index = z_index - 1

    if shape[next_index] in friends:
        return False
    
    value = matrix.get_value(shape[next_index])
    matrix.add_move(value)
    matrix.set_value(shape[next_index], 0)
    matrix.set_value(shape[z_index], value)
    return True


def rotate_counter_clockwise(shape, matrix, friends=[]):
    z_coords = matrix.get_coords(0)
    z_index = shape.index(z_coords)
    if z_index + 1 > len(shape) - 1:
        next_index = 0
    else:
        next_index = z_index + 1

    if shape[next_index] in friends:
        return False

    value = matrix.get_value(shape[next_index])
    matrix.add_move(value)
    matrix.set_value(shape[next_index], 0)
    matrix.set_value(shape[z_index], value)
    return True


def get_next(puzzle):
    # this returns a list of 1 based indexes
    indexes = []
    # solve the column first
    if puzzle.current_col <= puzzle.current_row:
        for row in range(puzzle.current_row, 4):
            index = (puzzle.current_col + 1) + (4 * row)
            if index not in puzzle.solved:
                indexes.append(index)

        if len(indexes) == 0:
            puzzle.current_col += 1
            return get_next(puzzle)
    else:
        start = (puzzle.current_row * 4) + puzzle.current_col + 1
        remainder = 4 - puzzle.current_col
        for index in range(start, start + remainder):
            if index not in puzzle.solved:
                indexes.append(index)

        if len(indexes) == 0:
            puzzle.current_row += 1
            return get_next(puzzle)

    return indexes


def is_adjacent(point_a, point_b):
    if point_a[0] == point_b[0]:
        return abs(point_a[1] - point_b[1]) == 1

    if point_a[1] == point_b[1]:
        return abs(point_a[0] - point_b[0]) == 1

    return False


def get_shape(coords1, coords2, puzzle):

    if is_adjacent(coords1, coords2):
        return [coords1, coords2]

    # if not a proper rectangle, make it one
    if coords1[0] == coords2[0]:
        if coords1[0] == 3:
            new_col = coords1[0] - 1
        else:
            new_col = coords1[0] + 1

        coords2 = (new_col, coords2[1])
    elif coords1[1] == coords2[1]:
        if coords1[1] == 3:
            new_row = coords1[1] - 1
        else:
            new_row = coords1[1] + 1

        coords2 = (coords2[0], new_row)
        
    cols = [coords1[0], coords2[0]]
    cols.sort()
    rows = [coords1[1], coords2[1]]
    rows.sort()

    # add top row
    shape = []
    current_col = cols[0]
    while(current_col <= cols[1]):
        shape.append((current_col, rows[0]))
        current_col += 1

    current_col = cols[1]
    
    if len(rows) > 1:
        
        middle_rows = list(range(rows[0] + 1, rows[1]))
        for row in middle_rows:
            shape.append((current_col, row))

        # add last row, backwards!
        while(current_col >= cols[0]):
            shape.append((current_col, rows[1]))
            current_col -= 1

        current_col = cols[0]

        # add middle rows, backwards!
        middle_rows.reverse()
        for row in middle_rows:
            shape.append((current_col, row))

    return shape


def get_distance(point_a, point_b):
    return abs(point_a[0] - point_b[0]) + abs(point_a[1] - point_b[1])
        

def shape_find_closest(shape, targets, puzzle):
    distances = []
    z_coords = puzzle.get_coords(0)
    for point in shape:
        if point not in targets:
            distances.append((get_distance(point, z_coords), point))

    sorted_distances = sorted(distances, key=lambda d: d[0])
    return sorted_distances[0][1]
    

def find_rotation_direction(shape, point, friends, puzzle):
    # find direction to rotate to point without stepping on friends
    puzzle_copy = puzzle.copy()

    while puzzle_copy.get_coords(0) != point:
        success = rotate_clockwise(shape, puzzle_copy, friends=friends)
        if not success:
            break
        
        if puzzle_copy.get_coords(0) == point:
            return 'clockwise'

    puzzle_copy = puzzle.copy()
    while puzzle_copy.get_coords(0) != point:
        success = rotate_counter_clockwise(shape, puzzle_copy, friends=friends)
        if not success:
            break
        
        if puzzle_copy.get_coords(0) == point:
            return 'counter_clockwise'

    raise RuntimeError('Cannot rotate 0 to point %s with friends %s' %
                       (point, friends))


def move_to(point, friends, puzzle):

    # if already in place, nothing to do
    if puzzle.get_coords(0) == point:
        return
    
    shape = get_shape(puzzle.get_coords(0), point, puzzle)
    direction = find_rotation_direction(shape, point, friends, puzzle)
    if direction == 'clockwise':
        rotate_func = rotate_clockwise
    else:
        rotate_func = rotate_counter_clockwise
        
    while puzzle.get_coords(0) != point:
        rotate_func(shape, puzzle)


def in_the_pocket(puzzle):
    # If we are in the 2x2 pocket, just process one number at a time
    return puzzle.current_col >= 2 and puzzle.current_row >= 2
    
        
def solve(puzzle):
    nums = get_next(puzzle)
    if len(nums) > 2 or in_the_pocket(puzzle):
        nums = nums[0:1]
    elif not puzzle.is_in_place(nums):
        nums.reverse()
        align(nums, puzzle)

    if puzzle.is_in_place(nums):
        puzzle.solved.extend(nums)
        return

    biggest_num = nums[0]
    target = puzzle.get_target_coords(biggest_num)

    if len(nums) > 1:
        coords = puzzle.get_coords(nums[1])
    else:
        coords = puzzle.get_coords(biggest_num)
        
    target = puzzle.get_target_coords(biggest_num)
    shape = get_shape(coords, target, puzzle)

    # if 0 is not in the target shape, find a shape to move it there
    if puzzle.get_coords(0) not in shape:
        # use all the coords for this one
        all_coords = list(map(lambda n: puzzle.get_coords(n), nums))
        closest = shape_find_closest(shape, all_coords, puzzle)
        move_to(closest, [coords], puzzle)

    while not all([puzzle.is_in_place(n) for n in nums]):
        rotate_clockwise(shape, puzzle)
        
    puzzle.solved.extend(nums)


def _solution(position):
    puzzle = Puzzle(position)
    while not puzzle.is_solved():
        solve(puzzle)

    return puzzle


def solution(position):
    puzzle = _solution(position)

    return puzzle._moves

    
def align(nums, puzzle, friend=None):
    if hasattr(nums, '__iter__'):
        while not puzzle.is_aligned(nums):
            for num in nums:
                friend = align(num, puzzle, friend=friend)
                
        return
    else:
        num = nums

    shape = get_shape(puzzle.get_coords(num), ALIGNMENTS[num], puzzle)

    # move the zero to the closest hole in the shape
    closest = shape_find_closest(shape, [puzzle.get_coords(num)], puzzle)
    friends = [puzzle.get_coords(num)]
    if friend:
        friends.append(friend)
        
    move_to(closest, friends, puzzle)

    # rotate until we are in place
    # rotate once and then call align again, may have to recalibrate the shape
    if puzzle.get_coords(num) != ALIGNMENTS[num]:
        rotate_clockwise(shape, puzzle)
        align(num, puzzle)
        if puzzle.get_coords(num) == ALIGNMENTS[num]:
            return puzzle.get_coords(num)
    else:
        return ALIGNMENTS[num]


def test_align_simple():
    position = [1, 9, 3, 4,
                5, 11, 7, 8,
                0, 2, 14, 12,
                13, 6, 10, 15]
    puzzle = Puzzle(position)
    puzzle.solved = [1, 5]
    # expected_moves = [2, 14, 7, 3, 9, 11, 14, 7, 3, 9, 11, 14, 7, 3, 9]
    align([13, 9], puzzle)
    assert puzzle.is_aligned(13)
    assert puzzle.is_aligned(9)


def test_solve_with_align():
    position = [1, 9, 3, 4,
                5, 11, 7, 8,
                0, 2, 14, 12,
                13, 6, 10, 15]
    puzzle = Puzzle(position)
    puzzle.solved = [1, 5]
    # expected_moves = [2, 14, 7, 3, 9, 11, 14, 7, 3, 9, 11, 14, 7, 3, 9]
    solve(puzzle)
    assert puzzle.is_in_place(13)
    assert puzzle.is_in_place(9)

    solve(puzzle)
    assert puzzle.is_in_place(2)

    solve(puzzle)
    assert puzzle.is_in_place(3)
    assert puzzle.is_in_place(4)

    solve(puzzle)
    assert puzzle.is_in_place(6)

    solve(puzzle)
    assert puzzle.is_in_place(10)
    assert puzzle.is_in_place(14)

    solve(puzzle)
    assert puzzle.is_in_place(8)
    assert puzzle.is_in_place(7)

    solve(puzzle)
    assert puzzle.is_in_place(11)

    solve(puzzle)
    solve(puzzle)
    assert puzzle.is_in_place(12)
    assert puzzle.is_in_place(15)


def test_solution_simple_1():
    position = [1, 9, 3, 4,
                5, 11, 7, 8,
                0, 2, 14, 12,
                13, 6, 10, 15]
    puzzle = _solution(position)
    
    assert puzzle.get_coords(1) == (0, 0)
    assert puzzle.get_coords(0) == (3, 3)
    assert puzzle.is_solved()


def test_solution_simple_2():
    position = [1, 2, 3, 4,
                5, 6, 7, 8,
                13, 9, 11, 12,
                10, 14, 15, 0]

    puzzle = _solution(position)
    
    assert puzzle.get_coords(1) == (0, 0)
    assert puzzle.get_coords(0) == (3, 3)
    assert puzzle.is_solved()

    
def test_align_complex():
    position = [1, 2, 6, 4,
                5, 0, 10, 8,
                9, 11, 3, 12,
                13, 14, 7, 15]
    puzzle = Puzzle(position)
    puzzle.solved = [1, 5, 9, 13, 2]
    puzzle.current_col = 1
    # expected_moves = [10, 3]
    align([4, 3], puzzle)
    assert puzzle.is_aligned(3)
    assert puzzle.is_aligned(4)

    
def test_move_to():
    position = [2, 1, 3, 4, 9, 11, 7, 8, 6, 13, 14, 12, 5, 10, 15, 0]
    puzzle = Puzzle(position)
    shape = get_shape((1, 1), (2, 2), puzzle)
    friends = [(1, 2), (2, 2)]
    closest = shape_find_closest(shape, friends, puzzle)
    move_to(closest, friends, puzzle)
    assert closest == (2, 1)
    assert puzzle.get_coords(0) == (2, 1)
    assert puzzle.get_coords(14) == (2, 2)
    assert puzzle.get_coords(13) == (1, 2)
    assert puzzle._moves == [12, 8, 7]

    position = [2, 1, 3, 4, 9, 11, 7, 8, 6, 13, 14, 12, 5, 10, 15, 0]
    puzzle = Puzzle(position)
    point = puzzle.get_coords(1)
    target = puzzle.get_target_coords(1)
    shape = get_shape(point, target, puzzle)

    closest = shape_find_closest(shape, [point], puzzle)
    move_to(closest, [point], puzzle)
    assert closest == (0, 0)
    assert puzzle.get_coords(0) == (0, 0)
    assert puzzle._moves == [15, 10, 5, 6, 9, 2]
    

def test_find_rotation_direction():
    position = [2, 1, 3, 4, 9, 11, 7, 8, 6, 13, 14, 12, 5, 10, 15, 0]
    puzzle = Puzzle(position)
    shape = get_shape((2, 1), (3, 3), puzzle)
    friends = [(1, 2), (2, 2)]
    current_moves = puzzle._moves[:]
    direction = find_rotation_direction(shape, (2, 1), friends, puzzle)
    assert direction == 'clockwise'

    # assert the actual moves haven't been changed
    assert current_moves == puzzle._moves[:]

    direction = find_rotation_direction(shape, (2, 1), [(3, 2)], puzzle)
    assert direction == 'counter_clockwise'

    # assert the actual moves haven't been changed
    assert current_moves == puzzle._moves
    
    
def test_find_closest():
    position = [2, 1, 3, 4, 9, 11, 7, 8, 6, 13, 14, 12, 5, 10, 15, 0]
    puzzle = Puzzle(position)
    points = [(1, 0), (0, 0)]
    shape = get_shape(points[0], points[1], puzzle)
    closest = shape_find_closest(shape, [points[0]], puzzle)
    assert closest == (0, 0)

    shape = get_shape((1, 1), (2, 2), puzzle)
    pair = [(1, 2), (2, 2)]
    closest = shape_find_closest(shape, pair, puzzle)
    assert closest == (2, 1)

    shape = get_shape((1, 2), (2, 3), puzzle)
    pair = [(1, 2), (2, 2)]
    closest = shape_find_closest(shape, pair, puzzle)
    assert closest == (2, 3)
    
    position = [1, 11, 7, 8, 5, 3, 4, 12, 6, 13, 9, 0, 2, 10, 14, 15]
    shape = [(0, 2), (1, 2), (2, 2), (2, 3), (1, 3), (0, 3)]
    pair = [(1, 2), (2, 2)]
    closest = shape_find_closest(shape, pair, puzzle)
    assert closest == (2, 3)

    
def test_find_shape():
    # find smallest shape of only two cells, horizontal rectangle
    position = [2, 1, 3, 4, 9, 11, 7, 8, 6, 13, 14, 12, 5, 10, 15, 0]
    puzzle = Puzzle(position)
    expected = [(0, 0), (1, 0)]
    shape = get_shape((0, 0), (1, 0), puzzle)
    assert shape == expected

    # find smallest shape of only two cells, vertical rectangle
    expected = [(0, 0), (0, 1)]
    shape = get_shape((0, 0), (0, 1), puzzle)
    assert shape == expected

    # find a square
    expected = [(0, 0), (1, 0), (1, 1), (0, 1)]
    shape = get_shape((0, 0), (1, 1), puzzle)
    assert shape == expected

    expected = [(0, 0), (1, 0), (1, 1), (1, 2), (0, 2), (0, 1)]
    shape = get_shape((0, 0), (0, 2), puzzle)
    assert shape == expected

    expected = [(0, 2), (1, 2), (2, 2), (2, 3), (1, 3), (0, 3)]
    shape = get_shape((0, 2), (2, 3), puzzle)
    assert shape == expected

    # too narrow, have to turn into rectangle
    expected = [(0, 2), (1, 2), (2, 2), (2, 3), (1, 3), (0, 3)]
    shape = get_shape((0, 2), (2, 2), puzzle)
    assert shape == expected


def test_get_next():
    position = [2, 6, 3, 4, 9, 11, 7, 8, 1, 13, 14, 12, 5, 10, 15, 0]
    puzzle = Puzzle(position)
    nums = get_next(puzzle)
    assert nums == [1, 5, 9, 13]

    expected = [9, 13]
    input_w_column = [1, 2, 3, 4, 5, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    puzzle = Puzzle(input_w_column)
    puzzle.solved.append(1)
    puzzle.solved.append(5)
    
    actual = get_next(puzzle)
    assert actual == expected

    expected = [5, 9, 13]
    input_w_row = [1, 2, 3, 5, 4, 6, 7, 8, 13, 9, 11, 12, 10, 14, 15, 0]
    puzzle = Puzzle(input_w_row)
    puzzle.solved.append(1)
    
    actual = get_next(puzzle)
    assert actual == expected

    expected = [6, 10, 14]
    input_w_row = [1, 2, 3, 4, 5, 8, 7, 6, 9, 10, 11, 12, 13, 14, 15, 0]
    puzzle = Puzzle(input_w_row)
    puzzle.current_col = 1
    puzzle.current_row = 1
    
    actual = get_next(puzzle)
    assert actual == expected

    input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    puzzle.current_col = 1
    puzzle.current_row = 2
    expected = [10, 14]
    actual = get_next(puzzle)
    assert actual == expected

    input = [1, 2, 3, 5, 4, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    puzzle.current_col = 1
    expected = [2, 3, 4]
    actual = get_next(puzzle)
    assert actual == expected

    # if the column length is less than the row length, solve the column
    input = [1, 2, 3, 5, 4, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    puzzle.current_col = 2
    expected = [3, 4]
    actual = get_next(puzzle)
    assert actual == expected

    input = [1, 2, 3, 5, 4, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    puzzle.current_col = 1
    puzzle.current_row = 1
    expected = [6, 10, 14]
    actual = get_next(puzzle)
    assert actual == expected

    input = [1, 2, 3, 5, 4, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]
    puzzle = Puzzle(input)
    puzzle.current_col = 2
    puzzle.current_row = 1
    expected = [7, 8]
    actual = get_next(puzzle)
    assert actual == expected


def test_make_matrix():
    position = [1, 6, 4, 8, 3, 15, 5, 11, 9, 2, 10, 7, 13, 14, 0, 12]
    matrix = Puzzle(position)
    assert matrix.index(1) == 1
    assert matrix.index(11) == 8

    assert matrix.get_coords(1) == (0, 0)
    assert matrix.get_coords(12) == (3, 3)
    assert matrix.get_coords(10) == (2, 2)

    assert matrix.get_value((0, 0)) == 1
    assert matrix.get_value((3, 3)) == 12
    assert matrix.get_value((0, 3)) == 13
    assert matrix.get_value((3, 0)) == 8
    assert matrix.get_value((2, 2)) == 10
    

def test_rotate_counter_clockwise():
    position = [1, 6, 4, 8, 3, 15, 5, 11, 9, 2, 10, 7, 13, 14, 0, 12]
    puzzle = Puzzle(position)
    shape = get_shape(puzzle.get_coords(0), puzzle.get_coords(7), puzzle)
    rotate_counter_clockwise(shape, puzzle)
    
    assert puzzle.get_coords(0) == (2, 2)
    assert puzzle.get_coords(10) == (2, 3)
    assert puzzle.get_coords(7) == (3, 2)
    assert puzzle.get_coords(12) == (3, 3)

    rotate_counter_clockwise(shape, puzzle)
    assert puzzle.get_coords(0) == (3, 2)
    assert puzzle.get_coords(7) == (2, 2)


def test_rotate_clockwise():
    position = [1, 6, 4, 8, 3, 15, 5, 11, 9, 2, 10, 7, 13, 14, 0, 12]
    puzzle = Puzzle(position)
    shape = get_shape(puzzle.get_coords(0), puzzle.get_coords(7), puzzle)
    rotate_clockwise(shape, puzzle)
    
    assert puzzle.get_coords(0) == (3, 3)
    assert puzzle.get_coords(12) == (2, 3)
    assert puzzle.get_coords(10) == (2, 2)
    assert puzzle.get_coords(7) == (3, 2)

    rotate_clockwise(shape, puzzle)
    assert puzzle.get_coords(0) == (3, 2)
    assert puzzle.get_coords(7) == (3, 3)

    rotate_clockwise(shape, puzzle)
    assert puzzle.get_coords(0) == (2, 2)
    assert puzzle.get_coords(10) == (3, 2)

    rotate_clockwise(shape, puzzle)
    assert puzzle.get_coords(0) == (2, 3)
    assert puzzle.get_coords(12) == (2, 2)
