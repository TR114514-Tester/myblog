document.addEventListener('DOMContentLoaded', function() {
    const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
    
    // ==================== 1. 自动导入 MDUI 2 CSS 和 JS ====================
    // 使用官方CDN引入MDUI 2 [citation:10]
    function loadMDUIResources() {
        // 检查是否已加载，避免重复添加
        if (!document.querySelector('link[href*="mdui.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/mdui@2/mdui.css';
            document.head.appendChild(link);
        }
        if (!document.querySelector('script[src*="mdui.global.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/mdui@2/mdui.global.js';
            document.body.appendChild(script); // JS放在body末尾加载
        }
    }
    loadMDUIResources();
    // ====================================================================

    let currentUrl = window.location.pathname;

    // ==================== 2. 包装页面内容到MDUI卡片 ====================
    // 此函数将当前body的内容移动到卡片内，并保留必要的原有结构（如#header）
    function wrapContentInMduiCard() {
        const body = document.body;
        const originalContent = body.innerHTML;
        
        // 创建MDUI卡片容器 [citation:6]
        // 使用 variant="elevated" 获得带阴影的卡片效果
        const cardContainer = document.createElement('div');
        cardContainer.className = 'mdui-container'; // 可选：使用MDUI的容器布局
        cardContainer.style.padding = '16px'; // 添加一些内边距
        cardContainer.style.maxWidth = '1100px'; // 保持与原设计一致的宽度限制
        cardContainer.style.margin = '30px auto'; // 居中
        
        // 创建卡片
        const card = document.createElement('mdui-card');
        card.setAttribute('variant', 'elevated'); // 设置卡片样式为带阴影 [citation:6]
        card.style.borderRadius = '10px'; // 自定义圆角，与原设计匹配
        card.style.overflow = 'hidden'; // 确保子元素圆角不溢出
        
        // 将原始内容放入卡片
        card.innerHTML = originalContent;
        
        // 将卡片放入容器，再将容器放入body
        cardContainer.appendChild(card);
        body.innerHTML = ''; // 清空body
        body.appendChild(cardContainer);
        
        // 将全局背景样式应用到html元素，而不是body
        const htmlStyle = document.createElement('style');
        htmlStyle.innerHTML = `
            html {
                background: url('${BACKGROUND}') no-repeat center center fixed !important;
                background-size: cover !important;
                min-height: 100vh;
            }
            body {
                background: transparent !important; // 移除body原有背景色
                margin: 0;
                padding: 0;
            }
        `;
        document.head.appendChild(htmlStyle);
    }
    // 在应用特定主题前包装内容
    wrapContentInMduiCard();
    // ====================================================================

    // 判断url，添加主题
    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题 (MDUI卡片版)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主页主题 - 适配MDUI卡片 */
        
        /* header布局 - 调整以适应卡片内部 */
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
            background: transparent !important; /* 使头部背景透明，显示卡片底色 */
        }
        
        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .title-right {
            margin: unset;
            margin-top: 295px;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        
        .avatar {
            width: 200px;
            height: 200px;
        }
        
        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
        }
        
        /* 侧边导航适配 */
        .SideNav {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: #3cd2cd;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        `;
        document.head.appendChild(style);
        
        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题 (MDUI卡片版)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 文章页主题 - 适配MDUI卡片 */
        
        /* markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
        }

        .markdown-alert {
            border-radius: 10px;
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 10px;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgb(141 150 161 / 20%);
        }

        video {
            border-radius: 10px;
        }

        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }

        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: #3cd2cd;
        }

        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }

        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        `;
        document.head.appendChild(style);

        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });

    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题 (MDUI卡片版)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 搜索页主题 - 适配MDUI卡片 */
        
        /* header布局*/
        .title-right {
            align-items: flex-end;
        }

        @media (max-width: 600px) {
            .tagTitle {
                display: unset;
                font-size: 14px;
                white-space: unset;
            }
        }
        
        /* 侧边导航 */
        .SideNav {
            background: rgba(255, 255, 255, 0.6);
            border-radius: 10px;
            min-width: unset;
        }
        
        .SideNav-item:hover {
            background-color: #c3e4e3;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: #3cd2cd;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        /* 搜索框样式 */
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: unset; 
            height: 36px;
        }
        `;
        document.head.appendChild(style);
        
        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });
        
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });

    } else {
        console.log('MDGmeek : 应用MDUI卡片基础样式');
    }
});
