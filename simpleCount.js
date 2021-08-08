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
    return new Error("pararms len must be interger");
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
  return Number(result);
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

let num = 1;
let len = 1;
console.log(`${num}的小数位为${getDecimalPlaces(num)}`);
console.log(`${num}的小数点位移${len}位为${formateToInterger(num, len)}`);

let one = 0.01;
let two = 0.1;
console.log(`${one}+${two}=${add(one, two)}`);
console.log(`${one}-${two}=${sub(one, two)}`);
console.log(`${one}*${two}=${mul(one, two)}`);
console.log(`${one}/${two}=${divi(one, two)}`);

