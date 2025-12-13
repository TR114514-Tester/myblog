# 前言

> [!TIP]
> 部署后可能会有Error 1101风险

**众所周知，在中国，想访问外国网站，最为简单的方式就是"加速器"了**
**本篇文章，我会教你一步一步地在CloudFlare上创建Worker并且使用EdgeTunnel项目来搭建代理节点**
# 注册CloudFlare账号
注册地址：[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
**如果进不去，请修改DNS服务器为1.1.1.1（CloudFlare官方DNS）**
进去后界面如图
![cf1](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf1.png?raw=true)
然后使用邮箱注册一个账号
**推荐使用小号或者新注册一个号，有被ban风险**
# 部署EdgeTunnel
打开下面这个地址
[https://github.com/cmliu/edgetunnel](https://github.com/cmliu/edgetunnel)
这个就是Cmliu的EdgeTunnel主页了
打开里面的_worker.js
**全部复制**
然后打开我们的CloudFlare
在左边选择**计算和AI**
然后选择里面的**Worker和Pages**
进来后是这样的
![cf2](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf3.png?raw=true)
点击左上角的**新建应用程序**
![cf3](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf4.png?raw=true)
选择**从 Hello World！开始**
![cf4](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf5.png?raw=true)
到这里直接点击**部署**
![cf5](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf6.png?raw=true)
现在我们进入Worker的设置界面
接下来，**我们就要开始部署EdgeTunnel到Worker了**
我们先点击右上角的**编辑代码**
![cf6](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf7.png?raw=true)
然后把我们刚才复制的代码放进去，点击右上角的**部署**
我们回到Worker的设置页面
![cf5](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf6.png?raw=true)
选择**设置**
![cf7](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf8.png?raw=true)
然后在**变量和机密里面**添加一个变量

| 变量名  | 变量内容  |
| ------------ | ------------ |
| **ADMIN**  |  **123456**（这是你的密码，请使用安全性高的，你能记住的密码） |

如下图所示
![cf8](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf9.png?raw=true)
然后点击**部署**
现在我们点击左边的**存储和数据库**，在里面选择**Workers KV**
![cf9](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf10.png?raw=true)
点击右上角的**Create Instance**
随便输入一个名字
![cf10](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf11.png?raw=true)
现在回到Worker的设置界面
![cf5](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf6.png?raw=true)
点击**绑定**
![cf11](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf12.png?raw=true)
点击**添加绑定**
![cf12](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf13.png?raw=true)
再次点击**添加绑定**（弹窗内的）
![cf13](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf14.png?raw=true)

| 变量名称  | KV命名空间  |
| ------------ | ------------ |
| **KV**  |  **asdf1111**（刚创建的Workers KV） |

接下来访问网站
可以看到是一个Nginx界面，但这是**假的**
![cf14](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf15.png?raw=true)
我们在地址栏后加上**admin**或者**login**进入后台管理
![cf15](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf16.png?raw=true)
输入**你刚才设置的密码**，我设置的是123456就输入123456
点击自适应订阅右边的**复制订阅**
![cf16](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf17.png?raw=true)
添加到**代理软件**里，会发现有很多节点，但在我这里ping不通，下一篇文章我会教你优选IP来进行使用
![cf17](https://blog.traveler.dpdns.org/Tutorial/CloudFlareBuildEdgeTunnel/cf18.png?raw=true)