//输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。
//复制是个啥概念？new ListNode是否可以实现

function ListNode(x) {
  this.val = x;
  this.next = null;
  this.randomnext = null;
}
ListNode.prototype.toString = function () {
  return this.val;
};

function logList(node) {
  while (node) {
    console.log(`node.val=${node.val}`);
    if (node.randomnext) {
      console.log(`${node.val}.randomnext=${node.randomnext.val}`);
    }
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

one.randomnext = six;
two.randomnext = three;
three.randomnext = one;
four.randomnext = six;
five.randomnext = four;
six.randomnext = two;

function getRandomId() {
  return new Date().getTime() + String(Math.random());
}

function findNode(old, news, node) {
  let oldcurrent = old;
  let newscurrent = news;
  let preid = node.id;
  let findnode;
  let id;
  while (oldcurrent) {
    if (oldcurrent.id == preid) {
      if (oldcurrent.randomnext) {
        id = oldcurrent.randomnext.id;
      }
      oldcurrent = null;
    } else {
      oldcurrent = oldcurrent.next;
    }
  }

  if (!id) return;
  while (newscurrent) {
    if (id == newscurrent.id) {
      findnode = newscurrent;
      newscurrent = null;
    } else {
      newscurrent = newscurrent.next;
    }
  }
  return findnode;
}

function copyList(head) {
  let current = head;
  let pre;
  let newhead;
  while (current) {
    let newnode = new ListNode(current.val);
    let id = getRandomId();
    current.id = id;
    newnode.id = id;
    if (pre) {
      pre.next = newnode;
    } else {
      newhead = newnode;
    }
    pre = newnode;
    current = current.next;
  }
  current = newhead;
  while (current) {
    let randomnextnode = findNode(head, newhead, current);
    current.randomnext = randomnextnode;
    current = current.next;
  }
  logList(head);
  logList(newhead);
  return newhead;
}

copyList(one);
