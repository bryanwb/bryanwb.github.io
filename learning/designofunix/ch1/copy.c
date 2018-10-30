#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void copyBwb(int old, int new);

char buffer[2048];

int version = 1;

int main(int argc, char *argv[]) {

  int fdold, fdnew;

  if (argc != 3){
    printf("Need : arguments for copy program\n");
    exit(1);
  }

  fdold = open(argv[1], O_RDONLY);
  if (fdold == -1) {
    printf("Cannot open file %s\n", argv[1]);
  }

  fdnew = creat(argv[2], 0666);
  if (fdnew == -1) {
    printf("Cannot create file %s\n", argv[2]);
    exit(1);
  }

  copyBwb(fdold, fdnew);
  
  int closeFd;
  closeFd = close(fdold);
  if (closeFd == -1) {
    printf("Cannot close file %s\n", argv[1]);
    exit(1);
  }

  closeFd = close(fdnew);
  if (closeFd == -1) {
    printf("Cannot close file %s\n", argv[2]);
    exit(1);
  }

  exit(0);
}

void copyBwb(int old, int new) {
  int count = 0;

  while((count = read(old, buffer, sizeof(buffer))) > 0) {
    write(new, buffer, count);
  }
}
