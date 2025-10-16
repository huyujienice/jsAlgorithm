# DeFi

# GameFi

# NFT

# DAO

# 底层基础建设

跨链,区块链存储,l2 协议

### 共识机制
1. POW，工作量证明，通过计算能力来竞争和验证区块，交易速度慢，成熟安全
2. POS，权益证明，根据节点持有的数字货币数量和时长来决定谁验证区块，交易速度快   

### 前端连接钱包

### 智能合约应用

#### 发行合约升级

#### 应用合约

### eth打包过程
1. 创建交易：由发动者创建并签名。包括from,to,amount,data等
2. 广播交易：交易需要广播到网络上的节点
3. 交易池：交易被广播后，进入待处理交易池等待打包
4. 打包交易：矿工选择交易并将其打包至新的区块中
5. 确认交易
   
### eth gas计算
使用EIP-1559的方案，分为基础费用(Base Fee)，优先费（Priority Fee/Tip），最大费用（Max Fee）    
总费用 = (基础费用+优先费) x Gas限制    
当总费用超过最大费用的时候，交易取消，gas需正常支付   


### eth 二层网络或其他链 sol

eth --> 智能合约 ---> 桥接 --> L2 -->合约--> user 1eth

### token 解锁实现

1. 创建 PDA token 账户，创建 PDA 数据账户，记录解锁具体时间（Unix 时间戳）等信息
2. 根据 PDA 数据账户记录的信息，到期了可以申请将 PDA token 账户内的 token 转移至 associated token 账户

## solana

### solana cli 发行 token 简易流程

1. `mkdir solana-token-v1`创建一个专门的文件夹管理 keypair
2. `solana-keygen grind --starts-with <前缀>:<数量>`创建一个带前缀特征的 keypair 当 token address，例如:mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5
3. `spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --decimals 6 --mint-authority mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5 mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5.json`通过 Token-2022 的标准创建精度为 6 的新的 token，token 名字就用刚刚生成的 mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5
4. `spl-token create-account --owner CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5 --fee-payer /Users/clark/.config/solana/CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV.json`创建指定账户的 ATA 账户，例如：6qt7e58xsY65YUvwC4bWpNs4TmRPoTUVSGn9qQ82dGq2
5. `spl-token accounts --owner CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV`查看指定账户底下所有的 token
6. `spl-token address --verbose --token mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5 --owner CLARKXjDhcpGMCN8gWBxkVFMKpLJga3fWud6Hfn6MjYV`查看特定 token 的 ATA 账户的地址
7. `spl-token mint --mint-authority /Users/clark/documents/keypair/solana-yhkd-token-v2/mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5.json mtnTbWa2mq6apvaxATWZfMNqF3FpDBRxaz4XyZkYdY5 1 6qt7e58xsY65YUvwC4bWpNs4TmRPoTUVSGn9qQ82dGq2`给 ATA 账户 Mint 一个单位的 token，即 0.000001 token


### anchor项目重新生成新的program id
1. 删除target文件夹
2. 运行`anchor build`,会重新生成target/deploy
3. 运行`anchor keys list`,会打印出新的program id
4. 更新项目内所有文件中硬编码的program id内容，如lib.rs
