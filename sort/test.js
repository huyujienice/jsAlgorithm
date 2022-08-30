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
    while (2 * n + 1 < this.data.length) {
      let a = n;
      if (2 * n + 2 < this.data.length) {
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
}

function simpleQuickSort(arr) {
  if (arr.length <= 1) return arr;
  let left = [],
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
}

const array = getRandomArray(10);
console.log(`array=${array}`);

// const heap = new Heap();
// array.forEach((it) => {
//   heap.push(it);
// });
// console.log(array);
// while (heap.data.length > 0) {
//   console.log(heap.pop());
// }

// const quickSortArray = quickSortV1(array);
// console.log(`quickSortArray=${quickSortArray}`);

const simpleQuickSortArray = simpleQuickSort(array);
console.log(`simpleQuickSortArray=${simpleQuickSortArray}`);
