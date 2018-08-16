#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  pid_t pid;
    
  printf("parent : %d\n", getpid());
    
  pid = fork();
    
  if (pid == 0) {
    printf("child : %d\n", getpid());
    sleep(2);
    printf("child exit\n");
    exit(1);
  }
  /* in parent */
  while (1)
    {
      sleep(1);
    }
}
