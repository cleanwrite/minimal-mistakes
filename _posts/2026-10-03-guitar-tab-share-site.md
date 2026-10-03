---
layout: single
title: "GPX 在线预览站：Cloudflare Pages + alphaTab"
date: 2026-10-03
comments: true
tags: [Cloudflare, alphaTab, 前端, 项目]
---

做了个吉他谱分享站。GPX 文件能在浏览器里直接渲染成五线谱 + 六线谱，PDF 和图片也能在线看。纯前端，挂在 Cloudflare Pages 上。

之前的痛点是 Guitar Pro 文件只能在电脑上看，手机上一堆 .gp5 文件没法预览。alphaTab 正好能解这个 —— 它把 GPX 二进制解析成 SVG，浏览器直接显示。

## 功能

- GPX 乐谱渲染 + 播放（alphaTab 解析 Guitar Pro 3-8）
- PDF 在线预览（iframe 嵌入）
- 图片画廊（带下载按钮）
- 全局搜索（歌名 + 分类名）
- 两层导航：分类卡片 → 谱子列表
- 多格式切换（同一首有 GPX + PDF + 图片时）
- 蓝奏云 / 夸克网盘备份链接

## 几个坑

### alphaTab 1.8 load() 变了

旧版是回调模式 `api.load(data, success, error)`，1.8 改成同步返回 boolean。之前一直报错，翻源码才发现签名变了：

{% highlight javascript %}
const uint8 = new Uint8Array(buffer);
const success = api.load(uint8);
{% endhighlight %}

### 中文路径

`fetch` 直接拿中文文件名会 404。需要对路径逐段编码：

{% highlight javascript %}
function encodeAssetPath(path) {
  return path.split('/').map(s => encodeURIComponent(s)).join('/');
}
{% endhighlight %}

### stylesheet 某些 Map 是 undefined

某些 GP5 文件解析后 `score.stylesheet.perTrackMultiBarRest` 不初始化，渲染时调用 `.has()` 报 `Cannot read properties of undefined`。在 `scoreLoaded` 事件里补上：

{% highlight javascript %}
api.scoreLoaded.on((score) => {
  const ss = score.stylesheet;
  if (!ss.perTrackMultiBarRest) ss.perTrackMultiBarRest = new Map();
  if (!ss.perTrackDisplayTuning) ss.perTrackDisplayTuning = new Map();
  if (!ss.perTrackChordDiagramsOnTop) ss.perTrackChordDiagramsOnTop = new Map();
});
{% endhighlight %}

alphaTab 的 CDN 版用 Blob Worker 跑 Web Worker，Cloudflare Pages 静态托管没遇到问题，但保险起见还是关掉了 `useWorkers: false`。

## 部署

Cloudflare Pages 连 GitHub 仓库，Framework preset 选 None，Build command 留空，Output directory 填 `/`。git push 后自动上线。

项目地址：[https://github.com/cleanwrite/fwjita-share](https://github.com/cleanwrite/fwjita-share)

线上地址：[https://fwjita-share.pages.dev](https://fwjita-share.pages.dev)
