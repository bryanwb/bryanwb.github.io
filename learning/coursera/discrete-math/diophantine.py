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


def test_diophantine():
    assert diophantine(391, 299, -69) == (9, -12)
    assert diophantine(5, 3, 22) == (-22, 44)
    assert diophantine(1, 1, 7) == (0, 7)
    assert diophantine(3, 6, 18) == (6, 0)
    assert diophantine(15, 35, 20) == (-8, 4)
