//删除链表中重复的节点
//todo
//如何重复？重复如何next?
//重复表示val值相等，但是对象是多个对象，跟next没有关系,next指向对象的内存地址

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
let three1 = new ListNode(3);
let three2 = new ListNode(3);
let three3 = new ListNode(3);

let four = new ListNode(4);
let five = new ListNode(5);
let six = new ListNode(6);
let seven = new ListNode(7);
let eight1 = new ListNode(8);
let eight2 = new ListNode(8);

let nine = new ListNode(9);
let ten = new ListNode(10);

one.next = two;
two.next = three1;
three1.next = three2;
three2.next = three3;
three3.next = four;
four.next = five;
five.next = six;
six.next = seven;
seven.next = eight1;
eight1.next = nine;
nine.next = ten;
ten.next = eight2;

function useSet(head) {
  let set = new Set();
  let current = head;
  let before;
  while (current) {
    let oldSize = set.size;
    set.add(current.val);
    if (oldSize == set.size) {
      let after = current.next;
      before.next = after;
      current = after;
    } else {
      before = current;
      current = current.next;
    }
  }
  return head;
}

logList(one);
const head = useSet(one);
logList(head);
