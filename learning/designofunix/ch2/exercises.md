# Chapter 2 exercises

#. The 3 commands are executed asynchronously such that the file `grepout` may be removed while the first two commands are still executing. The second
command executes directly on the output from the first command.
#. Using Figure 2.7 for the exercise since the actual example does not have a comment
  #. The process remove the structure bp from the linkedlist:
     `bp1` will have a valid forward pointer and its next element will have a valid back pointer to `bp1`. There is a risk that while 
     interrupted the next item may try to access `bp`
  #. The process removes structure bp1 from the linked list:
     `bp` will have an invalid forward pointer. Its next item will still have a valid back pointer
  #. The process removes the structure that follows bp1 from the list. Let's call it `bp2`
     `bp1` will have an invalid forward reference
#. No processes will be awoken as the list of processes sleeping on the event has length of zero
    
