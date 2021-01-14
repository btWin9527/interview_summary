/* 涉及题目：etTimeout、setInterval、requestAnimationFrame 各有什么特点 */

// 修正setTimeout因前面代码影响性能后，定时不准确

let period = 60 * 1000 * 60 * 2;
let startTime = new Date().getTime()
let count = 0
let end = new Date().getTime() + period
let interval = 1000
let currentInterval = interval

function loop() {
  count++
  // 代码执行所消耗的时间
  let offset = new Date().getTime() - (startTime + count * interval);
  let diff = end - new Date().getTime()
  let h = Math.floor(diff / (60 * 1000 * 60))
  let hdiff = diff % (60 * 1000 * 60)
  let m = Math.floor(hdiff / (60 * 1000))
  let mdiff = hdiff % (60 * 1000)
  let s = mdiff / (1000)
  let sCeil = Math.ceil(s)
  let sFloor = Math.floor(s)
  // 得到下一次循环所消耗的时间
  currentInterval = interval - offset;
  console.log('时：' + h, '分：' + m, '毫秒：' + s, '秒向上取整：' + sCeil, '代码执行时间：' + offset, '下次循环间隔' + currentInterval)
  setTimeout(loop, currentInterval)
}

setTimeout(loop, currentInterval)


/*
* setInterval
* 通常不建议使用，1. 不能保证在预期的时间执行任务；2. 存在执行累计的问题
*  */

/*
* requestAnimationFrame
* 自带函数节流功能，基本可以保证16.6ms只执行一次, 函数的延时效果精确的
* requestAnimationFrame适用于对于时间较为敏感的环境（但是动画逻辑更加复杂），而setInterval则可在保证程序的运算不至于导致延迟的情况下提供更加简洁的逻辑（无需自行处理时间）
*  */
