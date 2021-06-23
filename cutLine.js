// 给你一根长度为n的绳子，请把绳子剪成m段（m,n都是整数，n>1并且m>1）,
// 每段绳子的长度记为k[0],k[1],...k[m]。请问k[0]*k[1]*...k[m]可能的最大乘积
// 是多少？例如，n为8，我们剪成2，3，3的三段，此时最大乘积是18。
// 边界 状态转移方程 最优子结构
// 边界是4，状态转移方程是f(n) = max(f(i)*f(n-i))
// 2-1 3-2 4-4 5-6 6-9 7-12 8-18
//  此问题需要强行记忆
function max(n) {
  if (n < 3) return 1;
  if (n == 3) return 2;
  let arr = [1, 1, 2, 3]; //计算方程，第i项表示长度为i的绳子的最大乘积
  for (let i = 4; i < n + 1; i++) {
    let m = 0;
    for (let j = 1; j < i; j++) {
      let r = arr[j] * arr[i - j];
      if (r > m) {
        m = r;
      }
    }
    arr[i] = m;
  }
  console.log(arr[arr.length - 1]);
}

//贪心算法
function simpleMax(n) {
  if (n < 3) return 1;
  if (n == 3) return 2;
  let n1 = (n - (n % 3)) / 3 - 1;
  let n2 = n1;
  let r1 = 3;
  while (n2 > 1) {
    r1 = 3 * r1;
    n2--;
  }
  let l1 = n - n1 * 3;
  let r2 = 0;
  switch (l1) {
    case 6:
      r2 = 9;
      break;
    case 5:
      r2 = 6;
      break;
    case 4:
      r2 = 4;
      break;
    case 3:
      r2 = 3;
      break;
    case 2:
      r2 = 2;
      break;
    case 1:
      r2 = 1;
      break;
  }
  let result = r1 * r2;
  console.log(result);
}

max(22);
simpleMax(22);
