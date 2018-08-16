#include <stdio.h>

struct _ship {
  int type;
  int x;
  int y;
  int missiles;
};

struct _foo {
  int type;
};

typedef struct _ship ship;
typedef struct _foo foo;

int main() {
  ship battle_ship_1;
  ship battle_ship_2 = { 1, 60, 66, 8};

  foo foo1 = {9};

  battle_ship_1.type = 63;
  battle_ship_1.x = 54;
  battle_ship_1.y = 98;
  battle_ship_1.missiles = 12;

  return 0;
}
