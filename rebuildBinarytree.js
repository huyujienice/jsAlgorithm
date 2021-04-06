//节点定义
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let obj = {};
let num = 0;
function rebuildTree(pA, mA) {
  //初始化二叉树所有节点
  if (num == 0) {
    pA.forEach((element) => {
      let it = new Node(element);
      obj[element] = it;
    });
    num++;
  }
  //pA前序遍历数组
  //mA中序遍历数组
  let index = mA.indexOf(pA[0]);
  if (index != -1) {
    let m1 = mA.slice(0, index);
    let m2 = mA.slice(index + 1, mA.length);
    let p1 = pA.slice(1, m1.length + 1);
    let p2 = pA.slice(m1.length + 1);
    if (m1.length == 1) {
      obj[pA[0]].left = obj[m1[0]];
    }
    if (m2.length == 1) {
      obj[pA[0]].right = obj[m2[0]];
    }
    if (p1.length) {
      obj[pA[0]].left = obj[p1[0]];
    }
    if (p2.length) {
      obj[pA[0]].right = obj[p2[0]];
    }
    rebuildTree(p1, m1);
    rebuildTree(p2, m2);
  }
}
rebuildTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]);

console.log(obj);

// let a = new Node("A");
// let b = new Node("B");
// let c = new Node("C");
// let d = new Node("D");
// let e = new Node("E");
// let f = new Node("F");
// let g = new Node("G");
// let h = new Node("H");
// a.left = b;
// a.right = c;
// b.left = d;
// b.right = e;
// d.right = h;
// c.left = f;
// c.right = g;

//二叉树前序遍历
//利用栈结构将需要回溯的节点保存
//中 → 左 → 右
// function preorderTraversal(node, arr = []) {
//   console.log(`${node.value}`);
//   if (node.left && node.right) {
//     arr.push(node.right);
//     preorderTraversal(node.left, arr);
//   } else if (!node.left && node.right) {
//     preorderTraversal(node.right, arr);
//   } else if (node.left && !node.right) {
//     preorderTraversal(node.left, arr);
//   } else {
//     let point = arr.pop();
//     if (point) {
//       preorderTraversal(point, arr);
//     }
//   }
// }
//二叉树前序遍历
//直接递归
// function preorderTraversal(node) {
//   if (node) {
//     console.log(`${node.value}`);
//     preorderTraversal(node.left);
//     preorderTraversal(node.right);
//   }
// }
// preorderTraversal(a);

//中序遍历
//左 → 中 → 右
// function middleOrderTraversal(node) {
//   if (node.left) {
//     middleOrderTraversal(node.left);
//   }
//   console.log(node.value);
//   if (node.right) {
//     middleOrderTraversal(node.right);
//   }
// }
// middleOrderTraversal(a);

//后序遍历
//左 → 右 → 中
// function postorderTraveral(node) {
//   if (node.left) {
//     postorderTraveral(node.left);
//   }
//   if (node.right) {
//     postorderTraveral(node.right);
//   }
//   console.log(node.value);
// }
// postorderTraveral(a);

//层序遍历
// function levelTraveral(node, arr = []) {
//   if (arr.length) {
//     let l = arr.length;
//     while (l > 0) {
//       let n = arr.shift();
//       if (n.left) {
//         console.log(`${n.left.value}`);
//         arr.push(n.left);
//       }
//       if (n.right) {
//         console.log(`${n.right.value}`);
//         arr.push(n.right);
//       }
//       l--;
//     }
//     levelTraveral(null, arr);
//   } else {
//     if (node) {
//       console.log(`${node.value}`);
//       if (node.left) {
//         console.log(`${node.left.value}`);
//         arr.push(node.left);
//       }
//       if (node.right) {
//         console.log(`${node.right.value}`);
//         arr.push(node.right);
//       }
//       levelTraveral(null, arr);
//     }
//   }
// }
// levelTraveral(a);
