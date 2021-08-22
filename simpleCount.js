//尝试用字符串模拟四则运算，解决一般js中的浮点精度问题
//获取小数点位
function getDecimalPlaces(num) {
  let s = String(num);
  if (!s.includes(".")) {
    return 0;
  } else {
    return s.split(".")[1].length;
  }
}
//小数点位置挪动
function formateToInterger(num, len = 2) {
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  let s = String(num);
  //数据源小数位数
  let rightL = getDecimalPlaces(num);
  //需要挪动的小数位数
  let l = len - rightL;
  //数据源去掉小数点,正负
  let result = s.replace(".", "");
  let positive = 0;
  if (s[0] === "-") {
    //负数
    positive = 1;
    result = result.slice(1);
  }
  while (result[0] === "0") {
    result = result.slice(1);
  }
  if (len >= rightL) {
    //整数
    let z = ``;
    while (l > 0) {
      z = `0${z}`;
      l--;
    }
    result = `${result}${z}`;
  } else {
    //小数
    let start = result.length - Math.abs(l);
    if (start >= 1) {
      result = result.slice(0, start) + "." + result.slice(start);
    } else {
      let absStart = Math.abs(start);
      let z = `0.`;
      while (absStart > 0) {
        z = `${z}0`;
        absStart--;
      }
      result = `${z}${result}`;
    }
  }
  if (positive === 1) {
    result = `-${result}`;
  }
  return result;
}
//判断是否在最大安全数范围内
function judgeCanUse(num) {
  if (!Number.isSafeInteger(num)) {
    throw new RangeError("out of max safe number");
  }
}
//无限整数长度加法,返回字符串
function stringAdd(one, two) {
  const s1 = String(one).split("");
  const s2 = String(two).split("");
  const len = Math.max(s1.length, s2.length);
  let l = s1.length - s2.length;
  if (l > 0) {
    while (l > 0) {
      s2.unshift("0");
      l--;
    }
  } else {
    while (l < 0) {
      s1.unshift("0");
      l++;
    }
  }

  let step = 0;
  const resultArr = [];
  for (let i = len - 1; i >= 0; i--) {
    let r1 = Number(s1[i]);
    if (!s1[i]) r1 = 0;
    let r2 = Number(s2[i]);
    if (!s2[i]) r2 = 0;
    let r = r1 + r2;
    if (step !== 0) {
      r = r + 1;
      step = 0;
    }
    if (r >= 10) {
      const re = r - 10;
      resultArr.unshift(re);
      step = 1;
    } else {
      resultArr.unshift(r);
      step = 0;
    }
    if (i === 0) {
      if (step === 1) {
        resultArr.unshift("1");
      }
    }
  }
  const result = resultArr.join("");
  return result;
}
//加法
function add(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  let result = formateToInterger(one, len) + formateToInterger(two, len);
  result = formateToInterger(result, -len);
  return result;
}
//减法
function sub(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  let result = formateToInterger(one, len) - formateToInterger(two, len);
  result = formateToInterger(result, -len);
  return result;
}
//乘法
function mul(one, two) {
  let oneL = getDecimalPlaces(one);
  let twoL = getDecimalPlaces(two);
  let result = formateToInterger(one, oneL) * formateToInterger(two, twoL);
  result = formateToInterger(result, -(oneL + twoL));
  return result;
}
//除法
function divi(one, two) {
  let oneL = getDecimalPlaces(one);
  let twoL = getDecimalPlaces(two);
  let result = formateToInterger(one, oneL) / formateToInterger(two, twoL);
  result = formateToInterger(result, -(oneL - twoL));
  return result;
}

//重构toFixed
function simpleToFixed(num, len = 2) {
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  if (len < 0) {
    return new Error("len argument must larger than zero");
  }
  let result = String(num);
  //数据源小数位数
  let rightL = getDecimalPlaces(num);
  let positive = 0;
  if (result[0] === "-") {
    //负数
    positive = 1;
    result = result.slice(1);
  }
  if (rightL > len) {
    const r1 = result.split(".")[0];
    const r2 = result.split(".")[1].slice(0, len);
    const judge = Number(result.split(".")[1].slice(len)[0]);
    if (r2) {
      result = `${r1}.${r2}`;
    } else {
      result = `${r1}`;
    }
    if (judge > 4) {
      const addNum = formateToInterger(1, -len);
      result = String(add(result, addNum));
    }
  }
  //填补位
  let w = getDecimalPlaces(result);
  if (w < len) {
    let c = len - w;
    while (c > 0) {
      if (result.includes(".")) {
        result = `${result}0`;
      } else {
        result = `${result}.0`;
      }
      c--;
    }
  }

  if (positive === 1) {
    result = `-${result}`;
  }
  return result;
}



let num = 1;
let len = 2;
let one = Number.MAX_SAFE_INTEGER;
let two = Number.MAX_SAFE_INTEGER;

console.log(`${num}的小数位为${getDecimalPlaces(num)}`);
console.log(`${num}的小数点位移${len}位为${formateToInterger(num, len)}`);
console.log(`${one}+${two}=${add(one, two)}`);
console.log(`${one}-${two}=${sub(one, two)}`);
console.log(`${one}*${two}=${mul(one, two)}`);
console.log(`${one}/${two}=${divi(one, two)}`);
console.log(`simpleToFixed(${one},${len})=${simpleToFixed(one, len)}`);

// const s1 = "9999999999999999";
// const s2 = "9999999999999999";
// console.log(`${s1}+${s2}=${stringAdd(s1, s2)}`);
