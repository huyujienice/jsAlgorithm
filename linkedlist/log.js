//输入一个链表，按链表值从尾到头的顺序返回一个ArrayList

function ListNode(x) {
  this.val = x;
  this.next = null;
}

function logList(node) {
  while (node) {
    console.log(node.val);
    node = node.next;
  }
}

let one = new ListNode(1);
let two = new ListNode(2);
let three = new ListNode(3);
let four = new ListNode(4);
let five = new ListNode(5);

one.next = two;
two.next = three;
three.next = four;
four.next = five;

// core
function logArrayList(node) {
  const array = [];
  while (node) {
    array.unshift(node.val);
    node = node.next;
  }
  array.forEach((it) => console.log(it));
  return array;
}

logArrayList(one);
