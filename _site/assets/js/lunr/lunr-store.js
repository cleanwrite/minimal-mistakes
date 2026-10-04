var store = [{
        "title": "测试密码锁文章",
        "excerpt":" ","categories": [],
        "tags": [],
        "url": "/1/",
        "teaser": null
      },{
        "title": "静默无声",
        "excerpt":"正文部分  一个静默音频播放程序。   这是通过博客提供的分享内容，如需获取更多资源，请使用验证码解锁下方区域。  ","categories": [],
        "tags": [],
        "url": "/jingmo/",
        "teaser": null
      },{
        "title": "技术文件讨论指导",
        "excerpt":"正文部分  你好，欢迎来到 fw 的 blog，所有节点已更新至最新版本，更新日期为2026.8.15，如果你有任何问题请联系留下的联系方式，感谢您的使用和反馈，谨记网址https://fwblog.de5.net  ","categories": [],
        "tags": [],
        "url": "/hpn/",
        "teaser": null
      },{
        "title": "吉他谱个人分享站：Vercel + alphaTab",
        "excerpt":"做了个吉他谱分享站。GPX 文件能在浏览器里直接渲染成五线谱 + 六线谱，PDF 和图片也能在线看。纯前端，挂在 Cloudflare Pages 上。   之前的痛点是 Guitar Pro 文件只能在电脑上看，手机上一堆 .gp5 文件没法预览。alphaTab 正好能解这个 —— 它把 GPX 二进制解析成 SVG，浏览器直接显示。   功能      GPX 乐谱渲染 + 播放（alphaTab 解析 Guitar Pro 3-8）   PDF 在线预览（iframe 嵌入）   图片画廊（带下载按钮）   全局搜索（歌名 + 分类名）   两层导航：分类卡片 → 谱子列表   多格式切换（同一首有 GPX + PDF + 图片时）   蓝奏云 / 夸克网盘备份链接   几个坑   alphaTab 1.8 load() 变了   旧版是回调模式 api.load(data, success, error)，1.8 改成同步返回 boolean。之前一直报错，翻源码才发现签名变了：   const uint8 = new Uint8Array(buffer); const success = api.load(uint8);  中文路径   fetch 直接拿中文文件名会 404。需要对路径逐段编码：   function encodeAssetPath(path) {   return path.split('/').map(s =&gt; encodeURIComponent(s)).join('/'); }  stylesheet 某些 Map 是 undefined   某些 GP5 文件解析后 score.stylesheet.perTrackMultiBarRest 不初始化，渲染时调用 .has() 报 Cannot read properties of undefined。在 scoreLoaded 事件里补上：   api.scoreLoaded.on((score) =&gt; {   const ss = score.stylesheet;   if (!ss.perTrackMultiBarRest) ss.perTrackMultiBarRest = new Map();   if (!ss.perTrackDisplayTuning) ss.perTrackDisplayTuning = new Map();   if (!ss.perTrackChordDiagramsOnTop) ss.perTrackChordDiagramsOnTop = new Map(); });  alphaTab 的 CDN 版用 Blob Worker 跑 Web Worker，Cloudflare Pages 静态托管没遇到问题，但保险起见还是关掉了 useWorkers: false。   两层导航   一级是分类卡片（按艺术家或风格），二级是标签筛选。数据全部前台 JSON 渲染，没有后端接口。分类卡片用 CSS Grid 自适应，手机端自动变成单列。   部署   Vercel 连 GitHub 仓库，自动识别静态站点，git push 后自动上线。   项目地址：https://github.com/cleanwrite/fwjita-share   线上地址：https://fwjita.de5.net      🎸 吉他谱个人分享站    GPX · PDF · 图片 · 全局搜索 · 纯前端零后端    打开吉他谱站 →   GitHub · 在线访问   ","categories": [],
        "tags": ["Vercel","alphaTab","前端","项目"],
        "url": "/guitar-tab-share-site/",
        "teaser": null
      },{
    "title": "DeepSeek 峰谷时钟",
    "excerpt":"            数据来源: waynegeng/ds-price-clock · MIT License   ","url": "https://fwblog.de5.net/ds-clock/"
  },{
    "title": "导航站",
    "excerpt":"    🧭 导航站    常用网站精选 · 分类整理 · 快速访问                12       分类                 76       链接               🤖 AI   🎬 视频   📥 下载   🎵 音乐   🌐 代理   ☁️ 云服务   📧 邮箱   📚 资源   🎮 游戏   🔍 工具   🔞 NSFW   🔒 定位              🤖            AI 工具        智能对话 · 生成式 AI           7 个           ChatGPTOpenAI 对话     ClaudeAnthropic AI     Google GeminiGoogle AI     GrokxAI 对话     个人工作台超星 AI     GPTPandaAI 助手     AICUAI 工具               🎬            视频 / 创作        AI 视频 · 创作工具           6 个           GenmoAI 视频生成     RunwayAI 视频编辑     ReplicateAI 模型平台     AISingers虚拟歌声合成     PV Tool日式 PV 生成     B站视频下载SnapAny 解析               📥            下载 / 工具        资源获取 · 文件传输           7 个           Pandownload百度网盘     YouTube 下载iiilab 解析     YouTube 高清SnapAny 下载     Webtor在线 torrent     轻松传文件传输     BigjpgAI 图片放大     狸部落软件下载站               🎵            音乐 / 吉他        听歌 · 搜歌 · 吉他工具           7 个           音乐搜索器多站合一     音乐搜索liumingye     网易云无损解析高音质下载     吉他调音器网页版     吉他社吉他谱下载     Otto 鬼叫在线生成     讯飞智文语音转写               🌐            网络 / 代理        代理节点 · 翻墙工具           7 个           Clash 订阅免费节点     getNode节点更新     CF Vless/Trojan代理脚本     Edge Tunnel多功能面板     CF 免费 VPN零度博客     DeepL 翻译精准翻译     IPDBIP 数据库               ☁️            域名 / 云服务        域名管理 · 部署 · CDN           6 个           Namesilo域名管理     免费域名DNSHE     CloudflareDNS / CDN     Vercel部署平台     Switch520游戏资源     网速测试Speedtest               📧            邮箱 / 通讯        邮箱 · 代码托管           3 个           Proton Mail加密邮箱     GitHub代码托管     Xiaomi Vela快应用文档               📚            资源 / 文库        电子书 · 搜索 · 工具分享           4 个           Z-Library电子图书馆     Yandex 图片以图搜图     小众技术工具分享     一网一匠新产品发现               🎮            游戏 / 娱乐        Minecraft · 游戏资源 · 论坛           7 个           Bilibili视频弹幕     Minecraft ForumMC 论坛     ChunkbaseMC 地图工具     木牌商店MC JE 1.19     Switch520游戏资源     CS:S ModsCS 起源模组     黑客之选THC 工具               🔍            查询 / 工具        手机号 · 系统工具           6 个           手机号还原UU 工具     手机号生成BMCX     手机号 MD5号段转 MD5     社工库信息查询     KeyTweak键盘重映射     CF 新方案GitHub               🔞            NSFW        18+ 内容 · 请谨慎访问           4 个           nhentai漫画     hanime1H 动漫     rem.asiarem     短信轰炸机网页版               🔒            定位 / 追踪        号码定位 · 追踪工具           3 个           号码定位 GPSNT-Locator     号码定位LocateANumber     菜单发布页Canva         ","url": "https://fwblog.de5.net/links/"
  },{
    "title": "文章归档",
    "excerpt":"{% if site.posts.size > 0 %}   {{ content }} {% else %}        暂无文章      博客正在建设中，敬请期待。     {% endif %} ","url": "https://fwblog.de5.net/posts/"
  }]
