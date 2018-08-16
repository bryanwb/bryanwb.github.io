/*
* types.c
*/
#include <stdio.h>
#include <stdint.h>

int main(void)
{
  char a;
  char *p = "hello";
  int i;
  // moving a larger variable into a smaller one i = 0x12341234;
  i = 0x12341234;
  a = i;
  i = a;
  printf("i is %d\n", i);
  
  
  // moving a pointer into an integer
  printf("p is %p\n", p);
  i = p;

  i = (int)p;
  p = (char*)i;

  printf("int max is %d\n", INT32_MAX);
  return 0;
}
  
