# Live2D-Widget
首先，打开原作者的地址[live2d-widget](https://github.com/stevenjoezhang/live2d-widget/ "live2d-widget")可以看到有一个一键部署
```
<script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
```
但是我们地处**中国**，所以在国内慢成依托答辩
所以把他上传到我们的**网站**即可
我们打开[live2d-widget](https://github.com/stevenjoezhang/live2d-widget/ "live2d-widget")的Github界面，下载它的ZIP，然后我们上传到网站根目录（只需要把`dist`文件夹里面的上传即可）
我的地址：[https://blog.traveler.dpdns.org/live2d/](https://blog.traveler.dpdns.org/live2d/)

# 配置Live2D-Widget

> [!IMPORTANT]
> 请跟着我一步步配置

打开`autoload.js`
修改`live2d_path`为自己上传的路径，也就是**https://blog.traveler.dpdns.org/live2d/**
# 配置Live2D-API
**示例**：

```
/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// Recommended to use absolute path for live2d_path parameter
// live2d_path 参数建议使用绝对路径
const live2d_path = 'https://blog.traveler.dpdns.org/live2d/';
// const live2d_path = '/dist/';
```

再找到下面这个

```
initWidget({
    waifuPath: live2d_path + 'waifu-tips.json',
    cdnPath: 'https://blog.traveler.dpdns.org/live2d_api/',
    cubism2Path: live2d_path + 'live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info'],
    logLevel: 'warn',
    drag: false,
```

先修改`cdnPath`为另一个目录（`live2d_api`，等会就要配置了）
在修改下面的`tools`，去掉没有用的

#Live2D_API
打开[live2d_api](https://github.com/fghrsh/live2d_api)官方**Github**地址
把这里面的全部下载下来
上传到我们刚才的**目录**（`/live2d_api`）

> [!TIP]
> Github默认配置不能上传超过100个文件，分批次上传即可

配置`models.json`
```
{
    "models": [
        "bilibili-live/22",
        "bilibili-live/33",
        [
            "ShizukuTalk/shizuku-48",
            "ShizukuTalk/shizuku-pajama"
        ],
        [
            "HyperdimensionNeptunia/neptune_classic",
            "HyperdimensionNeptunia/nepnep",
            "HyperdimensionNeptunia/neptune_santa",
            "HyperdimensionNeptunia/nepmaid",
            "HyperdimensionNeptunia/nepswim",
            "HyperdimensionNeptunia/noir_classic",
            "HyperdimensionNeptunia/noir",
            "HyperdimensionNeptunia/noir_santa",
            "HyperdimensionNeptunia/noireswim",
            "HyperdimensionNeptunia/blanc_classic",
            "HyperdimensionNeptunia/blanc_normal",
            "HyperdimensionNeptunia/blanc_swimwear",
            "HyperdimensionNeptunia/vert_classic",
            "HyperdimensionNeptunia/vert_normal",
            "HyperdimensionNeptunia/vert_swimwear",
            "HyperdimensionNeptunia/nepgear",
            "HyperdimensionNeptunia/nepgear_extra",
            "HyperdimensionNeptunia/nepgearswim",
            "HyperdimensionNeptunia/histoire",
            "HyperdimensionNeptunia/histoirenohover"
        ],
        "KantaiCollection/murakumo"
    ],
    "messages": [
        "来自 Bilibili Live 的 22 哦 ~",
        "来自 Bilibili Live 的 33 的说",
        "Shizuku Talk ！这里是 Shizuku ~",
        "Nep! Nep! 超次元游戏：海王星 系列",
        "艦隊これくしょん / 叢雲(むらくも)"
    ]
}
```

> [!IMPORTANT]
> 注意JSON格式，最后一格不要写英文逗号

而且`models`的顺序就是切换的顺序

# Script导入
直接在`Head`里面写下这个代码

```
<script src='https://blog.traveler.dpdns.org/live2d/autoload.js'>
```

最后
**刷新即可生效**