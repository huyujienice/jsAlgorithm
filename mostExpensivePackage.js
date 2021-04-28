// 背包问题是算法研究中的一个经典问题。试想你是一个保险箱大盗，打开了一个装满奇珍异宝的保险箱，但是你必须将这些宝贝放入你的一个小背包中。
// 保险箱中的物品规格和价值不同。你希望自己的背包装进的宝贝总价值最大。
// 如果在我们例子中的保险箱中有 5 件物品，它们的尺寸分别是 3、4、7、8、9，而它们的价值分别是 4、5、10、11、13，且背包的容积为 16，
// 那么恰当的解决方案是选取第三件物品和第五件物品，他们的总尺寸是 16，总价值是 23。
// arr1表示尺寸数组
// arr2表示价值数组
// all表示背包容积
function mep(arr1, arr2, all) {
  let allArr = [];
  //先找出所有能够装入背包的组合，再组合里面找到价值最高的商品
  let a1 = arr1.slice(0);
  a1.sort((a, b) => a - b);
  for (let i = 0; i < a1.lengthj; i++) {
    let one = a1[i];
    let leftArr = a1.slice(i);
  }
}

function mc(arr1, all) {
  let result = [];
  //先找出所有能够装入背包的组合，再组合里面找到价值最高的商品
  let a1 = arr1.slice(0);
  a1.sort((a, b) => a - b);
  for (let i = 0; i < a1.lengthj; i++) {
    let one = a1[i];
    let leftArr = a1.slice(i);
    let leftNum = all - one;
    let j = 0;
    let midArr = [];
    while (j < leftArr.length) {
        let judge = rd(midArr) + leftArr[j]
        if(judge > leftNum){
            
        }else{
            midArr.push(leftArr[j])
            j++
        }
    }
  }
}

function rd(arr) {
  if (arr.length) {
    return arr.reduce((a, c) => {
      a + c;
    });
  } else {
    return 0;
  }
}