solutions = []

def can_be_extended_to_solution(perm):
    i = len(perm) - 1
    for j in range(i):
        if i - j == abs(perm[i] - perm[j]):
            return False

    return True


def extend(perm, n):
    if len(perm) == n:
        print(perm)
        solutions.append(list(perm))
        return True

    for k in range(n):
        if k not in perm:
            perm.append(k)

            if can_be_extended_to_solution(perm):
                extend(perm, n)

            perm.pop()


extend(perm=[], n=8)
print "num of solutions is %d" % len(solutions)
