---
layout: single
title: "基于 Cloudflare Pages + alphaTab 搭建在线吉他谱预览站"
date: 2026-10-03
comments: true
tags: [Cloudflare, alphaTab, 前端, 项目]
---

吉他谱散落在各个网盘和微信群里，每次找一首都要翻半天。GPX 格式只能在 Guitar Pro 里打开，手机上根本看不了。于是搭了这个：上传 GPX，浏览器里直接渲染五线谱 + TAB，支持 PDF 预览和图片画廊，纯前端零后端。

技术选型上，Cloudflare Pages 提供免费托管 + 全球 CDN，alphaTab 是目前最成熟的 Web 乐谱渲染库，两者搭配刚好够用。

<!-- TOC -->

## 核心功能

- 🎼 **GPX 乐谱渲染** — alphaTab 直接解析 .gpx 文件，五线谱 + TAB 谱同屏显示
- 📄 **PDF 在线预览** — 内置 PDF.js，不用下载就能看扫描版谱子
- 🖼️ **图片画廊** — 支持 PNG/JPG 格式的谱子图片，懒加载 + 点击放大
- 🔍 **全局搜索** — 按歌名、艺术家、标签实时筛选
- 🔄 **多格式切换** — 同一首歌有 GPX/PDF/图片时，底部一键切换
- 📂 **两层导航** — 一级分类（艺术家/风格），二级标签（原调/难度/调式）

## 技术实现

### alphaTab 加载 GPX

GPX 本质是 gzipped XML，alphaTab 接受 `Uint8Array`。fetch 拿到 arrayBuffer 后转成 Uint8Array，喂给 `api.load()`，返回 boolean 表示成功与否。

{% highlight javascript %}
async function loadGpx(url) {
  const resp = await fetch(url);
  const buf = await resp.arrayBuffer();
  const data = new Uint8Array(buf);

  // alphaTab 1.8+ load() 是同步的，返回 true/false
  const success = api.load(data);
  if (!success) {
    console.error('GPX 解析失败，可能不是标准格式');
    return false;
  }
  api.render(); // 渲染到 canvas
  return true;
}
{% endhighlight %}

### 中文路径编码

GPX 文件名经常带中文（比如 `草东没有派对-大风吹.gpx`），直接 fetch 会 404。需要对路径逐段 `encodeURIComponent`：

{% highlight javascript %}
// ❌ 错误：中文直接拼 URL
fetch(`/scores/草东/大风吹.gpx`)

// ✅ 正确：逐段编码
const path = ['草东', '大风吹.gpx']
  .map(encodeURIComponent)
  .join('/');
fetch(`/scores/${path}`)
{% endhighlight %}

### alphaTab 1.8 API 变化

从 1.7 升到 1.8，`api.load()` 不再是回调模式，改成同步返回。之前写的 `api.load(data, onSuccess, onError)` 在 1.8 里直接报错。翻了 migration guide 才搞明白：

{% highlight javascript %}
// 1.7 写法（废弃）
api.load(data, () => api.render(), (err) => console.error(err));

// 1.8 写法
if (api.load(data)) {
  api.render();
} else {
  // 处理失败
}
{% endhighlight %}

### 多小节休止符不显示

alphaTab 默认样式表里缺少 `stylesheet.perTrackMultiBarRest` 的定义，导致长休止符渲染成空白。workaround 是在初始化时手动补上这个属性：

{% highlight javascript %}
api.settings = {
  stylesheet: {
    perTrackMultiBarRest: {
      height: 20,
      symbol: 'restMultiBar'
    }
  }
};
{% endhighlight %}

这个坑在 GitHub issue 里有人提过但没修，只能自己 hack。

### PDF 预览

PDF.js 渲染 GPX 导出的 PDF 版本，用 `<canvas>` 逐页绘制。大文件做懒加载，只渲染当前可见页：

{% highlight javascript %}
const pdf = await pdfjsLib.getDocument(url).promise;
const page = await pdf.getPage(1);
const viewport = page.getViewport({ scale: 1.5 });

const canvas = document.getElementById('pdf-canvas');
canvas.width = viewport.width;
canvas.height = viewport.height;
page.render({ canvasContext: canvas.getContext('2d'), viewport });
{% endhighlight %}

### 全局搜索

纯前端过滤，不调用 API。把曲目列表存成 JSON，搜索时按歌名、艺术家、标签三字段匹配：

{% highlight javascript %}
const results = tracks.filter(t =>
  t.title.toLowerCase().includes(query) ||
  t.artist.toLowerCase().includes(query) ||
  t.tags.some(tag => tag.includes(query))
);
{% endhighlight %}

数据量不大（几百首），客户端过滤够用。

## 部署

Cloudflare Pages 直接连 GitHub 仓库，`git push` 触发自动构建。纯静态站点，不需要构建命令，Pages 直接托管仓库根目录。

```
git add . && git commit -m "add new scores" && git push
```

30 秒后线上更新。配合 Cloudflare 的全球 CDN，国内访问速度也还行。

## 项目地址

<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px 24px;margin:24px 0;text-align:center;">
  <p style="font-size:1.1rem;font-weight:600;margin:0 0 8px;">🎸 fwjita-share — 在线吉他谱预览</p>
  <p style="opacity:0.7;font-size:0.85rem;margin:0 0 12px;">GPX / PDF / 图片 · 全局搜索 · 纯前端 · 零后端</p>
  <a href="https://fwjita-share.pages.dev/" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 24px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;">打开项目站 →</a>
  <p style="margin:12px 0 0;font-size:0.75rem;opacity:0.5;"><a href="https://github.com/cleanwrite/fwjita-share" target="_blank" rel="noopener noreferrer">GitHub</a> · 欢迎提 issue 贡献谱子</p>
</div>
