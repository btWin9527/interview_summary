/* 设计题目：为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？ */

/*
* 模块化优点：
* 解决命名冲突
* 提供复用性
* 提供代码可维护性
*
* */

// 立即执行函数
(function (globalVariable) {
  globalVariable.test = function () {
  }
  // ... 声明各种变量、函数都不会污染全局作用域
})(window)

// CommonJS
var module = require('./a.js')
module.a
// 这里其实就是包装了一层立即执行函数，这样就不会污染全局变量了，
// 重要的是 module 这里，module 是 Node 独有的一个变量
module.exports = {
  a: 1
}
// module 基本实现
var module = {
  id: 'xxxx', // 我总得知道怎么去找到他吧
  exports: {} // exports 就是个空对象
}
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports
var load = function (module) {
  // 导出的东西
  var a = 1
  module.exports = a
  return module.exports
};
// 然后当我 require 的时候去找到独特的
// id，然后将要使用的东西用立即执行函数包装下，over


// ES Module
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}
