#include <stdio.h>
#include <unistd.h>
#include <signal.h>
#include <stdlib.h>
 

void sigint_handler(int signum)
{
  printf("got SIGINT and my pid is %d\n", getpid());
  exit(1);
}
    
int main(void)
{
  signal(SIGINT, sigint_handler);

  pid_t pid;
  pid = fork();
    
  if (pid == 0) {
    printf("child : %d\n", getpid());
    while (1)
      sleep(1);    
  } else {
    sleep(1);
    printf("i am parent%d, killing child %d", getpid(), pid);
    kill(pid, SIGKILL);
  }
}
