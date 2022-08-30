//快速排序
//分区思想

//选择一个基准值，小于基准值的放基准值左边，大于基准值放基准值右边

const array = [1, 9, 8, 3, 6, 4, 9, 9, 2, 0, 12, 10, 2, 87, 3, 6, 1];

//基本快排，填坑法
//https://segmentfault.com/a/1190000004410119
const quickSortV1 = function (arr, l, r) {
  if (l === undefined) l = 0;
  if (r === undefined) r = arr.length - 1;
  if (l >= r) return;
  let x = l,
    y = r,
    base = arr[x];
  while (x < y) {
    while (x < y && arr[y] >= base) y--;
    if (x < y) arr[x++] = arr[y];
    while (x < y && arr[x] < base) x++;
    if (x < y) arr[y--] = arr[x];
  }
  arr[x] = base;
  quickSortV1(arr, l, x - 1);
  quickSortV1(arr, x + 1, r);
  return arr;
};

const r = quickSortV1(array);
console.log(r);
