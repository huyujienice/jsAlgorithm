//输入一个链表，反转链表后，输出新链表的表头

function ListNode(x) {
  this.val = x;
  this.next = null;
}
ListNode.prototype.toString = function () {
  return this.val;
};

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
let six = new ListNode(6);

one.next = two;
two.next = three;
three.next = four;
four.next = five;
five.next = six;

// core
// TODO 没看懂标准答案
// 标准答案
var reverseList = function (head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  logList(headNode);
  return headNode;
};

// 较优解法，不会更改节点数据
function newReverseList(head) {
  let current = head;
  let newhead;
  while (current) {
    let nextnode = current.next;
    if (newhead) {
      current.next = newhead;
    } else {
      current.next = null;
    }
    newhead = current;
    current = nextnode;
  }
  logList(newhead);
  return newhead;
}

// 将prenext指向原来的链接，next则为新链接
function preReverseList(head) {
  let current = head;
  while (current) {
    current.prenext = current.next;
    current = current.next;
  }
  current = head;
  let newhead;
  let count = 0;
  while (current) {
    if (count == 0) {
      current.next = null;
    }
    if (current.prenext) {
      current.prenext.next = current;
    } else {
      newhead = current;
    }
    current = current.prenext;
    count++;
  }
  logList(newhead);
  return newhead;
}

// 可优化，不够优雅
//! 使用new ListNode,若node节点内包含其他内容则会导致信息丢失
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

// preReverseList(one);

// newReverseList(one);

reverseList(one);
