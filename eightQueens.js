//在 8×8 格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。
let result = [];
function judgeRepeat(arr, l, c) {
  console.log(`arr=${JSON.stringify(arr)}`);
  console.log(`l=${l}`);
  for (let i = 0; i < arr.length; i++) {
    console.log(`arr[l]=${arr[l]}`);
    if (arr[l][i] == 1) {
      return true;
    }
    if (arr[i][c] == 1) {
      return true;
    }
  }
  let l1 = l;
  let c1 = c;
  while (l1 > -1 && c1 > -1) {
    if (arr[l1][c1] == 1) {
      return true;
    }
    c1--;
    l1--;
  }
  let l2 = l;
  let c2 = c;
  while (l2 < arr.length && c2 < arr.length) {
    if (arr[l2][c2] == 1) {
      return true;
    }
    l2++;
    c2++;
  }
  console.log(`${l}行${c}列可使用`);
  return false; //不重复
}
function findPosition(arr, l) {
  if (l >= arr.length) {
    return;
  }
  if (l == arr.length) {
    result.push(JSON.parse(JSON.stringify(arr)));
  }
  for (let c = 0; c < arr.length; c++) {
    if (!judgeRepeat(arr, l, c)) {
      arr[l][c] = 1;
      findPosition(arr, l + 1);
      arr[l][c] = 0;
    }
  }
}
function eq(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = [];
    for (let j = 0; j < n; j++) {
      arr[i][j] = 0;
    }
  }

  for (let l = 0; l < n; l++) {
    findPosition(arr, l);
  }
}
eq(8);

console.log(`总共有${result.length}种解法`);
