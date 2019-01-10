def extended_gcd(a, b):
    assert a >= b and b >= 0 and a + b > 0, 'Failed when a is %s and b is %s' % (a, b)

    if b == 0:
        d, x, y = a, 1, 0
    else:
        (d, p, q) = extended_gcd(b, a % b)
        x = q
        y = p - q * (a // b)

    assert a % d == 0 and b % d == 0
    assert d == a * x + b * y

    return (d, x, y)


def lcm(a, b):
    assert a > 0 and b > 0
    if a < b:
        tmp = a
        a = b
        b = tmp

    (gcd, _, _) = extended_gcd(a, b)
    
    return a * b / gcd


def squares(n, m):
    if n > m:
        (d, _, _) = extended_gcd(n, m)
    else:
        (d, _, _) = extended_gcd(m, n)
        
    total_squares = n * m
    return total_squares / (d * d)


# print(squares(10, 6))
# print(squares(12, 4))

print(lcm(8, 10))
print(lcm(10, 8))

print(lcm(2, 3))
print(lcm(3, 2))
print(lcm(3, 3))
print(extended_gcd(391, 299))
print(extended_gcd(1, 1))

