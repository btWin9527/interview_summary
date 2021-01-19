# react_hooks

> 参考链接： https://github.com/KieSun/Dream/issues/15

## useState

> `useState`的用法很简单，传入一个初始 state，返回一个 state 以及修改 state 的函数

```js
// useState返回的 state 是个常量
// 
```

## 使用hooks调用数据

```js
const [count, setCount] = useState(0);
const [loading, setLoading] = useState(false);
const fetch = React.useCallback(() => { // 缓存请求函数，确保其内部更新不会引起fetch更新
  setLoading(true);
  setTimeout(() => {
    setCount(1);
    setLoading(false);
  })
})
useEffect(() => {
  fetch();
}, fetch);
```

## 总结

+ useState: 传入初始状态，返回一个常量状态以及改变状态的函数
+ useEffect: 第一个参数接受一个 callback，每次组件更新都会执行这个 callback，并且 callback 可以返回一个函数，该函数会在每次组件销毁前执行。如果 useEffect
  内部有依赖外部的属性，并且希望依赖属性不改变就不重复执行 useEffect 的话，可以传入一个依赖数组作为第二个参数
+ useRef: 如果需要有一个地方来存储变化的数据
+ useCallback: 如果需要一个不会随着组件更新而创建的callback
