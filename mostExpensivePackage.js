// 背包问题是算法研究中的一个经典问题。试想你是一个保险箱大盗，打开了一个装满奇珍异宝的保险箱，但是你必须将这些宝贝放入你的一个小背包中。
// 保险箱中的物品规格和价值不同。你希望自己的背包装进的宝贝总价值最大。
// 如果在我们例子中的保险箱中有 5 件物品，它们的尺寸分别是 3、4、7、8、9，而它们的价值分别是 4、5、10、11、13，且背包的容积为 16，
// 那么恰当的解决方案是选取第三件物品和第五件物品，他们的总尺寸是 16，总价值是 23。
// arr1表示尺寸数组
// arr2表示价值数组
// n表示背包容积
// 暴力破解法方案已出
// 动态规划解决方案未出
let arr1 = [3, 4, 7, 8, 9];
let arr2 = [4, 5, 10, 11, 13];
let result = [];
function mep(n, arr, arrs = []) {
  if (n < 0) return;
  if (arr.length == 0 || n == 0) {
    result.push([...arrs]);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (n >= arr[i]) {
      arrs.push(arr[i]);
      mep(n - arr[i], arr.slice(i + 1), [...arrs]);
    } else {
      result.push([...arrs]);
      break;
    }
    arrs.pop();
  }
}

function countMax(n) {
  mep(n, arr1);
  const obj = {};
  for (let i = 0; i < arr1.length; i++) {
    obj[arr1[i]] = arr2[i];
  }
  let max = 0;
  let maxArr = [];
  result.forEach((it) => {
    let r = 0;
    it.forEach((res) => {
      r = r + obj[res];
    });
    if (r > max) {
      max = r;
      maxArr = it;
    }
  });
  console.log(max);
  console.log(maxArr);
  console.log(result);
}
countMax(16);
