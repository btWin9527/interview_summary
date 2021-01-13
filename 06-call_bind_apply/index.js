/* 涉及题目：call、apply、bind函数内部实现 */

/*
* call实现
* · 首先 context 为可选参数，如果不传的话默认上下文为 window
* · 接下来给 context 创建一个 fn 属性，并将值设置为需要调用的函数
* · 因为 call 可以传入多个参数作为调用函数的参数，所以需要将参数剥离出来
* · 然后调用函数并将对象上的函数删除
* */
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  /*
  * · 不传入第一个参数，则上下文默认为window
  * · 改变了this指向，让新对象可以执行该函数，并能接受参数
  * */
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

function callTest(para) {
  console.log(para, 'para')
}

callTest.myCall(this, 'test')

/*
* apply实现
*
* */
Function.prototype.myApply = function (context) {
  if (typeof context !== 'function') {
    throw new TypeError('Error');
  }
  context = context || window;
  context.fn = this;
  let result;
  // 处理参数和call区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn();
  }
  delete context.fn
  return result;
}

/*
* bind实现
* · bind 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式，我们先来说直接调用的方式
* · 对于直接调用来说，这里选择了 apply 的方式实现，但是对于参数需要注意以下情况：因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来，于是就有了这样的实现 args.concat(...arguments)
* · 最后来说通过 new 的方式，在之前的章节中我们学习过如何判断 this，对于 new 的情况来说，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this
* */
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this;
  const args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因返回一个函数，可以new F(),需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
/*
* 涉及题目： new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？
* 调用new执行操作:
* 1. 新生成了一个对象
* 2. 链接到原型
* 3. 绑定this
* 4. 返回新对象
* */

/*
* new 实现
* 1. 创建一个空对象
* 2. 获取构造函数
* 3. 设置空对象的原型
* 4. 绑定this并指向构造函数
* 5. 确保返回值为对象
* */
function create() {
  let obj = {};
  let Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}

/*
* 涉及题目：instanceof 的原理是什么?
* instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype
*  */

/*
* instanceof实现
* · 首先获取类型的原型
* · 然后获得对象的原型
* · 然后一直循环判断对象的原型是否等于类型的原型，知道对象原型为null,因为原型链最终为null
* */
function myInstanceof(left, right) {
  let prototype = right.prototype;
  left = left.__proto__;
  while (true) {
    if (left === null || left === undefined) return false;
    if (prototype === left) return true;
    left = left.__proto__;
  }
}

/*
* 涉及题目：为什么 0.1 + 0.2 != 0.3？如何解决这个问题？
* JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题
* (0011) 表示循环
0.1 = 2^-4 * 1.10011(0011)
* */
/*
* IEEE 754 双精度版本（64位）将 64 位分为了三段
* · 第一位用来表示符号
* · 接下去的 11 位用来表示指数
* · 其他的位数用来表示有效位，也就是用二进制表示 0.1 中的 10011(0011)
* */
console.log(0.100000000000000002 === 0.1) // true

// 解决0.1 + 0.2 !== 0.3
console.log(parseFloat((0.1 + 0.2).toFixed(10)) === 0.3) // true

/*
* 垃圾回收机制
* V8 实现了准确式 GC，GC 算法采用了分代式垃圾回收机制。因此，V8 将内存（堆）分为新生代和老生代两部分
*  */

