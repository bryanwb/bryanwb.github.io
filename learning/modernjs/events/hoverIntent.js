'use strict';


function calculateDistance(x, y) {
  return Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
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
    // this.checkHover = this.checkHover.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.trackSpeed = this.trackSpeed.bind(this);
    this.resetMovement = this.resetMovement.bind(this);

    // assign the handlers
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mousemove", this.onMouseMove); 
    elem.addEventListener("mouseout", this.onMouseOut);
    this.textarea = document.getElementById('log');
    this.log = this.log.bind(this);
  }

  trackSpeed(event) {
    if (!this.movement.isOverElement) {
      return;
    }
    
    let timeStamp = Date.now();
    let diff = timeStamp - this.movement.prevTime;
    this.movement.time = this.movement.time + diff;

    if (this.movement.lastX === null) {
      this.movement.lastX = event.clientX;
      this.movement.lastY = event.clientY;
      return;
    }
      
    let x = this.movement.lastX ? event.clientX - this.movement.lastX : 0;
    let y = this.movement.lastY ? event.clientY - this.movement.lastY : 0;

    let distance = calculateDistance(Math.abs(x), Math.abs(y));

    this.movement.distance = this.movement.distance + distance;
    let speed = this.movement.distance / this.movement.time;

    this.movement.lastX = event.clientX;
    this.movement.lastY = event.clientY;
    
    this.movement.prevTime = timeStamp;

    if (speed < this.sensitivity) {
      this.log(`speed is ${speed} distance is ${this.movement.distance} and time is ${this.movement.time}`);
      this.over();
      this.resetMovement();
      this.movement.isOverElement = true;
    } else {
      this.log(`speed is ${speed} distance is ${this.movement.distance} time is ${this.movement.time}`);
    }
  }
  
  log(msg) {
    this.textarea.value = this.textarea.value + msg + '\n';
    this.textarea.scrollTop = this.textarea.scrollHeight;
  }

  resetMovement() {
    this.movement = {
      isOverElement: false,
      lastX: null,
      lastY: null,
      distance: 0,
      prevTime: null,
      isOverElement: false,
      time: 0,
      timer: null,
    };
  }
  
  onMouseOver(event) {
    this.movement.prevTime = Date.now();
    this.movement.isOverElement = true;
    this.movement.timer = setInterval(() => {
      this.movement.lastX = event.clientX;
      this.movement.lastY = event.clientY;
      this.trackSpeed(event);
    }, 100);
  }

  onMouseMove(event) {
    this.trackSpeed(event);
  }

  onMouseOut(event) {
    // this.log(`Mouse out clientX: ${event.clientX}, clientY: ${event.clientY}, relatedTarget: ${event.relatedTarget.className}`);
    if (!event.relatedTarget || !this.elem.contains(event.relatedTarget)) {
      this.resetMovement();
      this.out();
    }
  }

  destroy() {
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
    this.resetMovement();
    /* your code to "disable" the functionality, remove all handlers */
  };

}
