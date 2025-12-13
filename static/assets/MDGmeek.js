document.addEventListener('DOMContentLoaded', function() {
    // ==================== 可配置变量 ====================
    const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
    const BLUR_STRENGTH = '8px'; // 模糊程度：5px, 8px, 10px, 15px等
    const BUTTON_HOVER_COLOR = '#000000'; // 右上角按钮悬停颜色，可修改为其他颜色如：#4CAF50, #2196F3, #FF9800, #9C27B0
    // ====================================================
    
    // ==================== 自动导入 MDUI 2 CSS 和 JS ====================
    function loadMDUIResources() {
        if (!document.querySelector('link[href*="mdui.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/mdui@2/mdui.css';
            document.head.appendChild(link);
        }
        if (!document.querySelector('script[src*="mdui.global.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/mdui@2/mdui.global.js';
            document.body.appendChild(script);
        }
    }
    loadMDUIResources();
    // ====================================================================

    let currentUrl = window.location.pathname;

    // ==================== 包装页面内容到MDUI卡片 + 高斯模糊 ====================
    function wrapContentInMduiCard() {
        const body = document.body;
        const originalContent = body.innerHTML;
        
        // 创建卡片容器
        const cardContainer = document.createElement('div');
        cardContainer.className = 'mdui-container';
        cardContainer.style.padding = '16px';
        cardContainer.style.maxWidth = '1100px';
        cardContainer.style.margin = '30px auto';
        cardContainer.style.display = 'flex';
        cardContainer.style.justifyContent = 'center';
        cardContainer.style.alignItems = 'flex-start';
        
        // 创建卡片
        const card = document.createElement('mdui-card');
        card.setAttribute('variant', 'elevated');
        card.style.borderRadius = '10px';
        card.style.overflow = 'hidden';
        card.style.width = '100%';
        card.style.maxWidth = '1100px';
        card.style.minHeight = 'calc(100vh - 60px)';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.position = 'relative';
        
        // 创建高斯模糊背景层
        const blurBackground = document.createElement('div');
        blurBackground.className = 'blur-background-layer';
        blurBackground.style.position = 'absolute';
        blurBackground.style.top = '0';
        blurBackground.style.left = '0';
        blurBackground.style.width = '100%';
        blurBackground.style.height = '100%';
        blurBackground.style.zIndex = '0';
        blurBackground.style.overflow = 'hidden';
        
        // 创建内容容器
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'card-content-wrapper';
        contentWrapper.style.position = 'relative';
        contentWrapper.style.zIndex = '1';
        contentWrapper.style.flexGrow = '1';
        contentWrapper.innerHTML = originalContent;
        
        // 组装卡片
        card.appendChild(blurBackground);
        card.appendChild(contentWrapper);
        cardContainer.appendChild(card);
        
        // 清空body并添加新结构
        body.innerHTML = '';
        body.appendChild(cardContainer);
        
        // 添加全局样式（包括高斯模糊效果）
        const htmlStyle = document.createElement('style');
        htmlStyle.innerHTML = `
            html, body {
                width: 100%;
                margin: 0;
                padding: 0;
                min-height: 100vh;
            }
            
            body {
                background: url('${BACKGROUND}') no-repeat center center fixed !important;
                background-size: cover !important;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            /* 高斯模糊关键样式 */
            .blur-background-layer::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('${BACKGROUND}') no-repeat center center fixed;
                background-size: cover;
                filter: blur(${BLUR_STRENGTH}) !important;
                -webkit-filter: blur(${BLUR_STRENGTH}) !important;
                transform: scale(1.1);
                margin: -20px;
            }
            
            /* 卡片内容区域样式 */
            .card-content-wrapper {
                background: rgba(255, 255, 255, 0.85) !important;
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
                min-height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }
            
            /* 确保原内容区域正确显示 */
            #header, #main, #footer, .blogTitle, .title-right {
                width: 100%;
                box-sizing: border-box;
            }
            
            /* 修复侧边导航可能的位置问题 */
            .SideNav {
                position: relative !important;
                z-index: 2;
            }
        `;
        document.head.appendChild(htmlStyle);
    }
    
    wrapContentInMduiCard();
    // ====================================================================

    // ==================== 各页面主题调整 ====================
    // 将颜色值转换为RGBA格式（保持0.9透明度）
    function getHoverColorRgba() {
        // 将十六进制颜色转换为RGB
        const hex = BUTTON_HOVER_COLOR.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, 0.9)`;
    }
    
    // 获取转换后的颜色
    const buttonHoverRgba = getHoverColorRgba();
    
    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题 (带高斯模糊的MDUI卡片)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主页主题 - 适配高斯模糊背景 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
            padding: 20px !important;
        }
        
        /* header布局调整 */
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
            background: transparent !important;
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
            width: auto !important;
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
            background: rgba(255, 255, 255, 0.75) !important;
            border-radius: 10px;
            min-width: unset;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.8) !important;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, 
        .pagination span:hover, .pagination span:focus, 
        .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 - 使用配置的颜色变量 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${buttonHoverRgba} !important;
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
        
        /* 确保内容区域正确居中 */
        #main {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        `;
        document.head.appendChild(style);
        
        // 右上角按钮描述
        setTimeout(() => {
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
        }, 100);

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题 (带高斯模糊的MDUI卡片)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 文章页主题 - 适配高斯模糊背景 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.88) !important;
            padding: 45px !important;
        }
        
        @media (max-width: 1000px) {
            .card-content-wrapper {
                padding: 20px !important;
            }
        }
        
        /* markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
            background: rgba(255, 255, 255, 0.7);
        }

        .markdown-alert {
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.85) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.9) !important;
            border-radius: 10px;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgba(141, 150, 161, 0.25) !important;
        }

        video {
            border-radius: 10px;
        }

        /* 右上角按钮 - 使用配置的颜色变量 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${buttonHoverRgba} !important;
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

        // 右上角按钮描述
        setTimeout(() => {
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
        }, 100);

    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题 (带高斯模糊的MDUI卡片)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 搜索页主题 - 适配高斯模糊背景 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
            padding: 20px !important;
        }
        
        /* header布局 */
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
            background: rgba(255, 255, 255, 0.75) !important;
            border-radius: 10px;
            min-width: unset;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.8) !important;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 右上角按钮 - 使用配置的颜色变量 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${buttonHoverRgba} !important;
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
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
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
        
        // 右上角按钮描述
        setTimeout(() => {
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
        }, 100);
        
        // 搜索框回车事件
        setTimeout(() => {
            let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
            let button = document.getElementsByClassName("btn float-left")[0];
            if (input && button) {
                input.addEventListener("keyup", function(event) {
                    event.preventDefault();
                    if (event.keyCode === 13) {
                        button.click();
                    }
                });
            }
        }, 200);

    } else {
        console.log('MDGmeek : 应用MDUI卡片基础样式（带高斯模糊）');
        // 为其他页面添加基本样式
        let style = document.createElement("style");
        style.innerHTML = `
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.85) !important;
            padding: 20px !important;
        }
        `;
        document.head.appendChild(style);
    }
});
