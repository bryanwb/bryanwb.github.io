const alert = console.log;

function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

//Object.setPrototypeOf(Rabbit, Animal);
Rabbit.__proto__ = Animal;

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};

let rabbit = new Rabbit('Peter');
rabbit.walk();

let walrus = new Animal('Walter');
walrus.walk();
