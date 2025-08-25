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
