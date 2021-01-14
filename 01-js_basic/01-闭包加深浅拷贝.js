/* 1. 闭包 */
// 概念： 函数A内部有一个函数B， 函数B可以访问到函数A中的变量，那么函数B就是闭包。
// 例子
function A() {
  let a = 1;
  B = function () {
    console.log(a)
  }
}

A();
B(); // 1

// 解决i打印相同问题
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i, 'i')
  }, i * 1000)
}

// 解决方法1 (闭包)
for (var j = 1; j <= 5; j++) {
  ;(function (j) {
    setTimeout(function timer() {
      console.log(j, 'j')
    }, j * 1000)
  })(j);
}

// 解决方法2 (setTimeout第三个参数)
for (var k = 1; k <= 5; k++) {
  setTimeout(function (k) {
    console.log(k, 'k')
  }, k * 1000, k)
}
// 解决方法3 (let定义i解决)
for (let l = 1; l <= 5; l++) {
  setTimeout(function timer() {
    console.log(l, 'l')
  }, l * 1000)
}
// --------------------------------------------------------------------------------

/* 2. 深浅拷贝 */
// 问题例子
/*let a = {
  age: 1
};
let b = a;
a.age = 2;
console.log(b.age); // 2*/

// 浅拷贝
// Object.assign()

/*
let a = {
  age: 1
}
let b = Object.assign({}, a); // Object.assign拷贝所有的属性值到新的对象中，若属性值是对象，则拷贝地址
a.age = 2;
console.log(b.age); // 1
*/


// ...展开运算符
/*let a = {
  age: 1
};
let b = {...a};
a.age = 2;
console.log(b.age); // 1*/

// 深拷贝
// 问题例子
/*let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = {...a}
a.jobs.fisrt = 'native'
console.log(b.jobs.first) // native*/

// 解决方法1 JSON.parse(JSON.stringify(object))
// 该方法实现深拷贝，缺点:
// 1. 会忽略 undefined
// 2. 会忽略 symbol
// 3. 不能序列化函数和REGX和Date
// 4. 不能解决循环引用的对象
/*let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a));
a.jobs.first = 'native'
console.log(b.jobs.first); // FE*/

// JSON转换异常例子
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function () {
  },
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}

// 简化版深拷贝
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }
  let isArray = Array.isArray(obj);
  let newObj = isArray ? [...obj] : {...obj};
  // Object.keys()返回属性key，但不包括不可枚举的属性
  // Reflect.ownKeys()返回所有属性key
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj;
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
