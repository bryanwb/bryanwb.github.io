# Chapter 2 exercises

#. The 3 commands are executed asynchronously such that the file `grepout` may be removed while the first two commands are still executing. The second
command executes directly on the output from the first command.
#. 
  #. all items have correct pointers
  #. all items have correct pointers
  #. `bp1` will be in accessible. The list will be in an invalid state. The next element will point to bp
     not bp1. bp will point not to bp1 but the next element after the element
     after bp1.
  
  
  #. The process removes the structure that follows bp1 from the list. Let's call it `bp2`
     `bp1` will have an invalid forward reference
#. No processes will be awoken as the list of processes sleeping on the event has length of zero
    
