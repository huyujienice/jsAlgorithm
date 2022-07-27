//给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。
//核心即排序算法

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

one.next = two;
two.next = three;
three.next = four;
four.next = five;
five.next = six;
six.next = seven;
seven.next = eight;
eight.next = nine;
nine.next = ten;

function deletenode(head, node) {
  let current = head;
  let before;
  if (head.val == node.val) {
    let nextnode = head.next;
    head.next = null;
    return nextnode;
  }
  while (current) {
    if (current?.next.val == node.val) {
      before = current;
      current = null;
    } else {
      current = current.next;
    }
  }
  let after = node.next;
  before.next = after;
  return head;
}

let headnode = deletenode(one, seven);
logList(headnode);
