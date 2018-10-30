#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>


int main(int argc, char* argv[]) {
  if (fork() == 0) {
    execl("copy.o", "copy.o", argv[1], argv[2], (char *) 0);
  } else {
    wait((int *) 0);
    printf("copy done\n");
  }
  return 0;
}
