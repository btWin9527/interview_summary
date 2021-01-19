# react基础知识点

## 生命周期

**Reconciliation阶段**

+ componentWillMount
+ componentWillReceiveProps
+ shouldComponentUpdate
+ componentWillUpdate

**Commit阶段**

+ componentDidMount
+ componentDidUpdate
+ componentWillUnmount

> 因为 Reconciliation 阶段是可以被打断的，所以 Reconciliation 阶段会执行的生命周期函数就可能会出现调用多次的情况，从而引起 Bug。由此对于 Reconciliation 阶段调用的几个函数，除了 shouldComponentUpdate 以外，其他都应该避免去使用，并且 V16 中也引入了新的 API 来解决这个问题,getDerivedStateFromProps 用于替换 componentWillReceiveProps ，该函数会在初始化和 update 时被调用

```js
class ExampleComponent extends React.Component {
  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.someMirroredValue !== nextProps.someValue) {
      return {
        derivedData: computeDerivedState(nextProps),
        someMirroredValue: nextProps.someValue
      }
    }
    return null;
  }
}
```

## setState

> setState这个API是异步的，首先 setState 的调用并不会马上引起 state 的改变，并且如果你一次调用了多个 setState ，那么结果可能并不如你期待的一样

```js
function handle() {
  // 初始化 `count` 为 0
  console.log(this.state.count) // -> 0
  this.setState({count: this.state.count + 1})
  this.setState({count: this.state.count + 1})
  this.setState({count: this.state.count + 1})
  console.log(this.state.count) // -> 0
}
```

> 在每次调用 setState 后获得正确的 state

```js
function handle() {
  this.setState((prevState) => ({count: prevState.count + 1}), () => {
    console.log(this.state)
  })
}
```

## 通信

+ 父子组件通信
+ 兄弟组件通信
+ 跨多层级组件通信
+ 任意组件

**父子通信**
> 父组件通过 props 传递数据给子组件，子组件通过调用父组件传来的函数传递数据给父组件，这两种方式是最常用的父子通信实现办法

> 这种父子通信方式也就是典型的单向数据流，父组件通过 props 传递数据，子组件不能直接修改 props， 而是必须通过调用父组件函数的方式告知父组件修改数据。

**兄弟组件通信**

> 对于这种情况可以通过共同的父组件来管理状态和事件函数。比如说其中一个兄弟组件调用父组件传递过来的事件函数修改父组件中的状态，然后父组件将状态传递给另一个兄弟组件。

**跨组件传值**

> 16.3 以上版本的话，对于这种情况可以使用 Context API

```jsx
// 创建Context,可以在开始就传入值
const StateContext = React.createContext();

class Parent extends React.Component {
  render() {
    return (
      // value就是传入Context中的值
      <StateContext.Provider value='yck'>
        <Child/>
      </StateContext.Provider>
    )
  }
}

class Child extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        // 取出数据
        {context => (
          name is {context}
          )
        }
      </ThemeContext.Consumer>
    )
  }
}
```
