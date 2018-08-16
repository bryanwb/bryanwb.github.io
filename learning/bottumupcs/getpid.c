#include <stdio.h>
    
/* for syscall() */
#include <sys/syscall.h>
#include <unistd.h>
    
/* system call numbers */
#include <asm/unistd.h>

int main(void)
{
  int pid;
    
  pid = syscall(__NR_getpid);
  printf("pid is %d", pid);
}

