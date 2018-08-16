#include <stdio.h>
#include <stdlib.h>

int main(){
  int *my_ptr;

  my_ptr = malloc(sizeof(int));
  *my_ptr = 8;

  printf("my_ptr is %d\n", *my_ptr);
  printf("*my_ptr is %p\n", my_ptr);
  free(my_ptr);
  printf("my_ptr after free is %p\n", my_ptr);
  

}
