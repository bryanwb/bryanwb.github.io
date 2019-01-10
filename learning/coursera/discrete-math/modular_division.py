def gcd(a, b):
    assert a >= 0 and b >= 0 and a + b > 0

    while a > 0 and b > 0:
        if a >= b:
            a = a % b
        else:
            b = b % a
            
    return max(a, b)

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


def diophantine(a, b, c):
    if a < b:
        tmp = a
        a = b
        b = tmp
        (gcd, p, q) = extended_gcd(a, b)
        tmp = p
        p = q
        q = tmp
    else:
        (gcd, p, q) = extended_gcd(a, b)

    assert c % gcd == 0
    t = c / gcd
    return (p * t, q * t)


def divide(a, b, n):
    assert n > 1 and a > 0 and gcd(a, n) == 1
    (_, x0) = diophantine(n, a, 1)
    if x0 < 0:
        x0 = x0 % n

    # return the number x s.t. x = b / a (mod n) and 0 <= x <= n-1.
    return (x0 * b) % n


def test_divide():
    assert divide(7, 2, 9) == 8
