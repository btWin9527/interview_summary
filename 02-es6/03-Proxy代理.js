/* 涉及题目：Proxy可以实现什么功能 */
// let p = new Proxy(target, handler) // target 代表需要添加代理的对象，handler用于自定义对象的操作，

// Proxy实现数据响应式
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      /*
      * Reflect.get(target,propertyKey,[receiver])
      * target 需要取值的目标对象
      * propertyKey 需要获取值的键值
      * receiver  如果target对象中指定了getter, receiver则为getter调用时的this
      * */
      if (typeof target[property] === 'object' && target[property] !== null) { // 实现监听引用类型数据的监听
        return new Proxy(target[property], handler);
      } else {
        return Reflect.get(target, property, receiver);
      }
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    }
  }
  return new Proxy(obj, handler);
}

let obj = {a: 1};
let p = onWatch(obj, (v, property) => {
  console.log(`监听到属性${property}改变为${v}`);
}, (target, property) => {
  console.log(`'${property}' = ${target[property]}`);
})

p.a = 2; // 监听属性a的变化
console.log(p.a, 'p.a') // 'a' = 2

