//地上有个m行n列的方格。一个机器人从坐标（0，0）的格子开始移动，它每次可以向左，右，上，下移动一格，
//但不能进入行坐标和列坐标的数位之和大于k的格子，例如，当k为18时，机器人能够进入方格（35，37），因为
//3+5+3+7=18，但它不能进入方格(35,38)，因为3+5+3+8=19，请问机器人能够到达多少个格子？

let arrs = [];
function countSum(n) {
  let r = 0;
  const arr = n.toString();
  for (let i = 0; i < arr.length; i++) {
    r = r + parseInt(arr[i]);
  }
  return r;
}
//此方法算法有误，待检查
function bitSum(n) {
  let r = 0;
  while (n) {
    r = r + (n % 10);
    n = Math.floor(n % 10);
  }
  console.log(`r=${r}`);
  return r;
}
function judgeEnter(k, n, m, l = 0, c = 0) {
  if (l > m || l < 0) return false;
  if (c > n || c < 0) return false;
  if (countSum(l) + countSum(c) > k) return false;
  if (
    arrs.find((it) => {
      return it[0] == l && it[1] == c;
    })
  )
    return false;
  // console.log(`l=${l}`);
  // console.log(`c=${c}`);
  arrs.push([l, c]);
  judgeEnter(k, n, m, l + 1, c);
  judgeEnter(k, n, m, l - 1, c);
  judgeEnter(k, n, m, l, c + 1);
  judgeEnter(k, n, m, l, c - 1);
}

judgeEnter(10, 0, 99);
console.log(arrs);
console.log(arrs.length);
