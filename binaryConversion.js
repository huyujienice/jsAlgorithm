//将十进制浮点数转换为二进制数
function binaryToDecimal(n) {
  const s = String(n).split(".");
  const i = s[0];
  const f = s[1];
  let iP = ``;
  let iL = Number(i);
  let fP = ``;
  let fL = Number(`0.${f}`);
  while (iL !== 0) {
    let p = iL % 2;
    iL = (iL - p) / 2;
    iP = `${p}${iP}`;
  }
  while (fL !== 1 && fP.length < 12 && !isNaN(fL)) {
    let p = fL * 2;
    let s = String(p).split(".");
    fP = `${fP}${s[0]}`;
    fL = Number(`0.${s[1]}`);
  }
  let result = `${iP}.${fP}`;
  console.log(iP);
  console.log(fP);
  console.log(result);
  return result;
}

binaryToDecimal(173.8125);
