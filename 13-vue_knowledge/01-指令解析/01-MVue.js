/* 自定义vue实例
* 1. 实现一个数据观察者
* 2. 实现一个指令解析器
* 3. 创建文档碎片(作用是创建一个文档碎片，把要插入的新节点先附加在它上面，然后再一次性添加到document中)
*  */

// 指令api
const compileUtil = {
  getVal(expr, vm) {
    /*
    array.reduce(function(total,currentValue,currentIndex,arr),initialValue)
    function参数：
      total 初始值（必传）
      currentValue 当前元素（必传）
      currentIndex 当前元素的索引（可选）
      arr 当前元素所属的数组对象(可选)
    initialValue: 传递给函数的初始值(可选)
    * */
    return expr.split('.').reduce((data, currentVal) => {
      // console.log(data,'data')
      // console.log(currentVal,'currentVal')
      return data[currentVal]
    }, vm.$data);
  },
  text(node, expr, vm) {
    // console.log(node, 'node')
    // console.log(expr, 'expr')
    // 处理模板字符串解析
    let value;
    if (expr.indexOf('{{') !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // console.log(args, 'args')
        return this.getVal(args[1], vm);
      });
    } else {
      value = this.getVal(expr, vm);
    }
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);
    this.updater.modelUpdater(node, value);
  },
  bind(node, expr, vm, attrName) {
    const value = this.getVal(expr, vm);
    node.setAttribute(attrName, value);
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  // 更新函数
  updater: {
    // 更新文本
    textUpdater(node, value) {
      // console.log(node,'node')
      // console.log(value,'value')
      node.textContent = value;
    },
    // 更新dom数据
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    // 更新model表单
    modelUpdater(node, value) {
      node.value = value;
    }
  }
}

class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 1. 获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el);
    // console.log(fragment, '文档流碎片')
    // 2. 编译所有节点
    this.compile(fragment);
    // 3. 追加子元素到根元素
    this.el.appendChild(fragment);
  }

  // 编译节点
  compile(fragment) {
    let childrenNodes = fragment.childNodes;
    // console.log(childrenNodes, '获取所有子节点');
    [...childrenNodes].forEach(child => { // 递归遍历所有子节点
      if (this.isElementNode(child)) {
        // console.log(child, '元素节点')
        this.compileElement(child);
      } else {
        // console.log(child, '文本节点')
        this.compileText(child);
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }

  // 编译元素节点
  compileElement(node) {
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      const {name, value} = attr;
      if (this.isDirective(name)) { // 判断是否为一个指令 v-text v-html v-model v-on:click
        const [, directive] = name.split('-'); // 获取指令 text html model on:click
        const [directiveName, eventName] = directive.split(':'); // text html model on
        // 更新数据 数据驱动视图
        compileUtil[directiveName](node, value, this.vm, eventName);
        // 删除索引指令的标签上的属性
        node.removeAttribute('v-' + directive);
      } else if (this.isEventName(name)) { // @click操作
        const [, eventName] = name.split('@');
        // 更新数据 数据驱动视图
        compileUtil['on'](node, value, this.vm, eventName);
        // 删除索引指令的标签上的属性
        node.removeAttribute('@' + eventName);
      } else if (this.isAttrName(name)) {
        console.log(name, 'name')
        let [, attrName] = name.split(':');
        // 更新数据 数据驱动视图
        compileUtil['bind'](node, value, this.vm, attrName);
        // 删除索引指令的标签上的属性
        node.removeAttribute(':' + attrName);
      }
    })
  }

  // 编译文本节点
  compileText(node) {
    let content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }
  }

  // 创建文档流碎片
  node2Fragment(el) {
    let f = document.createDocumentFragment();
    let firstChildren;
    while (firstChildren = el.firstChild) {
      f.appendChild(firstChildren);
    }
    return f;
  }

  // 是否为@简写的事件绑定
  isEventName(name) {
    return name.startsWith('@');
  }

  // 是否为:简写的属性绑定
  isAttrName(name) {
    return name.startsWith(':');
  }

  // 是否为dom节点
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // 是否为指令
  isDirective(name) {
    return name.startsWith('v-');
  }
}

class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      new Compile(this.$el, this);
    }
  }
}
