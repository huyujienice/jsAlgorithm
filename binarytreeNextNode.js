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
  if (node.parent == null) {
    //根节点
    nextNode(node.right);
  } else {
    if (node.right) {
      nextNode(node.right);
    } else {
    }
  }
}
console.log(`b节点之后的节点为`);
nextNode(b);
