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

//https://juejin.cn/post/6844903444365443080
//看归并排序流程图，记住即可
// <1>.把长度为n的输入序列分成两个长度为n/2的子序列；
// <2>.对这两个子序列分别采用归并排序；
// <3>.将两个排序好的子序列合并成一个最终的排序序列。
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
  console.log(`${result.concat(leftArr).concat(rightArr)}`);
  return result.concat(leftArr, rightArr);
}

// goMS();

//快速排序
//快速排序的名字起的是简单粗暴，因为一听到这个名字你就知道它存在的意义，就是快，而且效率高! 它是处理大数据最快的排序算法之一了。
// <1>.从数列中挑出一个元素，称为 "基准"（pivot）；
// <2>.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// <3>.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let j = arr[mid];
  let middle = [],
    left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == j) {
      middle.push(arr[i]);
    } else if (arr[i] < j) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(middle, quickSort(right));
}

function goQS() {
  let arr = createArray(10);
  console.log(arr);
  let arrs = quickSort(arr);
  console.log(arrs);
}

goQS();
