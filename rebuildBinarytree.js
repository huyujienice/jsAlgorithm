//节点定义
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
let d = new Node("D");
let e = new Node("E");
let f = new Node("F");
let g = new Node("G");
let h = new Node("H");
a.left = b;
a.right = c;
b.left = d;
b.right = e;
d.right = h;
c.left = f;
c.right = g;

//二叉树前序遍历
//利用栈结构将需要回溯的节点保存
function preorderTraversal(node, arr = []) {
  console.log(`${node.value}`);
  if (node.left && node.right) {
    arr.push(node.right);
    preorderTraversal(node.left, arr);
  } else if (!node.left && node.right) {
    preorderTraversal(node.right, arr);
  } else if (node.left && !node.right) {
    preorderTraversal(node.left, arr);
  } else {
    let point = arr.pop();
    if (point) {
      preorderTraversal(point, arr);
    }
  }
}

preorderTraversal(a);
