# DOM

Document Object Modal,文档对象模型  
DOM 代表操作页面接口，接口以便 js 程序可以改变文档的结构，风格和内容  
DOM 模型用逻辑树来表示一个文档，树的每一个分支终点都是一个节点 node

## EventTarget Node Element

Element->Node->EventTarget

Node 继承至其祖先 EventTarget,Element 继承至其祖先 Node  
平时使用 html 上的元素，即 Element，是类型为 ELEMENT_NODE 的 Node

## EventTarget

EventTarget 是一个接口，它提供了一个标准的方法来处理事件  
EventTarget.addEventListener() 在 EventTarget 上注册特定事件类型的事件处理程序  
EventTarget.removeEventListener() 在 EventTarget 中删除事件侦听器  
EventTarget.dispatchEvent() 将事件分派到此 EventTarget  
可参考创建和触发 events:  
https://developer.mozilla.org/zh-CN/docs/Web/Events/Creating_and_triggering_events

---

当 EventTarget 对象接收到浏览器事件后，会生成一个 event 对象来描述该次交互事件  
event 对象会被作为第一个参数传递给事件监听的回调函数  
event 对象包含了与事件相关的所有信息,例如：

1. type
2. target
3. currentTarget
4. bubbles
5. preventDefault
6. stopPropagation
7. stopImmediatePropagation
8. cancelable
9. defaultPrevented
10. isTrusted
11. eventPhase
12. timestamp

## Node

Node 是 DOM 中所有节点的基类接口，包括元素节点属性节点文本节点等  
它提供了节点树结构相关的属性和方法，如 parentNode,childNode,nextSibling,previousSibling 等  
Node 继承自 EventTarget,它意味着所有节点都可以接受事件

## Element

Element 是 Node 的一个子接口，它代表着 DOM 中的一个元素节点，例如<div>,<span>,<input>等  
它提供了 HTML 元素相关的属性和方法，如 id,className,tagName,getAttribute,setAttribute 等  
Element 也继承自 EventTarget，因此元素节点同样可以接收事件

# 捕获，冒泡

DOM 事件标准描述了事件传播的 3 个阶段：

1. 捕获阶段（Capturing phase）- 事件（从 window.document）向下走进元素
2. 目标阶段（Target phase）- 事件达到目标元素
3. 冒泡阶段（Bubbling phase）- 事件从元素上开始冒泡

v 字模型，window 在最高点，触发元素在最低点  
详见：https://www.w3.org/TR/DOM-Level-3-Events/#event-flow

一般事件处理会选择冒泡模型，因为符合常识；

捕获阶段模型很少使用，可以通过以下方式在捕获阶段触发事件：
el.addEventListener(type,listener,true)
el.addEventListener(type,listener,{capture:true})

添加 DOM 节点事件主要有 3 种方法，比如添加 click 事件
方法 3 最强大最常用

1. el.onclick = function(){}
2. function a(){}
   el.setAttribute("onclick", "a()");
3. el.addEventListener

### 网页禁止复制如何实现

不能完全防止复制，用户手机即可使用 OCR

重写网页复制和剪切事件：  
// 禁止右键菜单  
document.oncontextmenu = function(){ return false; };  
// 禁止文字选择  
document.onselectstart = function(){ return false; };  
// 禁止复制  
document.oncopy = function(){ return false; };  
// 禁止剪切  
document.oncut = function(){ return false; };

恢复网页复制剪切事件：  
document.body.oncopy = null;  
document.body.oncut = null;  
document.body.onselectstart = null;  
document.body.oncontextmenu = null;

### preventDefault

取消默认操作，使用 peventDefault  
比如点击 a 链接打开外部链接就是默认操作

### sessionStorage,localStorage,cookie

使用 sessionStorage 和直接在 window 上挂载属性有何区别？  
页面刷新,sessionStorage 属性还存在，window 上属性刷新丢失

# 伪类，伪元素

可以减轻维护成本。
数量众多，通常用于明确的目的。

伪类，以:开头,例如：  
:first-child  
:last-child  
:hover  
:focus  
伪元素，以::开头，例如：  
::before  
::after

::before 和::after，可以和 content 属性一起使用，使用 CSS 将内容插入到文档中

# CSS 盒子模型

1. 标准盒子模型:
   box-sizing:content-box;  
   盒子实际总宽度 = width + padding + border + margin;盒子实际总高度 = height + padding + border + margin  
   设置 width,height 不包括 padding,border,margin

2. IE 盒子模型
   box-sizing:border-box;  
   盒子实际总宽度 = width + margin;盒子实际总高度 = height + margin;  
   设置 width,height 包括 padding,border

# CSS 生效是通过计算权重来实现的，权重最高就生效

1. Browser normal declarations  
2. User normal declarations  
3. App normal declarations  
4. App important declarations  
5. User important declarations

1. element names
2. other attributes 
3. id attributes
4. style


# BFC

BFC 就是页面一个独立容器的规则，里面的子元素不影响外面的元素  
可用来解决 margin 重叠等问题  
如何添加 BFC:

1. 设置 overflow 为 auto,scroll,hidden
2. 设置 float 为 left,right
3. 设置 display 为 flex,inline-block,grid
4. 设置 position 为 absolute,fixed

# DP，DIP，PPI，DPR

DP:物理像素，代表屏幕上面有多少个物理点，物理级别概念，单位 pt  
DIP:逻辑像素，操作系统级概念，单位 px，Retina 高清屏幕 1 个 px 可对应 2 个或者 3 个 pt  
DPR:设备像素比，dp/dip，window.devicePixelRatio 可获取 DPR  
PPI:屏幕像素密度，每英寸有多少个物理像素，PPI 越高屏幕越清晰

# 页面生命周期

1.DOMContentLoaded  
浏览器已完全加载 HTML,并构建了 DOM 树，但像<img>和样式表之类的外部资源可能尚未加载完成  
DOM 已经加载完毕，应用程序可查找 DOM 节点，并初始化接口（SPA 无法查找，因为此时 SPA 只有一个 ID 为 root 的 div 元素）  
在此阶段，浏览器渲染树 Render Tree 尚未构建完成

2.load  
浏览器不仅加载完成了 HTML,还加载完成了所有外部资源：图片，样式等  
外部资源已加载完成，样式已被应用，图片大小也已知了  
在此阶段，浏览器渲染树 Render Tree 构建完成

3.beforeunloaded  
用户正在离开  
我们可以检查用户是否保存了更改，并询问他是否真的要离开

4.unload  
用户几乎已经离开  
我们仍然可以启动一些操作，例如发送统计数据

# 浏览器渲染树构建

1. 构建 DOM 树：解析 HTML,创建 DOM 节点
2. 构建 CSSOM 树：CSS Object Tree
3. 构建渲染树:Render Tree 包含了 DOM 节点的样式和布局信息
4. 布局（Layout）：浏览器根据渲染树计算每个节点的几何形象，如位置和大小
5. 绘制（Painting）：浏览器根据布局信息在屏幕上绘制节点

# css,js 加载顺序

1. css 外部样式无法使用异步加载逻辑，外联和内联的 css 是所有渲染的前提条件，css 同步加载可避免页面样式闪烁  
DOM Tree->CSSOM Tree->Render Tree->Layout->Paint  
js 可以通过 domcument.styleSheets 拿到 css 数据，所以 css 最好在 js 之前解析执行完毕

2. js 内联及不带属性的外联加载会中断解析渲染，立即下载执行  
script 带 defer 属性的会异步有序加载，不会阻止 HTML 解析，会在 DOMContentLoaded 事件完成加载和执行（执行的时候会保证 DOM 树已构建）  
script 带 async 属性的会异步无序加载

# 页面性能分析

Lighthouse 工具分析  
重要指标：

1. FCP(First Contentful Paint):页面首次内容绘制时间,可通过加快 Render Tree 生成时间提高
2. SI(Speed Index):页面加载期间内容显示速度，可通过减少 js 主线程工作提高
3. LCP(Largest Contentful Paint):最大内容绘制,可通过优化图片等静态资源提高
4. TBT(Total Blocking Time):总阻塞时间，页面被阻塞响应用户交互的总时间
5. CLS(Cumulative Layout Shift):累计布局偏移,首页图片和视频包含尺寸，添加动画

# H5 performance

通过浏览器 performance 信息获取页面完整加载的时间信息  
浏览器从卸载旧页面开始，到新页面加载完成，整个过程一共被分为 10 个小块：

1. 导航
2. 卸载旧文档
3. 重定向
4. 应用缓存
5. DNS 解析
6. TCP 连接
7. HTTP 请求处理
8. HTTP 响应处理
9. DOM 处理
10. 文档装载完成

# preload prefetch

link 标签可以使用 preload prefetch  
preload：立即加载需要渲染的关键资源  
prefetch：浏览器空闲时加载资源，但不影响当前页面，为了优化后续用户体验  
preload 和 prefetch 仅仅是加载，不会执行，所以不会阻塞渲染

### V8 引擎内存管理

分为 2 个部分，Heap 和 stack

Heap:  
堆内存，存储对象和动态数据的地方,其中 GC 也发生在这里  
Heap 主要构成：  
1.new space  
2.old space  
3.large object space  
4.code space:这是即时编译器(JIT)存储已经编译的代码块的地方  
5.cell space,property cell space,map space

每个空间（除了 large object space）都由一组 Page 组成，一个 Page 是由操作系统分配的一个连续内存块，大小为 1MB

Stack:
栈内存，存放静态数据，如框架函数，原型对象的值，执行栈指针  
Stack 内存由操作系统进行管理，不是由 V8 进行管理

### V8 GC

将对象分别放置于新生代（短命），老生代（长命），对不同区域采取不同算法

对新生代采用置换算法(Minor GC)(Scavenger)  
1.将堆空间内存分成大小相同的 2 块，同时只有 1 块在使用中  
2.使用中的为 from 空间，未使用的为 to 空间  
3.当 from 空间堆满时执行 Minor GC，将 from 标记正在使用的变量，并将其复制移动到 to，from 空间释放变为 to，原 to 变为 from

对老生代(Major GC) 1.标记(Marking):标识哪些对象为活的，可通过 Stack 指针进行递归遍历，可访问的对象为活的  
2.清扫(Sweeping):遍历 Heap,将所有未被标记为活的对象进行内存地址释放  
3.压缩(Conpacting):将不连续存活的内存地址对象移动到一起，减少内存碎片，提高性能

引用类型在没有引用之后，通过 V8 的 GC 自动回收  
值类型如果是处于闭包的情况下，要等闭包没有引用才会被 GC 回收，非闭包的情况下等待 V8 的新生代(new space)切换的时候回收

新生代内存最大值在 64 位和 32 位系统上分别是 32MB 和 16MB  
老生代内存随系统内存可调整，对于 4GB 以上内存系统来说老生代大小约 1GB

### JIT

Just-In-Time 编译，通过将字节码编译成机器码，提升 js 代码的执行效率

1. 代码收集：识别频繁执行的热点代码并收集
2. 代码优化：通过内联函数，死区代码消除，循环展开等技术优化代码
3. 代码生成：将优化后的字节码编译成机器码，并存入缓存
4. 代码执行：执行引擎执行机器码

字节码是 AST 对象转换的指令集合，是实现 JS 引擎多平台支持的核心

### 虚拟列表滚动

长列表优化常用的方法主要是虚拟列表滚动  
虚拟列表的原理是类似 Fiber 架构，分为计算树和显示树，通过计算树计算实现渲染规定区域的列表项。减少 DOM 操作和内存消耗，从而提高滚动性能和用户体验  
实现步骤：

1. 确定渲染窗口大小
2. 通过用户滚动高度计算可见区域第一项及最后一项数据的 startIndex,endIndex
3. 获取第一项及最后一项数据遮罩层的 startOffset 及 endOffset，通过设置 transform 的 translateY 实现部分内容遮挡效果

### PWA

渐进式应用
必须包含以下内容：

1. Service Worker:独立线程，提供缓存控制及自定义响应功能
2. Web Manifest:添加至桌面功能
3. HTTPS:保证通讯安全

#### service worker

基本步骤：

1. 主线程注册：使用 navigator.serviceWorker.register()
2. 安装：使用 self.addEventListener('install',()=>{})来监听安装，在安装之前可以使用 waitUntil 来缓存应用所需资源
3. 激活：使用 self.addEventListener('activate',()=>{})来监听激活，在激活前可以使用 waitUntil 来清理旧缓存
4. 激活后可拦截网络请求：使用 self.addEventListener('fetch',()=>{})来拦截,实现自定义响应
