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


def xgcd(a, b):
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

    return (p, q)



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


def ChineseRemainderTheorem(n1, r1, n2, r2):
    (x, y) = xgcd(n1, n2)
    (x1, y1) = diophantine(n1, n2, 1)

    res = ((r1 * n2 * int(y1)) + (r2 * n1 * int(x1)))
    return res % (n1 * n2)



def test_chinese():
    res = ChineseRemainderTheorem(686579304, 295310485, 26855093, 8217207)
    assert res % 686579304 == 295310485
