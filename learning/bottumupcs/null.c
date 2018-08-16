#include <stdio.h>
#include <stddef.h>

int main() {
  FILE *fp;
  fp = fopen("file.txt", "r");
  if (fp != NULL) {
    printf("opened file file.txt successfully\n");
    fclose(fp);
  }
  printf("NULL is %p\n", NULL);
  fp = fopen("nofile.txt", "r");
  if (fp == NULL) {
    printf("Could not open file nofile.txt\n");
  }

  return 0;
}
