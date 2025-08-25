### 折现率

核心概念，用来将未来预期的现金流价值“折现”到现在，从而评估一项投资或资产的当前价值  
折现率就是“未来的钱，现在值多少”的换算比例
预估当前价值的方法：

```rust
fn calculate_present_value(principal: f64, discount_rate: f64, time_period: u32) -> f64 {
    // principal 未来值多少钱
    // discount_rate 折现率
    // time_period 时间期限
    principal / (1.0 + discount_rate).powi(time_period as i32)
}
```

### 期权合约

期权合约（Options Contract），它赋予持有者在未来一段时间，以约定的价格买入或者卖出某项资产的权利，但没有义务  
期权 = 一份“未来的选择权”——你可以选择买/卖，也可以选择不买/不卖

1. 看涨期权（Call Option）
2. 看跌期权（Put Option）

举例：

-   你花 2 元买了一份腾讯股票的看涨期权：
    -   行权价：300 元
    -   到期日：1 个月后
        -   如果 1 个月后腾讯股价涨到 350 元：
            -   你可以用 300 元买入，立刻以 350 元卖出，每股赚 48 元（减去 2 元权利金）；
        -   如果股价跌到 280 元：
            -   你可以选择不行权，只损失 2 元权利金。
