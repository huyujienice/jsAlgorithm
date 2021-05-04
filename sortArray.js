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

//插入排序
//新建一个有序数组，只要把原数组取出的数安插在有序数组的合适位置即可保持数组有序，就像打牌整理牌的大小
// <1>.从第一个元素开始，该元素可以认为已经被排序；
// <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
// <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
// <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
// <5>.将新元素插入到该位置后；
// <6>.重复步骤2~5。

function insertSort(arr) {
  let result = [arr.shift()];
  while (arr.length > 0) {
    let it = arr.shift();
    let j = -1;
    for (let i = 0; i < result.length; i++) {
      if (result[i] < it) {
        j = i;
      }
    }
    if (j == -1) {
      result.unshift(it);
    } else {
      result.splice(j + 1, 0, it);
    }
  }
  return result;
}

//冒泡排序
// <1>.比较相邻的元素。如果第一个比第二个大，就交换它们两个；
// <2>.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
// <3>.针对所有的元素重复以上的步骤，除了最后一个；
// <4>.重复步骤1~3，直到排序完成。
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let mid = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = mid;
      }
    }
  }
  return arr;
}

function goSortArray(fn) {
  let arr = createArray(10);
  console.log(arr);
  let arrs = fn(arr);
  console.log(arrs);
}

goSortArray(bubbleSort);
