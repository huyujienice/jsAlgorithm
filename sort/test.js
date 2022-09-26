function getRandomNums() {
  const min = 1;
  const max = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArray(n) {
  const arr = [];
  while (n > 0) {
    arr.push(getRandomNums());
    n--;
  }
  return arr;
}

function mergeSortV1(arr, l, r) {
  if (l >= r) return arr;
  const m = Math.floor((l + r) / 2);
  mergeSortV1(arr, l, m);
  mergeSortV1(arr, m + 1, r);
  let temp = [],
    p1 = l,
    p2 = m + 1;
  while (p1 <= m || p2 <= r) {
    if (p2 > r || (p1 <= m && arr[p1] < arr[p2])) {
      temp.push(arr[p1++]);
    } else {
      temp.push(arr[p2++]);
    }
  }
  for (let i = l; i <= r; i++) {
    arr[i] = temp[i - l];
  }
  return arr;
}

class Heap {
  data = [];
  type;
  constructor(type = 1) {
    this.type = type;
  }
  judge(a, b) {
    if (this.type === 1) {
      return a <= b;
    } else {
      return a >= b;
    }
  }
  swap(i, j) {
    const m = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = m;
  }
  push(it) {
    this.data.push(it);
    let n = this.data.length - 1;
    while (n > 0) {
      const f = Math.floor((n - 1) / 2);
      if (this.judge(this.data[f], this.data[n])) {
        this.swap(f, n);
        n = f;
      } else {
        break;
      }
    }
  }
  pop() {
    const r = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data.length--;
    let n = 0;
    while (2 * n + 1 < this.data.length - 1) {
      let a = n;
      if (2 * n + 2 < this.data.length - 1) {
        const c = this.judge(this.data[2 * n + 1], this.data[2 * n + 2])
          ? 2 * n + 2
          : 2 * n + 1;
        if (this.judge(this.data[n], this.data[c])) {
          this.swap(n, c);
          a = c;
        }
      } else {
        if (this.judge(this.data[n], this.data[2 * n + 1])) {
          this.swap(n, 2 * n + 1);
          a = 2 * n + 1;
        }
      }
      if (a === n) {
        break;
      } else {
        n = a;
      }
    }
    return r;
  }
}

function quickSortV1(arr, l, r) {
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
}

function quickSortV2(arr, l, r) {
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
}

function simpleQuickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [],
    right = [],
    base = arr[0];
  arrs = arr.slice(1);
  arrs.forEach((it) => {
    if (it >= base) {
      right.push(it);
    } else {
      left.push(it);
    }
  });
  return simpleQuickSort(left).concat([base], simpleQuickSort(right));
}

const swap = function (arr, i, j) {
  const m = arr[i];
  arr[i] = arr[j];
  arr[j] = m;
};
const getMid = function (arr, l, r) {
  const mid = Math.floor((r + l) / 2);
  if (arr[l] > arr[r]) swap(arr, l, r);
  if (arr[mid] > arr[r]) swap(arr, mid, r);
  if (arr[l] < arr[mid]) swap(arr, l, mid);
};
//todo
const quickSortV3 = function (arr, l, r) {
  if (l === undefined) l = 0;
  if (r === undefined) r = arr.length - 1;
  if (l >= r) return arr;

  getMid(arr, l, r);

  let x = l,
    y = r;
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

const array = getRandomArray(11);
console.log(`array=${array}`);

const baseRadixSort = function (arr, n) {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
      let s = String(arr[i])
      if (arr[i] < 0) {
          s = s.slice(1)
      }
      const l = s.length
      const m = n <= l ? s[l - n] : "0"
      if (obj[m]) {
          obj[m].push(arr[i])
      } else {
          obj[m] = [arr[i]]
      }
  }
  const r = []
  for (let i = 0; i < 10; i++) {
      if (obj[i]) {
          r.push(...obj[i])
      }
  }
  return r
}
const radixSortV1 = function (arr) {
  let f = [], z = []
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= 0) {
          z.push(arr[i])
      } else {
          f.push(arr[i])
      }
  }
  for (let i = 1; i < 6; i++) {
      f = baseRadixSort(f, i)
      z = baseRadixSort(z, i)
  }
  f.reverse()
  return f.concat(z)
}

// const heap = new Heap();
// array.forEach((it) => {
//   heap.push(it);
// });
// while (heap.data.length > 0) {
//   console.log(heap.pop());
// }

// const simpleQuickSortArray = simpleQuickSort(array);
// console.log(`simpleQuickSortArray=${simpleQuickSortArray}`);

// const v1Array = quickSortV1(array);
// console.log(`v1Array=${v1Array}`);

// const v2Array = quickSortV2(array);
// console.log(`v2Array=${v2Array}`);

// const v3Array = quickSortV3(array);
// console.log(`v3Array=${v3Array}`);

// const v1MergeSortArray = mergeSortV1(array, 0, array.length - 1);
// console.log(`v1MergeSortArray=${v1MergeSortArray}`);

const radixSortArray = radixSortV1(array);
console.log(`radixSortArray=${radixSortArray}`);
