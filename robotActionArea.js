let result = [[35,37]];
function area() {}

function judgeEnter(l, c, k) {
  let r1 = result.find((it) => {
    return (it[0] == l) && (it[1] == c);
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
    console.log(`l=${l}`);
    console.log(`c=${c}`);
    return true;
  }
}

judgeEnter(35, 37, 19);
