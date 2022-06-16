//加法
function add(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) + convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -len);
  return result;
}
//减法
function sub(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) - convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -len);
  return result;
}
//乘法
function mul(one, two) {
  let oneL = getDecimalPlaces(one);
  let twoL = getDecimalPlaces(two);
  const oneBig = convertToBigInt(one);
  const twoBig = convertToBigInt(two);
  const bigValue = convertToBigInt(oneBig) * convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -(oneL + twoL));
  return result;
}
//除法
function divi(one, two, holdNums = 2) {
  //TODO
  if (holdNums < 0) {
    return new Error("can not keep negative decimal point");
  }
  const d1 = getDecimalPlaces(one);
  const d2 = getDecimalPlaces(two);
  let l1 = convertToBigInt(one).toString().length;
  const l2 = convertToBigInt(two).toString().length;
  const overload = holdNums + 1;

  let originalOneBig = convertToBigInt(one).toString();

  let move = 0;

  let oneStep = d2 - d1;
  originalOneBig = addDecimalPlacesToString(originalOneBig, oneStep);
  console.log(`originalOneBig=${originalOneBig}`);

  let twoStep = getDecimalPlaces(originalOneBig);
  if (twoStep > 0) {
    move = move + twoStep;
    originalOneBig = addDecimalPlacesToString(originalOneBig, twoStep);
  }
  console.log(`originalOneBig=${originalOneBig}`);

  l1 = originalOneBig.length;
  //保证l1比l2大1位，才有整数留存
  let threeStep = l2 + 1 - l1;
  if (threeStep >= 0) {
    move = move + threeStep;
    originalOneBig = addDecimalPlacesToString(originalOneBig, threeStep);
  }

  //保证精度比l2大2位
  let fourStep = overload + 2;
  move = move + fourStep;
  originalOneBig = addDecimalPlacesToString(originalOneBig, fourStep);


  console.log(`originalOneBig=${originalOneBig}`);

  const oneBig = originalOneBig;
  const twoBig = convertToBigInt(two);

  const bigValue = convertToBigInt(oneBig) / convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -move);
  const finalResult = simpleToFixed(result, holdNums);

  console.log(`d1=${d1}`);
  console.log(`d2=${d2}`);
  console.log(`l1=${l1}`);
  console.log(`l2=${l2}`);
  console.log(`overload=${overload}`);

  console.log(`oneStep=${oneStep}`);
  console.log(`twoStep=${twoStep}`);
  console.log(`threeStep=${threeStep}`);
  console.log(`fourStep=${fourStep}`);

  console.log(`move=${move}`);

  console.log(`oneBig=${oneBig}`);
  console.log(`twoBig=${twoBig}`);
  console.log(`bigValue=${bigValue}`);
  console.log(`result=${result}`);
  console.log(`finalResult=${finalResult}`);

  return finalResult;
}

function getDecimalPlaces(nums) {
  let s = new String(nums);
  if (!s.includes(".")) {
    return 0;
  } else {
    return s.split(".")[1].length;
  }
}
//小数点位置挪动
function addDecimalPlacesToString(str, len = 2) {
  // len 正数右挪，负数左挪
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  let s = String(str);
  //数据源小数位数
  let rightL = getDecimalPlaces(str);
  //需要挪动的小数位数
  let l = len - rightL;
  //数据源去掉小数点,正负
  let result = s.replace(/\./g, "");
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

function convertToBigInt(nums) {
  let str = new String(nums);
  //TODO 缺少校验步骤
  str = str.replace(/\./g, "");
  while (str.charAt[0] == 0) {
    str = str.slice(1);
  }
  let result = BigInt(str);
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
      const addNum = addDecimalPlacesToString(1, -len);
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
