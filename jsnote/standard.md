# git工作流  

功能驱动开发(Feature-driven development,FDD)   
需求是开发的起点，现有需求再有功能分支(feature branch)或者补丁分支(hotfix branch),开发完毕后，该分支合并到主分支    

## github flow    
1.根据需求，从master拉出新分支    
2.新分支开发完毕，或者需要讨论，向master发起一个push request(PR)    
3.PR是一个通知也是个对话，大家一起评审和讨论代码    
4.PR被接受，合并至master    

## Issue
Issue用于bug追踪和需求管理   

## merge rebase
merge是合并的意思，merge操作会生成一个新的节点，之前提交分开显示     
rebase是复位基底的意思，rebasse操作不会生成新的节点，而是将两个分支融合成一个线性的操作   


# 正向代理，反向代理
正向代理，比如客户端代理VPN
反向代理，比如服务端代理nginx

# 内网穿透
内网的数据映射到公共网络上，即公共网络可以直接访问内网数据   
可以使用ngrok,蒲公英等实现    


# 版本号   
npm版本号X.Y.Z    
X主版本号，升级表示无法与低版本做兼容     
Y次版本号，做了向下兼容的功能性新增时升级    
Z修订号，做了向下兼容的问题修正（bugfix）时升级     

先行版本   
alpha:预览版，内部测试版    
beta:测试版，公开测试版      
rc(release candidate):最终测试版    

npm的tag   
发布定义好dist-tag来实现线上内测，控制用户下载       
latest:最后稳定版本，npm install时就是下载这个    
beta:测试版本，需要指定版本或使用 npm install packageName@beta 来下载    
next:先行版本,下个版本，使用 npm install packageName@next 安装       

npm发布现行版流程   
本地更改版本是通过npm version命令更改，远程发布是通过dist-tag控制版本       

假设本地分支1.0.0       
1.拉出开发分支,更改本地version,执行 npm version preminor --preid=beta,将本地版本号更改为1.1.0-beta.0        
2.如果后续要提升本地版本,执行 npm version prerelease         
3.如果需要发版公测版本，使用dist-tag来标记公测版本语义化tag，假设公测版本为beta.1.1.0，执行 npm publish --tag beta.1.1.0 进行发布,用户执行 npm install packageName@beta.1.1.0 进行安装       
4.公测版本可推最后稳定版本,执行npm version minor更新本地版本号，执行npm publish发布latest发布最后稳定版本   
      


