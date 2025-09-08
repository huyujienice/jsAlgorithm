# 浏览器扩展核心概念

## 配置清单

manifest 是整个项目的配置信息,content_scripts 配置内容脚本,background 配置注入脚本，action 配置弹出式窗口，side_panel 配置侧边栏

## 内容脚本

内容脚本可以做到每个网页都加载 js 和 css 文件，同网页交互都是都过内容脚本进行的
可同时使用 window.可同时使用 window.postMessage.runtime 和 chrome.runtime.sendMessage

## 注入脚本

注入脚本可通过

1. chrome.action.openPopup 打开扩展
2. chrome.storage.local 存储消息
3. chrome.runtime.onMessage.addListener,chrome.runtime.sendMessage 监听和传递消息

## 扩展储存

可使用 chrome.storage，在注入脚本内还可以使用 indexedDB

1. storage.local，本地存储，上限 10M
2. storage.managed，系统管理员管理，企业专用
3. storage.session，内存存储
4. storage.sync，浏览器同步功能，数据会同步至每个用户已登陆的设备

## 消息传递

1. 网页使用 window.addEventListener('message', handleMessage)监听消息，使用 window.postMessage({type: 'XXX',},'\*')传递消息至内容脚本
2. 内容脚本通过 window.addEventListener 监听网页消息，通过 window.postMessage 传递消息给网页，通过 chrome.runtime.sendMessage 传递消息给注入脚本
3. 注入脚本通过 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {})接受和返回消息，通过 chrome.storage.get 获取扩展中的信息，在扩展中通过 chrome.action.openPopup 打开扩展
4. 扩展脚本通过 chrome.runtime.onMessage.addListener 完成监听和路由跳转的动作，通过 chrome.runtime.sendMessage 传递消息至注入脚本
