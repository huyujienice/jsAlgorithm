# EventTarget Node Element

Node继承至其祖先EventTarget,Element继承至其祖先Node
平时使用html上的元素，即Element，是类型为ELEMENT_NODE的Node

## EventTarget
EventTarget.addEventListener() 在EventTarget上注册特定事件类型的事件处理程序
EventTarget.removeEventListener() 在EventTarget中删除事件侦听器
EventTarget.dispatchEvent() 将事件分派到此EventTarget
可参考创建和触发events:
https://developer.mozilla.org/zh-CN/docs/Web/Events/Creating_and_triggering_events

## Node
Node.baseURI
Node.baseURIOjbect
Node.childNodes 返回一个包含了该节点所有子节点的实时的NodeList。NodeList是动态变化的
Node.firstChild 返回该节点的第一个子节点Node,如果该节点没有子节点则返回null
Node.isConnected 
Node.lastChild 返回该节点的最后一个子节点Node，如果该节点没有子节点则返回null
Node.nextSibling 返回与该节点同级的下一个节点Node，如果没有则返回null
Node.nodeName
Node.nodeType ELEMENT_NODE -> 1 TEXT_NODE -> 3
Node.nodeValue
Node.ownerDocument
Node.parentNode 返回一个当前节点Node的父节点。如果没有这样的节点，比如说像这个节点是树结构的顶端或者没有插入一棵树中，这个属性返回null
Node.parentElement 返回一个当前节点的父节点Element。如果当前节点没有父节点或者说父节点不是一个元素（Element），这个属性返回null
Node.previousSibling 返回一个当前节点同辈的前一个节点Node，或者返回null（如果不存在这么一个节点的话）
Node.textContent 返回或设置一个元素内所有子节点及其后代的文本内容

Node.appendChild() 将指定的childNode参数作为最后一个子元素添加到当前节点。如果参数引用了DOM树上的现有节点，则节点将从当前位置分离，并附加到新位置
Node.cloneNode() 克隆一个Node，并且可以选择是否克隆这个节点下的所有内容。默认情况下，节点下的内容会被克隆
Node.compareDocumentPosition() 比较当前节点与文档中的另一个节点的位置
Node.contains() 返回一个Boolean布尔值，来表示传入的节点是否为改节点的后代节点
Node.getRootNode() 
Node.hasChildNodes() 返回一个Boolean布尔值，来表示该元素是否包含有子节点
Node.insertBefore() 在当前节点下新增一个子节点Node，并使该节点位于参考节点的前面
Node.isDefaultNamespace()
Node.isEqualNode()
Node.isSameNode()
Node.lookupPrefix()
Node.lookupNamespaceURI()
Node.normalize()
Node.removeChild() 移除当前节点的一个子节点。这个子节点必须存在于当前节点中
Node.replaceChild()

## Element
Element.attributes 返回一个与该元素相关的所有属性集合NamedNodeMap
Element.classList 返回该元素包含的class属性
Element.className
Element.clientHeight
Element.clientLeft
Element.clientTop
Element.clientWidth
Element.computedName
Element.computedRole
Element.id
Element.innerHTML
Element.localName
Element.namespaceURI
NonDocumentTypeChildNode.nextElementSibling 是一个Element，该元素下一个兄弟节点，如果为null表示不存在
Element.outerHTML
Element.prefix
NonDocumentTypeChildNode.previousElementSibling 是一个Element，该元素上一个兄弟节点，如果为null表示不存在
Element.scrollHeight 返回类型为：Number，表示元素的滚动视图高度
Element.scrollLeft
Element.scrollLeftMax
Element.scrollTop 返回类型为：Number，表示该元素纵向滚动距离
Element.scrollTopMax
Element.scrollWidth
Element.shadowRoot
Element.openOrClosedShadowRoot
Element.slot
Element.tabStop
Element.tagName
Element.undoManager
Element.undoScope

Element.attachShadow()
Element.animate()
Element.closest()
Element.createShadowRoot()
Element.computedStyleMap()
Element.getAnimations()
Element.getAttribute()
Element.getAttributeNames()
Element.getAttributeNS()
Element.getBoundingClientRect() 返回元素的大小及其相对与视口的位置
Element.getClientRects()
Element.getElementsByClassName()
Element.getElementsByTagName()
Element.getElementsByTagNameNS()
Element.hasAttribute()
Element.hasAttributeNS()
Element.hasAttributes()
Element.hasPointerCapture()
Element.insertAdjacentElement()
Element.insertAdjacentHTML()
Element.insertAdjacentText()
Element.matches()
Element.pseudo()
Element.querySelector()
Element.querySelectorAll()
Element.releasePointerCapture()
Element.removeAttribute()
Element.removeAttributeNS()
Element.requestFullscreen()
Element.requestPointerLock()
Element.scroll()
Element.scrollBy()
Element.scrollIntoView()
Element.scrollTo()
Element.setAttribute()
Element.setAttributeNS()
Element.setCapture()
Element.setPointerCapture()
Element.toggleAttribute()

# 捕获，冒泡

DOM 事件标准描述了事件传播的 3 个阶段：

1. 捕获阶段（Capturing phase）- 事件（从 windows）向下走进元素
2. 目标阶段（Target phase）- 事件达到目标元素
3. 冒泡阶段（Bubbling phase）- 事件从元素上开始冒泡

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