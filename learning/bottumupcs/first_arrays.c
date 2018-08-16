#include <stdio.h>

int main(){
  int person[10];
  float hourly_wages[4] = {2, 4.9, 10, 123.456};
  int index;

  index = 4;
  person[index] = 56;

  printf("the %dth person is number %d and earns $%f an hour\n",
         (index + 1), person[index], hourly_wages[index - 1]);
  return 0;

}
