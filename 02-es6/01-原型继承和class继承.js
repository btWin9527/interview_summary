/* 涉及题目： 原型继承和class继承 */

// 组合继承

/*function Parent(value) {
  this.val = value;
}

Parent.prototype.getValue = function () {
  console.log(this.val, 'val')
}

function Child(value) {
  Parent.call(this, value);
}

Child.prototype = new Parent();
const child = new Child(1);
child.getValue();
console.log(child instanceof Parent, '继承');*/

// 寄生组合继承

/*function Parent(value) {
  this.val = value;
}

Parent.prototype.getValue = function () {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue(); // 1
console.log(child instanceof Parent)// true*/

// class继承
class Parent {
  constructor(value) {
    this.val = value
  }

  getValue() {
    console.log(this.val)
  }
}

class Child extends Parent {
  constructor(value) {
    super(value);
  }
}

let child = new Child(1);
child.getValue(); // 1
console.log(child instanceof Parent); // true
