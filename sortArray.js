//创建乱序数组
function createArray(n) {
  let arr = [];
  let n1 = n;
  while (n1 !== 0) {
    let num = Math.floor(Math.random() * n);
    arr.push(num);
    n1--;
  }
  return arr;
}

//二分查找元素
function binarySearch(arr, nums) {
  //基本条件，有序数组
  console.log(arr);
  if (arr.length == 1) {
    if (arr[0] == nums) {
      console.log(`has ${nums}`);
    }
    return;
  }
  let start = Math.floor(arr.length / 2);
  if (arr[start] == nums) {
    console.log(`has ${nums}`);
    return;
  } else if (arr[start] > nums) {
    binarySearch(arr.slice(0, start), nums);
  } else {
    binarySearch(arr.slice(start, arr.length), nums);
  }
}

//测试二分查找
function goBS(nums) {
  let arr = createArray(10);
  arr.sort((a, b) => a - b);
  console.log(arr);
  console.log(`nums=${nums}`);
  binarySearch(arr, nums);
}

function goMS() {
  let arr = createArray(10);
  console.log(arr);
  let arrs = mergeSort(arr);
  console.log(arrs);
}

//归并排序
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
//归并排序核心代码
function merge(leftArr, rightArr) {
  let result = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      result.push(leftArr.shift());
    } else {
      result.push(rightArr.shift());
    }
  }
  return result.concat(leftArr).concat(rightArr);
}

goMS();


