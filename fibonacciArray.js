// 兔子数列
// F(0)=0，F(1)=1, F(n)=F(n-1)+F(n-2)
//最简单最原始最低耗时最多的递归算法
function fbac(n) {
  if (n < 2) {
    return n;
  }
  return fbac(n - 1) + fbac(n - 2);
}

//循环改造算法
function fbac1(n) {
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

console.log(fbac(30));
console.log(fbac1(30));
