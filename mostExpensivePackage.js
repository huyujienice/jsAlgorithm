// 背包问题是算法研究中的一个经典问题。试想你是一个保险箱大盗，打开了一个装满奇珍异宝的保险箱，但是你必须将这些宝贝放入你的一个小背包中。
// 保险箱中的物品规格和价值不同。你希望自己的背包装进的宝贝总价值最大。
// 如果在我们例子中的保险箱中有 5 件物品，它们的尺寸分别是 3、4、7、8、9，而它们的价值分别是 4、5、10、11、13，且背包的容积为 16，
// 那么恰当的解决方案是选取第三件物品和第五件物品，他们的总尺寸是 16，总价值是 23。
// arr1表示尺寸数组
// arr2表示价值数组
// n表示背包容积
let arr1 = [3, 4, 7, 8, 9];
let arr2 = [4, 5, 10, 11, 13];
let result = [[]];
function mep(n, arr) {
  if (n <= 0) return;
  if (n < arr[0]) return;
  for (let i = 0; i < arr.length; i++) {
    if (n > arr[i]) {
      result[result.length - 1].push(arr[i]);
      mep(n - arr[i], arr.slice(i + 1));
    } else {
      result.push([]);
    }
  }
  console.log(result)
}

mep(16,arr1)