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