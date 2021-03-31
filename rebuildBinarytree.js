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

//前序遍历
function preorderTraversal(root) {
  let point = root;
  console.log(`${point.value}`);
  if (point.left) {
    preorderTraversal(root.left);
  } else {
   
  }
}

preorderTraversal(a);
