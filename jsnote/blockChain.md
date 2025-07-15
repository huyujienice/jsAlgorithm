# DeFi

# GameFi

# NFT

# DAO

# 底层基础建设
跨链,区块链存储,l2协议   



### 前端连接钱包

### 智能合约应用 

#### 发行合约升级

#### 应用合约

### eth二层网络或其他链sol
eth --> 智能合约 ---> 桥接 --> L2 -->合约--> user 1eth

### token解锁实现
1. 创建PDA token账户，创建PDA数据账户，记录解锁具体时间（Unix时间戳）等信息
2. 根据PDA数据账户记录的信息，到期了可以申请将PDA token账户内的token转移至associated token账户



## solana

### solana cli 发行token简易流程
1. `mkdir solana-token-v1`创建一个专门的文件夹管理keypair
2. `solana-keygen grind --starts-with <前缀>:<数量>`创建一个带前缀特征的keypair当token address，例如:mintM7b33tbFE8tMUnPAAzeyjTcFMHHtDtNpo53swni
3. `spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --decimals 6 mintM7b33tbFE8tMUnPAAzeyjTcFMHHtDtNpo53swni.json`通过Token-2022的标准创建精度为6的新的token，token名字就用刚刚生成的mintM7b33tbFE8tMUnPAAzeyjTcFMHHtDtNpo53swni
4. `spl-token create-account --owner CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV mintM7b33tbFE8tMUnPAAzeyjTcFMHHtDtNpo53swni --fee-payer /Users/clark/.config/solana/CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV.json`创建指定账户的ATA账户，例如：BmQ9Cqg3mL9CrBk8SGstN2Eb6FUFPvH3TUXGxrgwrHmY
5. `spl-token accounts --owner CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV`查看指定账户底下所有的token
6. `spl-token address --verbose --token mintM7b33tbFE8tMUnPAAzeyjTcFMHHtDtNpo53swni --owner CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV`查看特定token的ATA账户的地址
7. `spl-token mint mintM7b33tbFE8tMUnPAAzeyjTcFMHHtDtNpo53swni 1 BmQ9Cqg3mL9CrBk8SGstN2Eb6FUFPvH3TUXGxrgwrHmY`给ATA账户Mint一个单位的token，即0.000001 token
