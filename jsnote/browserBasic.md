# DOM
Document Object Modal,文档对象模型      
DOM代表操作页面接口，接口以便js程序可以改变文档的结构，风格和内容         
DOM模型用逻辑树来表示一个文档，树的每一个分支终点都是一个节点node     

## EventTarget Node Element

Element->Node->EventTarget    
     
Node继承至其祖先EventTarget,Element继承至其祖先Node       
平时使用html上的元素，即Element，是类型为ELEMENT_NODE的Node     

## EventTarget
EventTarget是一个接口，它提供了一个标准的方法来处理事件     
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
Node是DOM中所有节点的基类接口，包括元素节点属性节点文本节点等     
它提供了节点树结构相关的属性和方法，如parentNode,childNode,nextSibling,previousSibling等      
Node继承自EventTarget,它意味着所有节点都可以接受事件       


## Element
Element是Node的一个子接口，它代表着DOM中的一个元素节点，例如<div>,<span>,<input>等      
它提供了HTML元素相关的属性和方法，如id,className,tagName,getAttribute,setAttribute等      
Element也继承自EventTarget，因此元素节点同样可以接收事件     
 


# 捕获，冒泡

DOM 事件标准描述了事件传播的 3 个阶段：

1. 捕获阶段（Capturing phase）- 事件（从 window.document）向下走进元素
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
:hover   
:focus   
伪元素，以::开头，例如：   
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

1.Browser normal declarations  
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


# 页面生命周期
1.DOMContentLoaded  
浏览器已完全加载HTML,并构建了DOM树，但像<img>和样式表之类的外部资源可能尚未加载完成  
DOM已经加载完毕，应用程序可查找DOM节点，并初始化接口（SPA无法查找，因为此时SPA只有一个ID为root的div元素）    
在此阶段，浏览器渲染树Render Tree尚未构建完成

2.load  
浏览器不仅加载完成了HTML,还加载完成了所有外部资源：图片，样式等  
外部资源已加载完成，样式已被应用，图片大小也已知了  
在此阶段，浏览器渲染树Render Tree构建完成


3.beforeunloaded  
用户正在离开  
我们可以检查用户是否保存了更改，并询问他是否真的要离开  

4.unload  
用户几乎已经离开  
我们仍然可以启动一些操作，例如发送统计数据  

# 浏览器渲染树构建
1. 构建DOM树：解析HTML,创建DOM节点      
2. 构建CSSOM树：CSS Object Tree   
3. 构建渲染树:Render Tree包含了DOM节点的样式和布局信息
4. 布局（Layout）：浏览器根据渲染树计算每个节点的几何形象，如位置和大小
5. 绘制（Painting）：浏览器根据布局信息在屏幕上绘制节点    

# css,js加载顺序

1.css外部样式无法使用异步加载逻辑，外联和内联的css是所有渲染的前提条件，css同步加载可避免页面样式闪烁           
DOM Tree->CSSOM Tree->Render Tree->Layout->Paint      
js可以通过domcument.styleSheets拿到css数据，所以css最好在js之前解析执行完毕k     

2.js内联及不带属性的外联加载会中断解析渲染，立即下载执行  
script带defer属性的会异步有序加载，不会阻止HTML解析，会在DOMContentLoaded事件完成加载和执行（执行的时候会保证DOM树已构建）             
script带async属性的会异步无序加载    


# 页面性能分析
Lighthouse工具分析   
重要指标：   
   1. FCP(First Contentful Paint):页面首次内容绘制时间   
   2. TTI(Time to Interactive):页面首次可交互可流程的交互时间   
   3. LCP(Largest Contentful Paint):最大内容绘制   
   4. FID(First Input Delay):首次输入延迟    

# H5 performance
通过浏览器performance信息获取页面完整加载的时间信息   
浏览器从卸载旧页面开始，到新页面加载完成，整个过程一共被分为10个小块：    
   1. 导航
   2. 卸载旧文档       
   3. 重定向    
   4. 应用缓存   
   5. DNS解析   
   6. TCP连接    
   7. HTTP请求处理    
   8. HTTP响应处理   
   9. DOM处理   
   10. 文档装载完成    


# preload prefetch
link标签可以使用preload prefetch      
preload：立即加载需要渲染的关键资源   
prefetch：浏览器空闲时加载资源，但不影响当前页面，为了优化后续用户体验      
preload和prefetch仅仅是加载，不会执行，所以不会阻塞渲染        


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
Just-In-Time编译，通过将字节码编译成机器码，提升js代码的执行效率    

1. 代码收集：识别频繁执行的热点代码并收集
2. 代码优化：通过内联函数，死区代码消除，循环展开等技术优化代码
3. 代码生成：将优化后的字节码编译成机器码，并存入缓存
4. 代码执行：执行引擎执行机器码    

字节码是AST对象转换的指令集合，是实现JS引擎多平台支持的核心       


### 虚拟列表滚动
长列表优化常用的方法主要是虚拟列表滚动   
虚拟列表的原理是类似Fiber架构，分为计算树和显示树，通过计算树计算实现渲染规定区域的列表项。减少DOM操作和内存消耗，从而提高滚动性能和用户体验    
实现步骤：
1. 确定渲染窗口大小  
2. 通过用户滚动高度计算可见区域第一项及最后一项数据的startIndex,endIndex  
3. 获取第一项及最后一项数据遮罩层的startOffset及endOffset，通过设置transform的translateY实现部分内容遮挡效果     


### PWA
渐进式应用
必须包含以下内容：
1. Service Worker:独立线程，提供缓存控制及自定义响应功能
2. Web Manifest:添加至桌面功能
3. HTTPS:保证通讯安全

#### service worker







