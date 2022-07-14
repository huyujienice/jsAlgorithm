//输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
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

one.next = four;
four.next = six;

five.next = six;
six.next = eight;
eight.next = ten;


function sortListArray(one, two) {
  let array = [];
  while (one) {
    array.push(one);
    one = one.next;
  }
  while (two) {
    array.push(two);
    two = two.next;
  }
  array.sort((a, b) => {
    return a.val - b.val;
  });
  array.forEach((item, index) => {
    if (index == array.length - 1) {
      item.next = null;
    } else {
      item.next = array[index + 1];
    }
  });
  let head = array[0];
  logList(head);
  return head;
}

sortListArray(one, two);
