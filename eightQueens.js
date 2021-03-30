//在 8×8 格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。
let result = [];
function judgeRepeat(arr, row, col) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][col] == 1) {
      return false;
    }
  }
  let l1 = row - 1;
  let c1 = col - 1;
  while (l1 > -1 && c1 > -1) {
    if (arr[l1][c1] == 1) {
      return false;
    }
    c1--;
    l1--;
  }
  let l2 = row - 1;
  let c2 = col + 1;
  while (l2 > -1 && c2 < arr.length) {
    if (arr[l2][c2] == 1) {
      return false;
    }
    l2--;
    c2++;
  }
  console.log(`${row}行${row}列可使用`);
  return true; //不重复
}
function findPosition(arr, row) {
  if (row === arr.length) {
    result.push(JSON.parse(JSON.stringify(arr)));
    return;
  }
  for (let col = 0; col < arr.length; col++) {
    if (judgeRepeat(arr, row, col)) {
      arr[row][col] = 1;
      findPosition(arr, row + 1);
      arr[row][col] = 0;
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

  findPosition(arr, 0);
}
eq(8);

console.log(`总共有${result.length}种解法`);


// class Queen {
//   constructor(num) {
//     this.num = num;
//     this.arr = [];
//     this.result = [];
//     this.initList();
//     this.buildList(this.arr, 0);
//   }

//   initList() {
//     let num = this.num;
//     for (let i = 0; i < num; i++) {
//       this.arr[i] = [];
//       for (let j = 0; j < num; j++) {
//         this.arr[i][j] = 0;
//       }
//     }
//     console.log(this.arr);
//   }

//   buildList(list, row) {
//     // 递归中止条件,找到一个解缓存起来
//     if (row === list.length) {
//       this.result.push(JSON.parse(JSON.stringify(list)));
//       return;
//     }
//     for (let col = 0, len = list.length; col < len; col++) {
//       if (this.isSafe(list, row, col)) {
//         list[row][col] = 1;
//         this.buildList(list, row + 1);
//         // 走到这里，说明该次递归已经结束，不管找没找到，都需要重置
//         list[row][col] = 0;
//       }
//     }
//   }

//   isSafe(list, row, col) {
//     const len = list.length;
//     // 同一列
//     for (let i = 0; i < len; i++) {
//       if (list[i][col] === 1) return false;
//     }
//     // 斜右上方
//     for (let i = row - 1, j = col + 1; i >= 0 && j < len; i--, j++) {
//       if (list[i][j] === 1) return false;
//     }
//     // 斜左上方
//     for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
//       if (list[i][j] === 1) return false;
//     }
//     return true;
//   }
// }
// const queen = new Queen(8);
// console.log(queen.result);
// console.log(`总共有${queen.result.length}种解法`);
