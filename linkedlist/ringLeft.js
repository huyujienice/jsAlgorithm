//1,...,n这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。
//约瑟夫环变种

function ListNode(x) {
  this.val = x;
  this.next = null;
}
function logList(node) {
  while (node) {
    console.log(`node.val=${node.val}`);
    node = node.next;
  }
}
//使用链表
function getLinkedList(n) {
  let start = 1;
  let current;
  let head;
  let last;
  while (start <= n) {
    if (current) {
      let node = new ListNode(start);
      current.next = node;
      current = node;
      if (start == n) {
        last = node;
      }
    } else {
      current = new ListNode(start);
      head = current;
    }
    start++;
  }
  return { head, last };
}

function useLinkedList(n, m) {
  let { head, last } = getLinkedList(n);
  last.next = head
  //todo
}

//使用数组
function getArray(n) {
  let array = [];
  while (n) {
    array.unshift(n);
    n--;
  }
  return array;
}

function deleteArray(n, m) {
  let ring = getArray(n);
  let index = 0;
  while (ring.length >= m) {
    deleteIndex = index + m - 1;
    if (deleteIndex > ring.length - 1) {
      deleteIndex = deleteIndex - ring.length;
    }
    index = deleteIndex;
    let deleteItem = ring.splice(deleteIndex, 1);

    console.log(`deleteItem=${deleteItem}`);
  }
  return ring;
}

// let left = deleteArray(41, 3);
// console.log(left);

let { head, last } = getLinkedList(41);
logList(head);
