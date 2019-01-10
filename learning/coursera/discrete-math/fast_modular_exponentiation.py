import math


def calculate(b, pow, m, cache):
    if pow == 0:
        cache[pow] = b % m
    else:
        cache[pow] = (cache[pow - 1] * cache[pow - 1]) % m

    return cache[pow]


def FastModularExponentiation(b, e, m):
    binrep = list(bin(e)[2:])
    binrep.reverse()
    vals = []
    total = 1
    cache = {}
    for i, _ in enumerate(binrep):
        num = calculate(b, i, m, cache)
        if binrep[i] == '1':
            if num != 0:
                vals.append(num)
                total = total * num
                # total = total * num
    return int(total) % m

    
def test_fast():
    assert FastModularExponentiation(7, 2, 11) == 5
    assert FastModularExponentiation(7, 8, 11) == 9
    assert FastModularExponentiation(5, 8, 11) == 4
    assert FastModularExponentiation(1, 4, 11) == 1
    assert FastModularExponentiation(1, 5, 11) == 1
    assert FastModularExponentiation(2, 4, 11) == 5
    assert FastModularExponentiation(2, 7, 11) == 7
    assert FastModularExponentiation(9, 2, 7) == 4
    assert FastModularExponentiation(9, 3, 7) == 1
    assert FastModularExponentiation(9, 11, 7) == 4
    assert FastModularExponentiation(9, 14, 7) == 4
    assert FastModularExponentiation(3, 6, 7) == 1
    assert FastModularExponentiation(7, 13, 11) == 2
    assert FastModularExponentiation(7, 32, 11) == 6
    assert FastModularExponentiation(7, 128, 11) == 7
    assert FastModularExponentiation(7, 256, 13) == 5
    assert FastModularExponentiation(2, 238, 239) == 1
    assert FastModularExponentiation(2, 953, 239) == 2
    assert FastModularExponentiation(9, 127, 7) == 3
