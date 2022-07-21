//输入两个链表，找出它们的第一个公共结点。

function ListNode(x) {
  this.val = x;
  this.next = null;
}
ListNode.prototype.toString = function () {
  return this.val;
};

function logList(node) {
  while (node) {
    console.log(`node.val=${node.val}`);
    node = node.next;
  }
}

let one = new ListNode(1);
let two = new ListNode(2);
let three = new ListNode(3);
let four = new ListNode(4);
let five = new ListNode(5);
let six = new ListNode(6);
let seven = new ListNode(7);
let eight = new ListNode(8);
let nine = new ListNode(9);
let ten = new ListNode(10);

one.next = four;
four.next = eight;
eight.next = nine;

two.next = three;
three.next = five;
five.next = six;
six.next = seven;
seven.next = eight;
eight.next = nine;
nine.next = ten;

//使用指针执行双重遍历，找到指针相等的点
function usePoint(one, two) {
  let point = one;
  let find;
  while (point) {
    let judge = two;
    while (judge) {
      if (point.val == judge.val) {
        find = point;
        point = null;
        judge = null;
      } else {
        judge = judge.next;
      }
    }
    point = point?.next;
  }
  return find;
}

let findnode = usePoint(one, two);
console.log(`findnode.val=${findnode.val}`);
