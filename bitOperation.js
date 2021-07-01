//输入一个整数，输出这个整数二进制中表示1的个数
//例如，9的二进制是1001，因此，输入9则输出2
//暴力破解，直接成2进制数，即可得结果(除 2 取余，逆序排列)
function countOne(n) {
  let j = n,
    r = 0,
    s = "";
  while (j > 0) {
    if (j > 2) {
      let re = j % 2;
      if (re == 1) {
        r++;
      }
      s = `${re}${s}`;
      j = (j - (j % 2)) / 2;
    } else {
      if (j == 2) {
        s = `10${s}`;
      } else {
        s = `1${s}`;
      }
      r++;
      j = 0;
    }
  }
  console.log(`s=${s}`);
  console.log(`r=${r}`);
}

//利用位运算
function simpleOne(n) {
  let r = 0;
  while (n) {
    if (n & 1) {
      r++;
    }
    n = n >> 1;
    // n = (n - (n % 2)) / 2;
  }
  console.log(r);
}

countOne(222319);
simpleOne(222319);
