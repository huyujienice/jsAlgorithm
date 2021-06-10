let result = [[35, 37]];
function area() {}

function bitSum(n) {
  let r = 0;
  while (n) {
    r = r + (n % 10);
    n = Math.floor(n % 10);
  }
  return r;
}
function judgeEnter(l, c, k) {
  let r1 = result.find((it) => {
    return it[0] == l && it[1] == c;
  });
  if (r1 !== undefined) {
    return false;
  }
  let r2 = bitSum(l) + bitSum(c);
  if (k < r2) {
    return false;
  } else {
    result.push([l, c]);
    return true;
  }
}

judgeEnter(35, 37, 19);
