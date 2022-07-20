//给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。
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

two.next = one;
one.next = seven;
seven.next = nine;
nine.next = ten;
ten.next = three;
three.next = four;
four.next = eight;
eight.next = one;

function useArray(head) {
  let array = [];
  let currentVal;
  let repeat = null;
  while (head) {
    currentVal = head.val;
    let judge = array.some((it) => {
      return it.val === currentVal;
    });
    if (judge) {
      repeat = head;
      head = null;
    } else {
      array.push(head);
      head = head.next;
    }
  }
  return repeat;
}

let repeatnode = useArray(two);
console.log(`repeatnode.val = ${repeatnode.val}`);
