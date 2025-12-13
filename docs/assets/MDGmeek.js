document.addEventListener('DOMContentLoaded', function() {
    // ==================== 可配置变量 ====================
    const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
    const BLUR_STRENGTH = '8px'; // 模糊程度：5px, 8px, 10px, 15px等
    const BUTTON_HOVER_COLOR = '#3cd2cd'; // 右上角按钮悬停颜色
    const CARD_MAX_WIDTH = '1100px'; // 卡片最大宽度
    const CARD_PADDING = '20px'; // 卡片内边距
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
        
        // 创建外层容器 - 修复：使用100%宽度确保全屏
        const pageContainer = document.createElement('div');
        pageContainer.id = 'page-container';
        pageContainer.style.cssText = `
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 30px 20px;
            box-sizing: border-box;
        `;
        
        // 创建卡片容器 - 修复：使用固定宽度而非百分比
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.style.cssText = `
            width: 100%;
            max-width: ${CARD_MAX_WIDTH};
            display: flex;
            justify-content: center;
        `;
        
        // 创建卡片 - 修复：确保卡片宽度100%
        const card = document.createElement('mdui-card');
        card.setAttribute('variant', 'elevated');
        card.style.cssText = `
            width: 100%;
            min-height: calc(100vh - 60px);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            display: block; /* 改为block而不是flex */
        `;
        
        // 创建高斯模糊背景层 - 修复：确保覆盖整个卡片
        const blurBackground = document.createElement('div');
        blurBackground.className = 'blur-background-layer';
        blurBackground.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
        `;
        
        // 创建内容容器 - 修复：添加明确尺寸
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'card-content-wrapper';
        contentWrapper.style.cssText = `
            position: relative;
            z-index: 1;
            width: 100%;
            min-height: 100%;
            box-sizing: border-box;
        `;
        contentWrapper.innerHTML = originalContent;
        
        // 组装卡片
        card.appendChild(blurBackground);
        card.appendChild(contentWrapper);
        cardContainer.appendChild(card);
        pageContainer.appendChild(cardContainer);
        
        // 清空body并添加新结构
        body.innerHTML = '';
        body.appendChild(pageContainer);
        
        // 添加全局样式
        const htmlStyle = document.createElement('style');
        htmlStyle.innerHTML = `
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                min-height: 100vh;
            }
            
            body {
                background: url('${BACKGROUND}') no-repeat center center fixed !important;
                background-size: cover !important;
                font-family: sans-serif;
                line-height: 1.25;
            }
            
            #page-container {
                background: transparent;
            }
            
            /* 高斯模糊关键样式 - 修复：优化模糊层 */
            .blur-background-layer::before {
                content: '';
                position: absolute;
                top: -30px;
                left: -30px;
                right: -30px;
                bottom: -30px;
                background: url('${BACKGROUND}') no-repeat center center fixed;
                background-size: cover;
                filter: blur(${BLUR_STRENGTH});
                -webkit-filter: blur(${BLUR_STRENGTH});
                z-index: -1;
            }
            
            /* 卡片内容区域样式 - 修复：确保宽度正确 */
            .card-content-wrapper {
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(3px);
                -webkit-backdrop-filter: blur(3px);
                width: 100% !important;
                display: block;
                padding: ${CARD_PADDING} !important;
            }
            
            /* 强制所有内部元素继承容器宽度 */
            .card-content-wrapper > * {
                max-width: 100% !important;
                box-sizing: border-box !important;
            }
            
            /* 特别处理可能限制宽度的元素 */
            #header, #main, #footer, .blogTitle, .title-right,
            .SideNav, .markdown-body, .pagination {
                width: 100% !important;
                max-width: 100% !important;
            }
            
            /* 确保MDUI卡片不限制宽度 */
            mdui-card {
                width: 100% !important;
                display: block !important;
            }
            
            /* 响应式调整 */
            @media (max-width: 1200px) {
                .card-container {
                    padding: 0 20px;
                }
            }
            
            @media (max-width: 768px) {
                #page-container {
                    padding: 15px 10px;
                }
                
                .card-content-wrapper {
                    padding: 15px !important;
                }
            }
        `;
        document.head.appendChild(htmlStyle);
    }
    
    wrapContentInMduiCard();
    // ====================================================================

    // ==================== 各页面主题调整 ====================
    // 将颜色值转换为RGBA格式（保持0.9透明度）
    function getHoverColorRgba() {
        const hex = BUTTON_HOVER_COLOR.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, 0.9)`;
    }
    
    const buttonHoverRgba = getHoverColorRgba();
    
    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题 (修复宽度问题)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主页主题 - 修复宽度问题 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
        }
        
        /* 确保header区域宽度正确 */
        #header {
            height: 340px;
            background: transparent !important;
            width: 100% !important;
            max-width: 100% !important;
            position: relative;
        }
        
        .blogTitle {
            display: unset;
        }
        
        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: auto !important;
        }
        
        .title-right {
            margin: 0;
            margin-top: 295px;
            margin-left: 50%;
            transform: translateX(-50%);
            width: auto !important;
            white-space: nowrap;
        }
        
        .avatar {
            width: 200px;
            height: 200px;
        }
        
        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
        }
        
        /* 侧边导航适配 */
        .SideNav {
            background: rgba(255, 255, 255, 0.75) !important;
            border-radius: 10px;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            width: 100% !important;
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
        .pagination {
            width: 100% !important;
            display: flex;
            justify-content: center;
        }
        
        .pagination a:hover, .pagination a:focus, 
        .pagination span:hover, .pagination span:focus, 
        .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto !important;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        div.title-right .btn:hover {
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
        
        /* 确保主要内容区域宽度正确 */
        #main {
            width: 100% !important;
            display: block;
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
        console.log('MDGmeek : 应用文章页主题 (修复宽度问题)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 文章页主题 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.88) !important;
            padding: 45px !important;
        }
        
        @media (max-width: 1000px) {
            .card-content-wrapper {
                padding: 20px !important;
            }
        }
        
        /* markdown内容 - 确保宽度正确 */
        .markdown-body {
            width: 100% !important;
            max-width: 100% !important;
        }
        
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
            background: rgba(255, 255, 255, 0.7);
            max-width: 100% !important;
        }

        .markdown-alert {
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.85) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            width: 100% !important;
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.9) !important;
            border-radius: 10px;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: auto;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgba(141, 150, 161, 0.25) !important;
        }

        video {
            border-radius: 10px;
            max-width: 100% !important;
        }

        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto !important;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        div.title-right .btn:hover {
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
        
        /* 确保文章内容容器宽度正确 */
        .post-content {
            width: 100% !important;
            max-width: 100% !important;
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
        console.log('MDGmeek : 应用搜索页主题 (修复宽度问题)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 搜索页主题 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
        }
        
        /* header布局 */
        .title-right {
            align-items: flex-end;
            width: 100% !important;
            display: flex;
            justify-content: center;
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
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
            width: 100% !important;
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
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto !important;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        div.title-right .btn:hover {
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
            width: 100% !important;
            max-width: 400px !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: 100% !important;
            height: 36px;
            display: flex;
            justify-content: center;
        }
        
        /* 确保搜索容器宽度正确 */
        .tag-cloud, .search-results {
            width: 100% !important;
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
        console.log('MDGmeek : 应用MDUI卡片基础样式');
        let style = document.createElement("style");
        style.innerHTML = `
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.85) !important;
        }
        `;
        document.head.appendChild(style);
    }
});
