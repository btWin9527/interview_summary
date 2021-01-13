/*
* 涉及题目：事件的触发过程是怎么样的？知道什么是事件代理嘛？
*
* 事件触发:
* · window 往事件触发处传播，遇到注册的捕获事件会触发
* · 传播到事件触发处时触发注册的事件
* · 从事件触发处往 window 传播，遇到注册的冒泡事件会触发
* */

/*
*
* 涉及题目：什么是跨域？为什么浏览器要使用同源策略？你有几种方式可以解决跨域问题？了解预检请求嘛？
*
* 同源策略
* 概念：如果协议、域名或者端口有一个不同就是跨域
* 引入目的：防止CSRF攻击 （CSRF攻击是利用用户的登录态发起恶意请求）
* 页面发起跨域ajax请求后，浏览器拦截响应
* */

/*
* JSONP
* 原理：利用<script>标签没有跨域限制，通过<script>标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时
*
* <script src="http://domain/api?param1=a&param2=b&callback=jump"></script>
* <script>
    function jsonp(data) {
      console.log(data)
    }
  </script>
* */

function jsonp(url, jsonpCallback, success) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.type = 'text/javascript';
  window[jsonpCallback] = function (data) {
    success && success(data)
  }
  document.body.appendChild(script);
}

jsonp('http://xxx', 'callback', function (value) {
  console.log(value)
})

/*
* CORS
* 浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域
* */
/*
* document.domain
* 该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。
只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域
*
* */

/*
* postMessage  (解决iframe跨域)
* 这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
*
* */

// 发送消息响应
window.parent.postMessage('message', 'http://test.com')
// 接收消息
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin;
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})

/*
* 涉及题目：有几种方式可以实现存储功能，分别有什么优缺点？什么是 Service Worker？
*
* 特征         | cookie           |  localStorage | sessionStorage  | indexDB
* -----------------------------------------------------------------------------
* 数据生命周期 |  一般由服务器生成 |  除非被清理，  |  页面关闭就清理  |  除非被清理，
*             | 可以设置过期时间  |  否则一直存在  |                 |  否则一直存在
* -----------------------------------------------------------------------------
* 数据存储大小|         4K       |     5M        |        5M        |     无限
* -------------------------------------------------------------------------------
* 与服务器通信|每次都会携带在 header 中，对于请求性能影响  |
* */

/*
* cookie注意：
* value      如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识
* http-only  不能通过 JS 访问 Cookie，减少 XSS 攻击
* secure      只能在协议为 HTTPS 的请求中携带
* same-site   规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击
* */

/*
* Service Worker
* 概念：运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全
* 缓存步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。以下是这个步骤的实现
*
* */
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function (registration) {
      console.log('service worker 注册成功')
    })
    .catch(function (err) {
      console.log('service worker 注册失败')
    })
}

// sw.js
// 监听'install'事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
  )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据直接使用缓存，否则去请求
self.addEventListener('fetch', e => {
  e.respondWith(
    cache.match(e.request).then(function (response) {
      if (response) {
        return response;
      }
      console.log('fetch source')
    })
  )
})
