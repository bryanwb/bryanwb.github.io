// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.
// Put your code here.


// compute last word in screen to write to
   // @COMPUTELASTPIXEL
   // 0;JMP

// initialize variables
(INIT)
   @color
   M=0

   @SCREEN
   D=A

(LOOP)
   @KBD
   D=M

   @WHITE
   D;JNE

   @BLACK
   D;JEQ

   
(WHITE)
   @color
   M=-1

   @REDRAW
   0;JMP

(BLACK)
   @color
   M=0

   @REDRAW
   0;JMP

(KBDCHANGE)
   @color
   D=M

   @KBDCHANGENOPRESS
   D;JNE

   @KBDCHANGEPRESSED
   D;JMP

(KBDCHANGENOPRESS)
   @KBD
   D=M

   @LOOP
   D;JEQ

   @AFTERKBDCHECK
   0;JMP


(KBDCHANGEPRESSED)
   @KBD
   D=M

   @LOOP
   D;JNE

   @AFTERKBDCHECK
   0;JMP


(REDRAW)
   @SCREEN
   D=A

   @currentword
   M=D

(DRAW)

   // check if any keyboard change
   @KBDCHANGE
   0;JMP
   
(AFTERKBDCHECK)

   @KBD
   D=A

   @currentword
   D=D-M

   @LOOP
   D;JLE

   @color
   D=M

   @currentword
   A=M
   M=D

   @currentword
   M=M+1

   @DRAW
   0;JMP

