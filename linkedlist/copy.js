//输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。
//复制是个啥概念？new ListNode是否可以实现,必须使用new ListNode

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

//较优解法
//分为三步

/**
 * 较优解法,分为三步
 * 
 * 1.复制节点，将所有原节点指向复制节点，复制节点指向原节点的指向
 * 即 A1->B1->C1->null => A1->A2->B1->B2->C1->C2->null
 * 2.矫正复制节点的randomnext的指向，另其指向复制节点
 * 3.节点分离
 * @param {ListNode} head
 * @return {ListNode} node
 */
function cloneAllNode(head) {
  let current = head;
  cloneStepOne(current);
  setRandomNode(current);
  let copyone = splitList(current);
  logList(copyone);
  return copyone;
}

function cloneStepOne(head) {
  while (head) {
    let newnode = new ListNode(head.val);
    let prenext = head.next;
    newnode.next = prenext;
    head.next = newnode;
    head = prenext;
  }
}
function setRandomNode(head) {
  while (head) {
    let newnode = head.next;
    if (head.randomnext) {
      newnode.randomnext = head.randomnext.next;
    }
    head = newnode.next;
  }
}
function splitList(head) {
  let findnode;
  let prenode;
  while (head) {
    let newnode = head.next;
    if (prenode) {
      prenode.next = newnode;
    } else {
      findnode = newnode;
    }
    prenode = newnode;
    head.next = newnode.next;
    head = head.next;
  }
  return findnode;
}

// 网上流传这种递归解法
// 但是复制出来的新链表的randomnext指向原链表的节点,不确定是否符合题意,可能是有问题的
function cloneNode(head) {
  if (!head) return;
  let newnode = new ListNode(head.val);
  newnode.randomnext = head.randomnext;
  newnode.next = cloneNode(head.next);
  return newnode;
}

//通过设置id复制一模一样的链表
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

// copyList(one);

// const copyone = cloneNode(one);
// logList(copyone);

cloneAllNode(one);
