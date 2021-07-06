//输入数字n,按顺序打印出1到最大的n位十进制数。比如输入3，则打印出1，2，3一直到最大的3位数999
//考虑边界条件，模拟加法
function logNumber(n) {
  let max = "";
  while (n > 0) {
    max = max + "9";
    n--;
  }
  let count = "0";
  while (count !== max) {
    let judge = parseInt(count[count.length - 1]) + 1;
    if (judge == 10) {
      let p = count.length - 1;
      while (count[p] == 9) {
        p--;
      }
      if (p == -1) {
        let n = count.length;
        count = "1";
        while (n > 0) {
          count = count + "0";
          n--;
        }
      } else {
        let arr = count.split("");
        for (let i = 0; i < arr.length; i++) {
          if (i == p) {
            arr[i] = String(parseInt(arr[i]) + 1);
          }
          if (i > p) {
            arr[i] = 0;
          }
        }
        count = arr.join("");
      }
    } else {
      if (count.length == 1) {
        count = String(judge);
      } else {
        count = count.slice(0, count.length - 1) + String(judge);
      }
    }
    console.log(count);
  }
}

logNumber(4);
