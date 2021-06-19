// 给你一根长度为n的绳子，请把绳子剪成m段（m,n都是整数，n>1并且m>1）,
// 每段绳子的长度记为k[0],k[1],...k[m]。请问k[0]*k[1]*...k[m]可能的最大乘积
// 是多少？例如，n为8，我们剪成2，3，3的三段，此时最大乘积是18。
// 边界 状态转移方程 最优子结构
// 2-1 3-2 4-4 5-6 6-9 7-9 8-18
//  此问题未解决
let result = [];
function max(n) {
  if (n < 3) return 1;
  if (n == 3) return 2;
  let m = 0;
  for (let i = 1; i < n; i++) {
    let r = i * (n - i);
    if (r > m) {
      m = r;
    }
  }
  return m;
}
console.log(`max(10)=${max(10)}`);
