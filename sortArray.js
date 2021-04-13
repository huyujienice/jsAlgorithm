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

function binarySearch(arr, nums) {
  //二分查找
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

goBS(3);
