//输入一个链表，反转链表后，输出新链表的表头

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
function reverseList(head) {
  
}

// 可优化，不够优雅
function reverseLinkedList(head) {
  const array = [];
  while (head) {
    array.unshift(head.val);
    head = head.next;
  }
  let middle;
  let header;
  array.forEach((it, index) => {
    let obj = new ListNode(it);
    if (index !== 0) {
      middle.next = obj;
    } else {
      header = obj;
    }
    middle = obj;
  });
  logList(header);
  return header;
}

// reverseLinkedList(one);
