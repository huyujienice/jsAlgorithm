//回溯法解决路径问题
//请设计个函数，用来判断在知阵中是否存在一条包含某 字符串所有字符的路径。路径可以从矩阵中的任意一格开始，
//每一步可以 在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格， 那么该路径不能再次进入该格子。
//例如在卜而的3 x4的矩阵中包含一条 字符串"bfec”的路径
//但矩阵中不包含字 符串"abtb”的路径．因为字符串的第一个字符b占据I矩阵中的第一行第 二个格1-之后，路径不徒再次迸入这个格子。
const testArr = [
  ["a", "b", "t", "g"],
  ["c", "f", "c", "s"],
  ["j", "d", "e", "h"],
];
const testString = "bfce";
function judgeString(arr, str) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == str.chatAt(0)) {
        startFind(arr, str, i, j, results);
      }
    }
  }
}
function startFind(arr, str, i, j, results) {
  let mapArr = [];
  arr.forEach((it) => {
    let r = [];
    for (let i = 0; i < it.length; i++) {
      r.push("0");
    }
    mapArr.push(r);
  });
  let mapStr = str.slice(1).split("");
}

judgeString(testArr, testString);
