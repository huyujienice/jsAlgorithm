function jsR(n, k, m) {
  //n人k开始m出圈
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i + 1);
  }
  let left = n;
  let start = k-1;
  while (left > 1) {
    let judge = start + m - 1;
    let len = arr.length;
    if (judge >= len) {
      judge = judge % len;
    }
    start = judge;
    let dele = arr.splice(judge, 1);
    // console.log(`delete ${dele}`);
    // console.log(arr);
    left--;
  }
  console.log(`alone ${arr[0]}`)
}

console.time("countTime");
jsR(10000, 1, 3);
console.timeEnd("countTime");
