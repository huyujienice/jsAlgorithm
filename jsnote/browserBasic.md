# DOM
Document Object Modal,文档对象模型      
DOM代表操作页面接口，接口以便js程序可以改变文档的结构，风格和内容         
DOM模型用逻辑树来表示一个文档，树的每一个分支终点都是一个节点node     

## EventTarget Node Element

Element->Node->EventTarget    
     
Node继承至其祖先EventTarget,Element继承至其祖先Node       
平时使用html上的元素，即Element，是类型为ELEMENT_NODE的Node     

## EventTarget
EventTarget.addEventListener() 在EventTarget上注册特定事件类型的事件处理程序      
EventTarget.removeEventListener() 在EventTarget中删除事件侦听器      
EventTarget.dispatchEvent() 将事件分派到此EventTarget       
可参考创建和触发events:     
https://developer.mozilla.org/zh-CN/docs/Web/Events/Creating_and_triggering_events      

当EventTarget对象接收到浏览器事件后，会生成一个event对象来描述该次交互事件         
event对象会被作为第一个参数传递给事件监听的回调函数       
event对象包含了与事件相关的所有信息,例如：    
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

Node.childNodes 返回一个包含了该节点所有子节点的实时的NodeList。NodeList是动态变化的      
Node.firstChild 返回该节点的第一个子节点Node,如果该节点没有子节点则返回null     
Node.lastChild 返回该节点的最后一个子节点Node，如果该节点没有子节点则返回null     
Node.nextSibling 返回与该节点同级的下一个节点Node，如果没有则返回null     
Node.nodeType ELEMENT_NODE -> 1 TEXT_NODE -> 3     
Node.parentNode 返回一个当前节点Node的父节点。如果没有这样的节点，比如说像这个节点是树结构的顶端或者没有插入一棵树中，这个属性返回null       
Node.parentElement 返回一个当前节点的父节点Element。如果当前节点没有父节点或者说父节点不是一个元素（Element），这个属性返回null      
Node.previousSibling 返回一个当前节点同辈的前一个节点Node，或者返回null（如果不存在这么一个节点的话）    
Node.textContent 返回或设置一个元素内所有子节点及其后代的文本内容      
Node.appendChild() 将指定的childNode参数作为最后一个子元素添加到当前节点。如果参数引用了DOM树上的现有节点，则节点将从当前位置分离，并附加到新位置    
Node.cloneNode() 克隆一个Node，并且可以选择是否克隆这个节点下的所有内容。默认情况下，节点下的内容会被克隆    
Node.compareDocumentPosition() 比较当前节点与文档中的另一个节点的位置      
Node.contains() 返回一个Boolean布尔值，来表示传入的节点是否为改节点的后代节点     
Node.hasChildNodes() 返回一个Boolean布尔值，来表示该元素是否包含有子节点     
Node.insertBefore() 在当前节点下新增一个子节点Node，并使该节点位于参考节点的前面      
Node.removeChild() 移除当前节点的一个子节点。这个子节点必须存在于当前节点中     

## Element
Element.attributes 返回一个与该元素相关的所有属性集合NamedNodeMap    
Element.classList 返回该元素包含的class属性    
NonDocumentTypeChildNode.nextElementSibling 是一个Element，该元素下一个兄弟节点，如果为null表示不存在     
NonDocumentTypeChildNode.previousElementSibling 是一个Element，该元素上一个兄弟节点，如果为null表示不存在     
Element.scrollHeight 返回类型为：Number，表示元素的滚动视图高度     
Element.scrollTop 返回类型为：Number，表示该元素纵向滚动距离     
Element.getBoundingClientRect() 返回元素的大小及其相对与视口的位置     

# 捕获，冒泡

DOM 事件标准描述了事件传播的 3 个阶段：

1. 捕获阶段（Capturing phase）- 事件（从 windows）向下走进元素
2. 目标阶段（Target phase）- 事件达到目标元素  
3. 冒泡阶段（Bubbling phase）- 事件从元素上开始冒泡    

v字模型，window在最高点，触发元素在最低点       
详见：https://www.w3.org/TR/DOM-Level-3-Events/#event-flow      

一般事件处理会选择冒泡模型，因为符合常识；

捕获阶段模型很少使用，可以通过以下方式在捕获阶段触发事件：
el.addEventListener(type,listener,true)
el.addEventListener(type,listener,{capture:true})

添加 DOM 节点事件主要有 3 种方法，比如添加 click 事件
方法3最强大最常用

1. el.onclick = function(){}
2. function a(){}
   el.setAttribute("onclick", "a()");
3. el.addEventListener     

### 网页禁止复制如何实现
不能完全防止复制，用户手机即可使用OCR      

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
取消默认操作，使用peventDefault   
比如点击a链接打开外部链接就是默认操作    

### sessionStorage,localStorage,cookie

使用sessionStorage和直接在window上挂载属性有何区别？   
页面刷新,sessionStorage属性还存在，window上属性刷新丢失    

# 伪类，伪元素

可以减轻维护成本。
数量众多，通常用于明确的目的。

伪类，以:开头,例如：    
:first-child    
:last-child    
:only-child    
:invalid    
:hover   
:focus   
伪元素，以::开头，例如：   
::first-line    
::first-letter    
::before    
::after    

::before和::after，可以和content属性一起使用，使用CSS将内容插入到文档中    

# CSS盒子模型
1. 标准盒子模型:
box-sizing:content-box;         
盒子总宽度 = width + padding + border + margin;盒子总高度 = height + padding + border + margin        
设置width,height不包括padding,border,margin    


2. IE盒子模型
box-sizing:border-box;   
盒子总宽度 = width + margin;盒子总高度 = height + margin;     
设置width,height包括padding,border     

# CSS生效是通过计算权重来实现的，权重最高就生效

1.Browser declarations  
2.User normal declarations  
3.Author normal declarations  
4.Author important declarations  
5.User important declarations  

a style  
b id attributes  
c other attributes  
d element names

# BFC
BFC就是页面一个独立容器的规则，里面的子元素不影响外面的元素    
可用来解决margin重叠等问题     
如何添加BFC:   
1. 设置overflow为auto,scroll,hidden
2. 设置float为left,right
3. 设置display为flex,inline-block,grid
4. 设置position为absolute,fixed   

# DP，DIP，PPI，DPR
DP:物理像素，代表屏幕上面有多少个物理点，物理级别概念，单位pt    
DIP:逻辑像素，操作系统级概念，单位px，Retina高清屏幕1个px可对应2个或者3个pt       
DPR:设备像素比，dp/dip，window.devicePixelRatio可获取DPR               
PPI:屏幕像素密度，每英寸有多少个物理像素，PPI越高屏幕越清晰    

```js
// 获取设备PPI,in表示英寸
// 获取设备的像素比
const devicePixelRatio = window.devicePixelRatio || 1;

// 创建一个测试元素
const testElem = document.createElement('div');
testElem.style.width = '1in';

// 插入测试元素
const body = document.getElementsByTagName('body')[0];
body.appendChild(testElem);

// 测试元素在屏幕上所占像素
const pixels = testElem.offsetWidth;

// 将测试元素从 DOM 中移除
body.removeChild(testElem);

// 计算原始像素密度
const actualPixelDensity = pixels * devicePixelRatio;

console.log(`准确的原始像素密度为：${actualPixelDensity} PPI`);

```

# 页面生命周期
1.DOMContentLoaded  
浏览器已完全加载HTML,并构建了DOM树，但像<img>和样式表之类的外部资源可能尚未加载完成  
DOM已经加载完毕，应用程序可查找DOM节点，并初始化接口（SPA无法查找，因为此时SPA只有一个ID为root的div元素）  

2.load  
浏览器不仅加载完成了HTML,还加载完成了所有外部资源：图片，样式等  
外部资源已加载完成，样式已被应用，图片大小也已知了  

3.beforeunloaded  
用户正在离开  
我们可以检查用户是否保存了更改，并询问他是否真的要离开  

4.unload  
用户几乎已经离开  
我们仍然可以启动一些操作，例如发送统计数据  

# 页面性能分析
Lighthouse工具分析   
重要指标：   
   1.FCP(First Contentful Paint):页面首次绘制文本，图片的时间   
   2.TTI(Time to Interactive):页面首次可交互可流程的交互时间   

# H5 performance
通过浏览器performance信息获取页面完整加载的时间信息   
浏览器从卸载旧页面开始，到新页面加载完成，整个过程一共被分为九个小块：    
   1.提示卸载旧文档/卸载       
   2.重定向    
   3.应用缓存   
   4.DNS解析   
   5.TCP握手    
   6.HTTP请求处理    
   7.HTTP响应处理   
   8.DOM处理   
   9.文档装载完成    

# css,js加载顺序

1.外联和内联的css是所有渲染的前提条件，因为  
dom tree->cssom tree->layout->paint  
js可以通过domcument.styleSheets拿到css数据，所以css一定在js之前解析执行完毕  

2.js内联及不带属性的外联会中断解析渲染，立即下载执行  
带defer属性的会异步有序执行，不会阻止HTML解析，会在DOMContentLoaded事件前执行  
带async属性的会异步无序执行，    


# preload prefetch
preload用于在页面加载期间提前下载需要渲染的关键资源   
prefetch用于加载用户可能下次需要的资源，但不影响当前页面，为了优化后续用户体验     


### V8引擎内存管理 
分为2个部分，Heap和stack     

Heap:        
堆内存，存储对象和动态数据的地方,其中GC也发生在这里         
Heap主要构成：     
1.new space    
2.old space    
3.large object space    
4.code space:这是即时编译器(JIT)存储已经编译的代码块的地方         
5.cell space,property cell space,map space    

每个空间（除了large object space）都由一组Page组成，一个Page是由操作系统分配的一个连续内存块，大小为1MB    



Stack:
栈内存，存放静态数据，如框架函数，原型对象的值，执行栈指针     
Stack内存由操作系统进行管理，不是由V8进行管理          


### V8 GC
将对象分别放置于新生代（短命），老生代（长命），对不同区域采取不同算法        

对新生代采用置换算法(Minor GC)(Scavenger)    
1.将堆空间内存分成大小相同的2块，同时只有1块在使用中    
2.使用中的为from空间，未使用的为to空间    
3.当from空间堆满时执行Minor GC，将from标记正在使用的变量，并将其复制移动到to，from空间释放变为to，原to变为from    

对老生代(Major GC)
1.标记(Marking):标识哪些对象为活的，可通过Stack指针进行递归遍历，可访问的对象为活的     
2.清扫(Sweeping):遍历Heap,将所有未被标记为活的对象进行内存地址释放    
3.压缩(Conpacting):将不连续存活的内存地址对象移动到一起，减少内存碎片，提高性能      

引用类型在没有引用之后，通过V8的GC自动回收    
值类型如果是处于闭包的情况下，要等闭包没有引用才会被GC回收，非闭包的情况下等待V8的新生代(new space)切换的时候回收   

新生代内存最大值在64位和32位系统上分别是32MB和16MB    
老生代内存随系统内存可调整，对于4GB以上内存系统来说老生代大小约1GB      


### JIT
Just-In-Time编译，提升js代码的执行效率    

1. 在代码加载和解释阶段开始收集Profile
2. 在解释阶段结束后，分析Profile选择需要优化的热点代码
3. 对热点代码进行JIT编译优化，生产本地代码替换原字节码执行    






