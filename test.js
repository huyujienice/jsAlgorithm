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
console.log(obj.b)
obj.b = 1
console.log(obj.b)
console.log(obj._storeB)

