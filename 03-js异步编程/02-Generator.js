/* 涉及题目：Generator */

/*
* Generator (控制函数的执行)
* */
function* foo(x) {
  let y = 2 * ((yield(x + 1)))
  let z = yield(y / 3)
  return (x + y + z)
}

let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
