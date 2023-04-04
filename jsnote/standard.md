# git工作流  

功能驱动开发(Feature-driven development,FDD)   
需求是开发的起点，现有需求再有功能分支(feature branch)或者补丁分支(hotfix branch),开发完毕后，该分支合并到主分支    

## github flow    
1.根据需求，从master拉出新分支    
2.新分支开发完毕，或者需要讨论，向master发起一个pull request(PR)    
3.PR是一个通知也是个对话，大家一起评审和讨论代码    
4.PR被接受，合并至master    

## Issue
Issue用于bug追踪和需求管理   

## merge rebase
merge是合并的意思，merge操作会生成一个新的节点，之前提交分开显示     
rebase是复位基底的意思，rebasse操作不会生成新的节点，而是将两个分支融合成一个线性的操作   


# 正向代理，反向代理
正向代理，比如客户端代理VPN
方向代理，比如服务端代理nginx

# 内网穿透
内网的数据映射到公共网络上，即公共网络可以直接访问内网数据   
可以使用ngrok,蒲公英等实现    
