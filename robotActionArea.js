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
  let a = String(l).split("");
  let b = String(c).split("");
  let r2 =
    a.reduce((a, b) => Number(a) + Number(b)) +
    b.reduce((a, b) => Number(a) + Number(b));
  if (k < r2) {
    return false;
  } else {
    result.push([l, c]);
    return true;
  }
}

judgeEnter(35, 37, 19);
