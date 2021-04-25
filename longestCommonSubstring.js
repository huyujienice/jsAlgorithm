//寻找2个字符串的最长公共子串
//动态规划
// 1、把两个字符串分别以行和列组成一个二维矩阵。
// 2、比较二维矩阵中每个点对应行列字符中否相等，相等的话值设置为1，否则设置为0。
// 3、通过查找出值为1的最长对角线就能找到最长公共子串。
function findDynamic(st1, st2) {
  let r = [];
  let mid = 0;
  let rs = "";
  for (let i = 0; i < st1.length; i++) {
    r[i] = [];
    let mid = 0;
    let rs = "";
    for (let j = 0; j < st2.length; j++) {
      if (st1[i] == st2[j]) {
        if (i > 1 && j > 1 && r[i - 1][j - 1]) {
          r[i][j] = 1 + r[i - 1][j - 1];
        } else {
          r[i][j] = 1;
        }
      } else {
        r[i][j] = 0;
      }
    }
    console.log(`${r[i]}`);
  }

  return r;
}

//最简单暴力破解
function find(st1, st2) {
  let s1 = st1.length > st2.length ? st2 : st1;
  let result = "";
  for (let i = 0; i < s1.length; i++) {
    let j = i + 1;
    while (j < s1.length) {
      let it = s1.slice(i, j);
      if (hasItem(it, st1, st2)) {
        if (it.length > result.length) {
          result = it;
        }
        j++;
      } else {
        j = s1.length;
      }
    }
  }
  console.log(`result=${result}`);
  return result;
}

function hasItem(st, st1, st2) {
  let r1 = false,
    r2 = false;
  if (st1.includes(st)) {
    r1 = true;
  }
  if (st2.includes(st)) {
    r2 = true;
  }
  return r1 && r2;
}

// find("acbcbcef", "abcbced");
findDynamic("acbcbcef", "abcbced");
