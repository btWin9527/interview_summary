/* 涉及题目： Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？ */
/*
* Promise
* 1. 等待中（pending）
  2. 完成了 （resolved）
  3. 拒绝了（rejected）
这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变
* */

/* 涉及题目：async 及 await 的特点，它们的优点和缺点分别是什么？await 原理是什么？ */

/*
*
* await缺点
* 因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低
* */
