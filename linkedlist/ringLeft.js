//1,...,n这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。
//约瑟夫环变种

function getArray(n) {
  let array = [];
  while (n) {
    array.unshift(n);
    n--;
  }
  return array;
}

function deleteArray(n, m) {
  let ring = getArray(n);
  let index = 0;
  while (ring.length >= m) {
    deleteIndex = index + m - 1;
    if (deleteIndex > ring.length - 1) {
      deleteIndex = deleteIndex - ring.length;
    }
    index = deleteIndex;
    let deleteItem = ring.splice(deleteIndex, 1);

    console.log(`deleteItem=${deleteItem}`);
  }
  return ring;
}

let left = deleteArray(41, 3);
console.log(left);
