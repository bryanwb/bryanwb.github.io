#include <stdio.h>
    
struct a_struct {
  char char_one;
  char char_two;
  int int_one;
};
 
int main(void)
{
    
  struct a_struct s;
 
  printf("%p : s.char_one\n"   \
         "%p : s.char_two\n"                    \
         "%p : s.int_one\n", &s.char_one,
         &s.char_two, &s.int_one);
   
  return 0;
    
} 
