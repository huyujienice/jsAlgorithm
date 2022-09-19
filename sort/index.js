//归并排序
//分治思想
//2个有序数组合并成1个有序数组（核心思想）
//temp可以使用外部存储空间，如文件系统

//todo
//leetcode 剑指offer 51
//leetcode 23 done
//leetcode 148 done
//leetcode 1305 done
//leetcode 327
//leetcode 315
//leetcode 53 done
//leetcode 1508 done
//leetcode 面试题04.08
//leetcode 1302
const mergeSortV1 = function (arr, l, r) {
  if (l >= r) return arr;
  const mid = Math.floor((r + l) / 2);
  mergeSortV1(arr, l, mid);
  mergeSortV1(arr, mid + 1, r);
  let temp = [],
    p1 = l,
    p2 = mid + 1;
  while (p1 <= mid || p2 <= r) {
    if ((p1 <= mid && arr[p1] < arr[p2]) || p2 > r) {
      temp.push(arr[p1++]);
    } else {
      temp.push(arr[p2++]);
    }
  }
  for (let i = l; i <= r; i++) {
    arr[i] = temp[i - l];
  }
  return arr;
};

//快速排序
//分区思想
//选择一个基准值，小于基准值的放基准值左边，大于基准值放基准值右边

//leetcode 912 done
//leetcode 面试题17.14 done
//leetcode 148 done
//leetcode 剑指Offer 21 done
//leetcode 75 done
//TODO
//leetcode 95 check 递归法?
//leetcode 394 done
//leetcode 11 done
//TODO
//leetcode 470
//leetcode 239 done

const array = [1, 9, 8, 3, 6, 4, 9, 9, 2, 0, 12, 10, 2, 87, 3, 6, 1];

//最简单写法的快排，快速易懂，但是有额外的损耗
const simpleQuickSort = function (arr) {
  if (arr.length <= 1) return arr;
  const left = [],
    right = [],
    base = arr[0],
    arrs = arr.slice(1);

  for (let i = 0; i < arrs.length; i++) {
    if (arrs[i] >= base) {
      right.push(arrs[i]);
    } else {
      left.push(arrs[i]);
    }
  }
  return simpleQuickSort(left).concat([base], simpleQuickSort(right));
};

//基本快排，填坑法
//https://segmentfault.com/a/1190000004410119
const quickSortV1 = function (arr, l, r) {
  if (l === undefined) l = 0;
  if (r === undefined) r = arr.length - 1;
  if (l >= r) return arr;
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

//左递归法
const quickSortV2 = function (arr, l, r) {
  if (l === undefined) l = 0;
  if (r === undefined) r = arr.length - 1;
  if (l >= r) return arr;

  while (l < r) {
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
    quickSortV2(arr, x + 1, r);
    r = x - 1;
  }

  return arr;
};

//3点取中法,leetcode刷题实测执行速度比V1,V2缩短近一倍
const swap = function (arr, i, j) {
  const m = arr[i];
  arr[i] = arr[j];
  arr[j] = m;
};
const getMid = function (arr, l, r) {
  const m = Math.floor((r + l) / 2);
  if (arr[l] > arr[r]) swap(arr, l, r);
  if (arr[m] > arr[r]) swap(arr, m, r);
  if (arr[l] < arr[m]) swap(arr, l, m);
};
const quickSortV3 = function (arr, l, r) {
  if (l === undefined) l = 0;
  if (r === undefined) r = arr.length - 1;
  if (l >= r) return arr;
  getMid(arr, l, r);
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
  quickSortV3(arr, l, x - 1);
  quickSortV3(arr, x + 1, r);
  return arr;
};

// const r = quickSortV1(array);
// console.log(r);
// const r1 = simpleQuickSort(array);
// console.log(r1);

const r2 = quickSortV2(array);
console.log(r2);

const r3 = getMid(array);
