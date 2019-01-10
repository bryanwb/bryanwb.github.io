
def Encrypt(message, modulo, exponent):
  # Fix this implementation
  message_int = ConvertToInt(message)
  return PowMod(message_int, exponent, modulo)
  

def Decrypt(ciphertext, p, q, exponent):
  d = InvertModulo(exponent, (p - 1) * (q - 1))
  plaintext_int = PowMod(ciphertext, d, p * q)
  return ConvertToStr(plaintext_int)


def DecipherSimple(ciphertext, modulo, exponent, potential_messages):
  # Fix this implementation
  messages = {}
  for m in potential_messages:
    messages[Encrypt(m, modulo, exponent)] = m
    
  return messages[ciphertext]


def DecipherSmallPrime(ciphertext, modulo, exponent):
  small_prime = None
  for i in range(2, 1000000):
    if modulo % i == 0:
      small_prime = i
      break
    
  if small_prime:
    big_prime = modulo // small_prime
    return Decrypt(ciphertext, small_prime, big_prime, exponent)
    
  return "don't know"


def DecipherSmallDiff(ciphertext, modulo, exponent):
  middle = IntSqrt(modulo)
  small_prime = middle - 5000
  while small_prime < middle:
    if modulo % small_prime == 0:
      break
    
    small_prime += 1
    
  big_prime = modulo // small_prime
  return Decrypt(ciphertext, small_prime, big_prime, exponent)


def GCD(a, b):
  if b == 0:
    return a
  return GCD(b, a % b)
  
def DecipherCommonDivisor(first_ciphertext, first_modulo, first_exponent, second_ciphertext, second_modulo, second_exponent):
  # Fix this implementation to correctly decipher both messages in case
  # first_modulo and second_modulo share a prime factor, and return
  # a pair (first_message, second_message). The implementation below won't work
  # if the common_prime is bigger than 1000000.
  common_prime = GCD(first_modulo, second_modulo)
  q1 = first_modulo // common_prime
  q2 = second_modulo // common_prime
  
  return (Decrypt(first_ciphertext, common_prime, q1, first_exponent), Decrypt(second_ciphertext, common_prime, q2, second_exponent))
  return ("unknown message 1", "unknown message 2")


def DecipherHastad(first_ciphertext, first_modulo, second_ciphertext, second_modulo):
  # Fix this implementation
  r = ChineseRemainderTheorem(first_modulo, first_ciphertext, second_modulo, second_ciphertext)
  
  return ConvertToStr(IntSqrt(r))
  

def test_decrypt():  
    a = 3
    b = 7
    c = InvertModulo(a, b)
    print(c)

    p = 1000000007
    q = 1000000009
    exponent = 23917
    modulo = p * q
    ciphertext = Encrypt("attack", modulo, exponent)
    message = Decrypt(ciphertext, p, q, exponent)
    print(message)
