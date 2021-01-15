# react和vue比较

+ MVVM是什么
+ Virtual DOM是什么
+ 前端路由如何实现跳转的
+ React和Vue之间的区别

## MVVM

> 设计题目： 什么是MVVM? 与MVC的区别？

+ 传统的 MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新
  （缺陷就是控制器承担的责任太大了，随着项目愈加复杂，控制器中的代码会越来越臃肿，导致出现不利于维护的情况）
+ MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓

## Virtual DOM

> 什么是Virtual DOM? 为什么Virtual DOM比原生DOM快？

```js
// 简化版模拟dom元素
const ul = {
  tag: 'ug',
  props: {
    class: 'list'
  },
  children: {
    tag: 'li',
    children: '1'
  }
}
```

**判断新旧两个 JS 对象的最小差异并且实现局部更新 DOM**

> 同层级比较，实现时间复杂度O(n)

+ 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中给每个节点添加索引，便于最后渲染差异
+ 一旦节点有子元素，就去判断子元素是否相同

虚拟dom的优势：

1. 将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发
2. 同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等
3. 实现组件的高度抽象化

## 路由原理

> 涉及题目：前端路由原理，两种实现方式的区别

```text
前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新页面。目前前端使用的路由就只有两种实现方式
· Hash 模式
· History 模式
```

### Hash模式

```js
/*
www.test.com/#/ 就是 Hash URL，当 # 后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 www.test.com。
* */
window.addEventListener('hashchange', () => {

})
```

### History模式

```js
// History 模式是 HTML5 新推出的功能，主要使用 history.pushState 和 history.replaceState 改变 URL
// 新增历史记录
history.pushState(stateObject, title, URL);
history.replaceState(sateObject, title, URL)
// 当用户做出浏览器动作时，如后退会触发popState事件
window.addEventListener('popstate', e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state)
})
```

**两种模式对比**

+ Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL
+ History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
+ Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

### vue和react区别

+ Vue 的表单可以使用 v-model 支持双向绑定，相比于 React 来说开发上更加方便，当然了 v-model 其实就是个语法糖，本质上和 React 写表单的方式没什么区别
+ 改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用 setState 来改变状态，并且使用这个 API 也有一些坑点。并且 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React
  还是需要用户手动去优化这方面的问题
+ React 需要使用 JSX，有一定的上手成本，并且需要一整套的工具链支持，但是完全可以通过 JS 来控制页面，更加的灵活。Vue 使用了模板语法，相比于 JSX 来说没有那么灵活，但是完全可以脱离工具链，通过直接编写 render
  函数就能在浏览器中运行
  

