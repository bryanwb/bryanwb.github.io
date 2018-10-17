'use strict';

function hasAncestor(elem, ancestor) {
  if (elem === null) { return false; }
  if (elem === ancestor) { return true; }
  
  let parentElem = null;

  do {
    parentElem = elem.parentElement;
    if (parentElem === ancestor) { return true; }
    if (parentElem === window.document.documentElement) { return false; }
  } while (parentElem && parentElem !== window.document.documentElement);
  return false;
}

function calculateDistance(x, y) {
  //return Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
}

// Here's a brief sketch of the class
// with things that you'll need anyway
class HoverIntent {

  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    // this.resetMovement();
    
    this.elem = elem;
    this.over = over;
    this.out = out;
    this.resetMovement();

    // make sure "this" is the object in event handlers.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.resetMovement = this.resetMovement.bind(this);
    /* this.showIfHovering = this.showIfHovering.bind(this);
     * this.checkHover = this.checkHover.bind(this);

     * this.resetMovement = this.resetMovement.bind(this);
     *  */

    // assign the handlers
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mousemove", this.onMouseMove); 
    elem.addEventListener("mouseout", this.onMouseOut);
    this.textarea = document.getElementById('log');
    this.log = this.log.bind(this);
  }

  log(msg) {
    this.textarea.value = this.textarea.value + msg + '\n';
    this.textarea.scrollTop = this.textarea.scrollHeight;
  }

  resetMovement() {
    this.movement = {
      isMoving: false,
      lastX: null,
      lastY: null,
      distance: 0,
      lastTimeStamp: null,
      start: null,
      executed: false,
      time: 0,
      timer: null,
    };
  }
  
  onMouseOver(event) {
    // this.log(`Mouse over clientX: ${event.clientX}, clientY: ${event.clientY} timeStamp ${event.timeStamp}`);
    this.movement.lastX = event.clientX;
    this.movement.lastY = event.clientY;
    this.movement.lastTimeStamp = event.timeStamp;
    this.movement.start = event.timeStamp;
    this.movement.isMoving = true;

    let savedThis = this;
    this.movement.timer = setInterval(() => {
      savedThis.movement.lastTimeStamp = savedThis.movement.lastTimeStamp + 100;
      let diff = savedThis.movement.lastTimeStamp - savedThis.movement.start;
      savedThis.checkHover(savedThis.movement.distance, diff);
    }, this.interval);
    
    //this.over();
    /* this._isOver = true;
     * this.movement.isMoving = true;
     * this.movement.start = event.timeStamp;
     * this.movement.startX = event.clientX;
     * this.movement.startY = event.clientY;
     * 
     * this.movement.lastMeasure = event.timeStamp; */
    //this.setPauseInterval();
  }

  resetMovement() {
    if (this.movement && this.movement.timer) {
      clearInterval(this.movement.timer);
    }
    
    this.movement = {
      isMoving: false,
      start: null,
      lastTimeStamp: null,
      timer: null,
      startX: 0,
      startY: 0,
      paused: null,
      distance: 0,
      executed: false,
    }
  }
  
  onMouseOut(event) {
    // this.log(`Mouse out clientX: ${event.clientX}, clientY: ${event.clientY}, relatedTarget: ${event.relatedTarget.className}`);
    let isDescendant = hasAncestor(event.relatedTarget, this.elem);
    if (!isDescendant) {
      this.resetMovement();
      this.out();
    }
  }

  /* checkHover() {
   *   this.movement.lastMeasure = this.movement.lastMeasure + 100;
   *   let time = this.movement.lastMeasure - this.movement.start;
   *   debugger;
   *   this.showIfHovering(this.movement.distance, time)
   * }
   * 
   * setPauseInterval() {
   *   this.movement.paused = setTimeout(this.checkHover, 100)
   * }

   * showIfHovering(distance, time) {
   *   let speed = distance / time;
   *   if (speed < 0.1 && !this.movement.executed) {
   *     this.over();
   *     this.movement.executed = true;
   *     if (this.movement.paused) {
   *       clearTimeout(this.movement.paused);
   *       this.movement.paused = null;
   *     }
   *   } else if (this.movement.paused === null) {
   *     this.setPauseInterval();
   *   }
   * } */

  checkHover(distance, time) {
    let speed = distance / Number(time).toPrecision(3);

    if (speed < this.sensitivity) {
      this.over();
      this.movement.executed = true;
      if (this.movement.timer) {
        clearInterval(this.movement.timer);
        this.movement.timer = null;
      }
      return true;
    }
    this.log(`skipping tooltip, moving too fast with speed of ${speed}`);
    return false;
  }
  
  onMouseMove(event) {
    //this.log(`Mouse move clientX: ${event.clientX}, clientY: ${event.clientY}  timeStamp ${event.timeStamp}`);

    // the mousemove matches the mouseover, skip it

    if (this.movement.start === event.timeStamp) {
      return;
    }

    if (event.timeStamp - this.movement.start < 100) {
      if (this.movement.timer) {
        clearInterval(this.movement.timer);
        this.movement.timer = null;
      }

      return;
    }

    if (this.movement.executed) {
      return ;
    }

    if (!this.movement.isMoving) {
      return;
    }

    if (this.movement.timer) {
      clearInterval(this.movement.timer);
      this.movement.timer = null;
    }
    
    let distance = Math.abs(event.clientX - this.movement.lastX) + Math.abs(this.movement.lastY - event.clientY);
    let totalTime = event.timeStamp - this.movement.start;
    
    this.movement.distance = this.movement.distance + distance;
    this.movement.lastX = event.clientX;
    this.movement.lastY = event.clientY;

    this.log(`distance is ${this.movement.distance}`);

    this.checkHover(this.movement.distance, totalTime);
    /* let speed = this.movement.distance / Number(totalTime).toPrecision(3);

     * if (speed < this.sensitivity) {
     *   this.over();
     *   this.movement.executed = true;
     * } else {
     *   this.log(`skipping tooltip, moving to fast with speed of ${speed}`);
     * } */
    /* if (!this.movement.isMoving) { return ; }

     * let distance = calculateDistance(this.movement.startX - Math.abs(event.clientX), this.movement.startY - event.clientY);
     * this.movement.distance = this.movement.distance + distance;
     * 
     * if (event.timeStamp - this.movement.lastMeasure < 100) {
     *   return ;
     * }

     * this.movement.lastMeasure = event.timeStamp;

     * let totalTime = event.timeStamp - this.movement.start;
     * this.showIfHovering(distance, totalTime); */
  }


  destroy() {
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
    /* your code to "disable" the functionality, remove all handlers */
  };

}
