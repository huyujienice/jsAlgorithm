//1,...,n这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。
//约瑟夫环变种

function ListNode(x) {
  this.val = x;
  this.next = null;
}
function logList(node) {
  let set = new Set();
  while (node) {
    let oldLength = set.size;
    set.add(node.val);
    if (oldLength == set.size) {
      node = null;
    } else {
      console.log(`node.val=${node.val}`);
      node = node.next;
    }
  }
}

//快捷标准做法
//使用数学推导法
//f(n,m) = (f(n-1,m) + m) % n
//f(n,m)表示n个人报数，每报m人时杀掉那个人，最终胜利者的下标
//每杀掉一个人，下一个人成为头，相当于把数组向前移动m位。若已知n-1个人时，
//胜利者的下标位置在f(n-1,m)，则n个人的时候，就是向后移动m位，因为有可能
//数组越界，超过的部分会接到头上，所以还要对n取模，即f(n,m) = (f(n-1,m)+m)%n

function useMath(n, m) {
  if (n == 1) return 0;
  return (useMath(n - 1, m) + m) % n;
}

//使用链表，通过set判断链表是否已经遍历过一圈
//1.生成链表，将链表首尾相连生成环
//2.每次删除链表中的第m个节点，当链表中的节点不超过m的时候，删除停止
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
  last.next = head;

  let current = head;
  let find;
  while (current) {
    let deleteLeft = current;
    let leftIndex = m - 2;
    while (leftIndex) {
      deleteLeft = deleteLeft.next;
      leftIndex--;
    }
    let deleteRight = current;
    let index = m;
    while (index) {
      deleteRight = deleteRight.next;
      index--;
    }
    console.log(`deleteLeft.val=${deleteLeft.val}`);
    console.log(`deleteRight.val=${deleteRight.val}`);
    deleteLeft.next = deleteRight;
    current = deleteRight;

    //todo
    let judge = current;
    let judgeCount = m;
    let set = new Set();
    while (judgeCount) {
      set.add(judge.val);
      judge = judge.next;
      judgeCount--;
    }
    if (set.size < m) {
      find = current;
      current = null;
    }
  }
  return find;
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

let find = useLinkedList(41, 3);
logList(find);

let mathfind = useMath(41, 3);
console.log(`mathfind=${mathfind}`);
