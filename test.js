const goSortArray = require("./sortArray.js");
//冒泡排序
function bs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i + 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let mid = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = mid;
      }
    }
  }
  return arr;
}
//选择排序
function ss(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        m = j;
      }
    }
    let mid = arr[m];
    arr[m] = arr[i];
    arr[i] = mid;
  }
  return arr;
}
//插入排序
function is(arr) {
  let arrs = [arr.pop()];
  while (arr.length > 0) {
    let it = arr.pop();
    let index = -1;
    for (let i = 0; i < arrs.length; i++) {
      if (arrs[i] < it) {
        index = i;
      }
    }
    if (index == -1) {
      arrs.unshift(it);
    } else {
      arrs.splice(index + 1, 0, it);
    }
  }
  return arrs;
}
//归并排序
function ms(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  return merge(ms(left), ms(right));
}
function merge(leftArr, rightArr) {
  let result = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      result.push(leftArr.shift());
    } else {
      result.push(rightArr.shift());
    }
  }
  return result.concat(leftArr, rightArr);
}

function qs(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let m = Math.floor(arr.length / 2);
  let left = [];
  let mid = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    let it = arr[i];
    if (it == arr[m]) {
      mid.push(it);
    } else if (it > arr[m]) {
      right.push(it);
    } else {
      left.push(it);
    }
  }
  return qs(left).concat(mid, qs(right));
}

// goSortArray(qs);

function fbnc(n) {
  if (n < 2) {
    return n;
  }
  return fbnc(n - 1) + fbnc(n - 2);
}

function fb(n) {
  if (n < 2) {
    return n;
  }
  let a = 0,
    b = 1;
  let result = 1;
  for (let i = 1; i < n; i++) {
    result = a + b;
    a = b;
    b = result;
  }
  return result;
}

console.log(`${fbnc(30)}`);
console.log(`${fb(30)}`);

const obj = {};
Object.defineProperty(obj, "b", {
  configurable: true,
  enumerable: true,
  get: function () {
    return this._storeB;
  },
  set: function (value) {
    this._storeB = value;
  },
});
console.log(obj.b);
obj.b = 1;
console.log(obj.b);
console.log(obj._storeB);

// let testObj = {};
// const registry = new FinalizationRegistry((value) => {
//   alert(value);
// });
// registry.register(testObj, "clear testObj");
// setTimeout(() => {
//   testObj = null;
// }, 1000);

// new Promise((resolve, reject) => {
//   console.log("throw promise error");
//   reject("promise error");
// }).then(() => {
//   console.log(`then fun`);
// });
// console.log(`continue`);

// try {
//   new Promise(() => {
//     console.log("throw promise error");
//     throw new Error("promise error");
//   });
// } catch (error) {
//   console.log(error);
// }

// const obj = { test: 1 };
// Object.preventExtensions(obj);
// obj.test = 2;
// console.log(obj.test);

// function nextOneDayTimes(days = 1) {
//   function formateTimer(obj) {
//     const nums = ~~obj;
//     if (nums <= 9) {
//       return `0${nums}`;
//     } else {
//       return `${nums}`;
//     }
//   }
//   const time = days * 24 * 60 * 60 * 1000;
//   const now = new Date();
//   const nextDate = new Date(now.getTime() + time);
//   const nextYear = nextDate.getFullYear();
//   const nextMon = formateTimer(nextDate.getMonth() + 1);
//   const nextDay = formateTimer(nextDate.getDate());
//   const nextHour = formateTimer(nextDate.getHours());
//   const nextMin = formateTimer(nextDate.getMinutes());
//   const nextSec = formateTimer(nextDate.getSeconds());
//   const result = `${nextYear}-${nextMon}-${nextDay} ${nextHour}:${nextMin}:${nextSec}`;
//   console.log(`now=${now.toLocaleString()}`);
//   console.log(`nextDate=${nextDate.toLocaleString()}`);
//   console.log(`result=${result}`);
//   return result;
// }
// //使用方法：
// //time变量即写入变量
// //默认执行1天之后,10天之后可以执行nextOneDayTimes(10)
// const time = nextOneDayTimes();

// const regTest = `C 3 501 敢3`;
// function trimSpace(str) {
//   const headReg = /^\s*([\w\d\p{Unified_Ideograph}])/gu;
//   const endReg = /([\w\d\p{Unified_Ideograph}])\s*$/;
//   const result = str
//     .replace(headReg, (_, p1) => {
//       return p1;
//     })
//     .replace(endReg, (_, p1) => {
//       return p1;
//     });
//   console.log(result);
//   return result;
// }
// trimSpace(regTest);

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
    console.log(`push${it},heap=${this.data}`);
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
    console.log(`pop${r},heap=${this.data}`);
    return r;
  }
}

const heap = new Heap(2);
heap.push(0);
heap.push(1);
heap.push(1);
heap.push(2);
heap.push(4);
heap.push(4);
heap.push(1);
heap.push(3);
heap.push(3);
heap.push(2);

heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
