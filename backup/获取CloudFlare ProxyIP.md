# ProxyIP是什么？
ProxyIP指的是在CloudFlare Workers中那些能够成功代理连接到 Cloudflare 服务的第三方 IP 地址
根据 Cloudflare Workers 的 [TCP Sockets 官方文档](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/) 说明，存在以下技术限制：

> ⚠️ Outbound TCP sockets to [Cloudflare IP ranges ↗](https://www.cloudflare.com/ips/) are temporarily blocked, but will be re-enabled shortly.

这意味着 Cloudflare Workers 无法直接连接到 Cloudflare 自有的 IP 地址段。为了解决这个限制，需要借助第三方云服务商的服务器也就是Workers 节点无法直接连接到 Cloudflare 自有的 IP 地址段
所以我们要`CloudFlare Workers  发起请求 > PROXYIP/SOCKS5/HTTP 服务器  第三方代理 > Cloudflare 服务  目标服务`
# 教程
打开[https://ipdb.api.030101.xyz/?type=proxy](https://ipdb.api.030101.xyz/?type=proxy)获取`ProxyIP`列表
访问后如下图所示
```
8.222.139.227
150.230.96.93
144.24.243.207
143.47.235.216
130.162.161.22
8.222.207.108
138.2.122.191
152.70.93.246
141.147.71.91
146.56.156.7
129.151.198.3
141.147.185.63
8.219.92.213
138.2.28.115
155.248.170.249
8.212.41.98
8.222.202.83
141.148.234.169
141.148.225.150
141.148.228.176
141.148.229.131
146.56.190.143
144.21.42.32
138.2.21.47
64.110.77.205
143.47.188.79
141.147.55.228
143.47.224.46
141.147.182.244
141.148.228.124
146.56.163.227
131.186.58.9
...
```
`Ctrl + A`全选然后`Ctrl + C`复制
打开[https://reallyfreegeoip.org/bulk](https://reallyfreegeoip.org/bulk)
把刚才的结果`粘贴`进去，点击`Bulk Lookup`
完成后把他`下载`下来
随便用一个软件打开
搜索你需要的区域，比如`HK`
这样我们就获取了`HK`的`ProxyIP`
接下来该干什么你自己应该知道了   :D
# 实际应用效果
> 👤 访问非 Cloudflare CDN 站点时（如油管、谷歌等），你的 IP 归属地由「优选 IP」决定
> 🌐 访问由 Cloudflare CDN 托管的网站时（如推特、ChatGPT等），你的 IP 归属地由「ProxyIP/SOCKS5/HTTP」决定