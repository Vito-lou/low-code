import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
/**js-cookie库和localStorage都是用来在客户端存储数据的方式，但它们有一些关键的区别，这些差异可能会影响你选择使用哪个的决定：

存储大小：localStorage提供的存储空间通常比cookies要大得多。一般情况下，localStorage可以存储5MB左右的数据，而单个cookie的大小限制为4KB。

服务器访问：使用js-cookie（或任何其他cookie操作库）设置的cookies会随着HTTP请求发送到服务器，这意味着服务器可以访问这些cookies中的信息。相比之下，localStorage仅在客户端可用，服务器无法直接访问localStorage中的数据。

过期时间：Cookies可以设置过期时间，这意味着cookies可以在一定时间后自动失效。而localStorage则是持久性的存储，除非用户手动清除浏览器缓存或者使用脚本删除。

易用性：js-cookie提供了一个简单的API来处理cookies，包括设置、获取和删除cookies。而localStorage的API同样简单，但在处理需要过期时间的数据时就不如cookies方便。

安全性：cookies支持设置HttpOnly属性，该属性可以阻止客户端脚本访问cookie，从而减少XSS攻击的风险。但localStorage是易受XSS攻击的，因为它可以被任何在同源策略下运行的JavaScript代码访问。

同源策略：localStorage受同源策略限制，只有来自相同的源（协议、域名和端口）的页面才能访问相应的数据。而对于cookies，如果设置了Domain和Path属性，不同的子域名之间可以共享相同的cookies。

SSR（服务器端渲染）：如果你的网站使用服务器端渲染，cookies是更好的选择，因为服务器在渲染页面时可以读取cookie。localStorage仅在客户端脚本中可用。

因此，选择使用js-cookie还是localStorage通常取决于你需要的功能、你的安全需求以及你是否需要在服务器端访问存储的数据。例如，如果你需要在服务器和客户端之间频繁共享数据，并且对数据的大小没有太大要求，那么cookies可能是更好的选择。如果你需要在客户端存储大量数据，并且不需要在每个HTTP请求中发送这些数据，那么localStorage可能是更好的选择。 */