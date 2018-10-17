'use strict';

function doDrag(event, elem) {

  let rect = elem.getBoundingClientRect();
  let shiftX = event.clientX - rect.left;
  let shiftY = event.clientY - rect.top;

  elem.style.position = 'absolute';
  elem.style.zIndex = 1000;
  
  let maxX = document.documentElement.clientWidth - rect.width;
    
  document.body.append(elem);
  
  elem.style.position = 'absolute';

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    let offsetX = pageX - shiftX;
    offsetX = offsetX < 0 ? 0 : offsetX;
    offsetX = offsetX > maxX ? maxX : offsetX;
    elem.style.left = offsetX + 'px';
    elem.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(evt) {
    moveAt(evt.pageX, evt.pageY);
    elem.scrollIntoViewIfNeeded();
  }
  
  document.addEventListener('mousemove', onMouseMove);
                            
  elem.ondragstart = function() {
    return false;
  }

  
  elem.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    elem.onmouseup = null;
  };

}

document.addEventListener('mousedown', function(event) {

  let elem = document.elementFromPoint(event.clientX, event.clientY);
  if (elem.classList.contains('draggable')) {
    doDrag(event, elem);
  } else {
    console.log('no draggable elem here');
  }



});

