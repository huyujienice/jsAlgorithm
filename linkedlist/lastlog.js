//输入一个链表，输出该链表中倒数第k个结点

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
let six = new ListNode(6);

one.next = two;
two.next = three;
three.next = four;
four.next = five;
five.next = six;

//标准做法，时间复杂度较优
//1.定义快慢指针，都指向head
//2.快指针先走k步，然后快慢指针一起走
//3.当快指针指向next时，慢指针指向的即是链表中倒数第k个节点
function usePointLog(one, k) {
  if (!one) return;
  if (k < 1) return;
  let fast = one;
  let slow = one;
  while (k > 0) {
    k--;
    fast = fast.next;
  }
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}

//k从1开始
function logLast(one, k) {
  if (!one) return;
  if (k < 1) return;
  let length = 0;
  let current = one;
  while (current) {
    length++;
    current = current.next;
  }
  let count = length - k + 1;
  current = one;
  while (count > 0) {
    if (count == 1) {
      count = 0;
    } else {
      count--;
      current = current.next;
    }
  }
  return current;
}

//利用array结构做中转
function useArray(one, k) {
  let array = [];
  while (one) {
    array.unshift(one);
    one = one.next;
  }
  return array[k - 1];
}

// let node = useArray(one, 4);
// console.log(node.val);

// let node = logLast(one, 4);
// console.log(node.val);

let node = usePointLog(one, 4);
console.log(node.val);
