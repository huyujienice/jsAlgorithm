// 一只青蛙能够跳1级台阶，也能跳2级台阶，求青蛙跳上N级台阶总共有几种跳法
//次数规律符合斐波那契数列算法
function jump(n) {
  if (n < 2) {
    return n;
  }
  let r1 = 0;
  let r2 = 1;
  for (let i = 1; i < n; i++) {
    let mid = r1 + r2;
    r1 = r2;
    r2 = mid;
  }
  return r2;
}

console.log(jump(30));
