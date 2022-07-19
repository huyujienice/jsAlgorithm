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

//k从1开始
function logLast(one, k) {
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

let node = logLast(one, 4);
console.log(node.val);
