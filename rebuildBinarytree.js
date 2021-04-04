//节点定义
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function rebuildTree(){
  
}








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
