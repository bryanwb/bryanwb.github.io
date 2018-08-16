#include <stdio.h>

int swap_ints(int *first_number, int *second_number);

int main(){
  int a = 4, b = 7;

  printf("pre-swap values are: a == %d, b == %d\n", a, b);
  swap_ints(&a, &b);

  printf("post-swap values are: a == %d, b == %d\n", a, b);
  return 0;
}

int swap_ints(int *first_number, int *second_number) {
  int temp;
  printf("*first_number is %d\n", *first_number);
  printf("first_number is %p\n", first_number);  
  temp = *first_number;
  *first_number = *second_number;
  *second_number = temp;
  return 0;
}
