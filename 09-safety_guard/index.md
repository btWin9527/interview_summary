# safety_guard

## XSS

> 题目：什么是 XSS 攻击？如何防范 XSS 攻击？什么是 CSP？

```text
XSS 简单点来说，就是攻击者想尽一切办法将可以执行的代码注入到网页中。 XSS 可以分为多种类型，但是总体上我认为分为两类：持久型和非持久型。 持久型也就是攻击的代码被服务端写入进数据库中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击。
```

**解决方法**

+ 转义字符

## CSP

> CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击

**开启CSP**

+ 设置 HTTP Header 中的 Content-Security-Policy
    + 只允许加载本站资源 `Content-Security-Policy: default-src ‘self’`
    + 只允许加载 HTTPS 协议图片 `Content-Security-Policy: img-src https://*`
    + 允许加载任何来源框架 `Content-Security-Policy: child-src 'none'`
+ 设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">

## CSRF

> 涉及题目： 什么是 CSRF 攻击？如何防范 CSRF 攻击？

```text
CSRF 中文名为跨站请求伪造。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。
```

**防范CSRF攻击**

1. Get 请求不对数据进行修改
2. 不让第三方网站访问到用户 Cookie
3. 阻止第三方网站请求接口
4. 请求时附带验证信息，比如验证码或者 Token

## 点击劫持

> 涉及题目：什么是点击劫持？如何防范点击劫持？

```text
点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
```

**X-FRAME-OPTIONS防御**

> X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击

+ DENY，表示页面不允许通过 iframe 的方式展示
+ SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
+ ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示

**JS防御**

```html

<script>
  if (self == top) {
    var style = document.getElementById('click-jack')
    document.body.removeChild(style)
  } else {
    top.location = self.location
  }
</script>
```

## 中间人攻击

> 涉及题目：什么是中间人攻击？如何防范中间人攻击？

```text
中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。通常来说不建议使用公共的 Wi-Fi，因为很可能就会发生中间人攻击的情况。如果你在通信的过程中涉及到了某些敏感信息，就完全暴露给攻击方了

```
