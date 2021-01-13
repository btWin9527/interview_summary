/*
* 涉及题目： 进程与线程区别？JS 单线程带来的好处？
*
* 进程：CPU在运行指令及加载和保存上下文所需的时间
* 线程：描述了指向一段指令所需要的时间
* 例子：打开一个tab (创建了一个进程，包含渲染线程、JS 引擎线程、HTTP 请求线程等等)
*  */

/*
* 设计题目：什么是执行栈
* 执行栈认为是一个存储函数调用的栈结构
* */
console.log('script start') // 1

async function async1() {
  await async2() // 调用2
  console.log('async1 end') // 5
}

async function async2() {
  console.log('async2 end') // 2
}

async1(); // 调用1

setTimeout(function () {
  console.log('setTimeout') // 8
}, 0)

new Promise((resolve) => {
  console.log('Promise') // 3
  resolve()
})
  .then(function () {
    console.log('promise1') // 6
  })
  .then(function () {
    console.log('promise2') // 7
  })

console.log('script end') // 4
/*
* Event Loop执行顺序：
* 1. 首先执行同步代码，这属于宏任务
* 2. 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
* 3. 指向所有微任务
* 4. 当执行完所有微任务后，如有必要会渲染页面
* 5. 然后开始下一轮Event Loop, 执行红任务中的异步代码，也就是setTimeout中的回调函数
*
* */

/*
* 微任务：
* process.nextTick,promise,MutationObserver
* 宏任务：
* script, setTimeout, setInterval, setImmediate, I/O, UI rendering
*
* */
