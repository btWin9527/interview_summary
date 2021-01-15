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
