# advanced_knowledge

## 响应式原理

> Vue内部使用了Object.defineProperty()来实现数据响应式，通过这个函数可以监听到set和get的事件

```js
// 简化版监听
var data = {name: 'yck'};
observe(data);
let name = data.name; // get value
data.name = 'yyy'; // change value

function observe(obj) {
  if (!obj || typeof obj !== "object") return;
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get: function reactiveGetter() {
      console.log('get value')
      return val;
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal;
    }
  });
}
```

以上代码简单的实现了如何监听数据的 set 和 get 的事件，但是仅仅如此是不够的，因为自定义的函数一开始是不会执行的。只有先执行了依赖收集，才能在属性更新的时候派发更新，所以接下来我们需要先触发**依赖收集**

```js
// 实现一个Dep类，用于解耦属性的依赖手机和派发更新操作
// 通过Dep解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }

  // 更新
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

// 全局属性，通过该属性配置Watcher
Dep.target = null;
```

> 先来简单的了解下 Vue 组件挂载时添加响应式的过程。在组件挂载时，会先对所有需要的属性调用 Object.defineProperty()，然后实例化 Watcher，传入组件更新的回调。在实例化过程中，会对模板中的属性进行求值，触发依赖收集

```js
class Watcher {
  constructor(obj, key, cb) {
    // 将Dep.target 指向自己
    // 然后触发属性的getter添加监听
    // 最后将Dep.target置空
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }

  update() {
    // 获得新值
    this.value = this.obj[this.key]
    // 调用update方法更新dom
    this.cb(this.value)
  }
}
```

> 改造defineReactive函数，在自定义函数中添加依赖收集和派发更新相关的代码

```js
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val);
  let dp = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将Watcher添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal;
      // 指向watcher的update方法d
      dp.notify();
    }
  })
}
```

## Object.defineProperty的缺陷

> 如果通过下标方式修改数组数据或者给对象新增属性并不会触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作，更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题

```ts
// 解决方法: this.$set
export function set(target: Array<any> | Object, key: any, val: any): any {
    // 判断是否为数组且下标是否有效
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        // 调用splice函数触发派发更新
        // 该函数已被重写
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val;
    }
    // 判断key 是否已经存在
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }
    const ob = (target: any)
.
    __ob__;
    // 如果对象不是响应对象，就赋值返回
    if (!ob) {
        target[key] = val;
        return val;
    }
    // 进行双向绑定
    defineReactive(ob.value, key, val);
    // 手动派发更新
    ob.dep.notify()
    return val;
}
```

```ts
// 重新数组部分api
// 获得数组原型
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
// 重写以下函数
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(function (method) {
    // 缓存原生函数
    const original = arrayProto[method]
    // 重写函数
    def(arrayMethods, method, function mutator(...args) {
        // 先调用原生函数获得结果
        const result = original.apply(this, args)
        const ob = this.__ob__
        let inserted
        // 调用以下几个函数时，监听新数据
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        if (inserted) ob.observeArray(inserted)
        // 手动派发更新
        ob.dep.notify()
        return result
    })
})
```

## vue组件编译过程

> Vue 会通过编译器将模板通过几个阶段最终编译为 render 函数，然后通过执行 render 函数生成 Virtual DOM 最终映射为真实 DOM。

1. 将模板解析为 AST
2. 优化 AST
3. 将 AST 转换为 render 函数

```text
// 生成一个最基本的AST对象
{
  // 类型
  type: 1,
    // 标签
    tag,
    // 属性列表
    attrsList: attrs,
  // 属性映射
  attrsMap: makeAttrsMap(attrs),
  // 父节点
  parent,
  // 子节点
  children: []
}
```

## nextTick原理分析

> nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM

```js
// 实现 macrotasks ，会先判断是否能使用 setImmediate ，不能的话降级为 MessageChannel ，以上都不行的话就使用 setTimeout
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
