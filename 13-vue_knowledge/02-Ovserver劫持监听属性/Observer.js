/* 观察者 */
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 保存旧值
    this.oldVal = this.getOldVal();
  }

  getOldVal() {
    Dep.target = this; // 挂载watcher
    const oldVal = compileUtil.getVal(this.expr, this.vm);
    Dep.target = null;
    return oldVal;
  }

  update() {
    // 通过比较新值和旧值，更新视图
    const newVal = compileUtil.getVal(this.expr, this.vm);
    if (newVal !== this.oldVal) {
      this.cb(newVal);
    }
  }
}

/* 收集依赖 */
class Dep {
  constructor() {
    this.subs = [];
  }

  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }

  // 通知观察者去更新
  notify() {
    console.log('通知了观察者', this.subs)
    this.subs.forEach(w => w.update())
  }
}

/* 监听数据变化 */
class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    // 监听对象变化
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      })
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化，往dep中添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newVal) => {
        this.observer(newVal); // 赋值新值时监听新增数据
        if (newVal !== value) {
          value = newVal;
        }
        // 告知Dep通知变化
        dep.notify();
      }
    })
  }
}
