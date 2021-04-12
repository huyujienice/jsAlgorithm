//hard
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
  toString() {
    return this.value;
  }
}

let a = new Node("a");
let b = new Node("b");
let c = new Node("c");
let d = new Node("d");
let e = new Node("e");
let f = new Node("f");
let g = new Node("g");
let h = new Node("h");
let i = new Node("i");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
e.left = h;
e.right = i;

b.parent = a;
c.parent = a;
d.parent = b;
e.parent = b;
h.parent = e;
i.parent = e;
f.parent = c;
g.parent = c;

function mot(node) {
  if (node.left) {
    mot(node.left);
  }
  console.log(node.toString());
  if (node.right) {
    mot(node.right);
  }
}
mot(a);

function nextNode(node) {
  if (node.right) {
    //有右子树，则下一个节点是右子树的最左子节点
    let n1 = node.right;
    while (n1.left !== null) {
      n1 = n1.left;
    }
    console.log(n1.value);
    return;
  }
  while (node.parent !== null) {
    //没有右子树，找到第一个是父节点左子树的节点
    if (node.value === node.parent.left.value) {
      console.log(node.parent.value);
      return node.parent;
    }
    node = node.parent;
  }
}
console.log(`g节点之后的节点为`);
nextNode(g);
