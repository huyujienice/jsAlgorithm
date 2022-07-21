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

//标准解法为较为复杂的数学公式推导出
//详细可见https://zhuanlan.zhihu.com/p/103626709
//设置起点到环入口距离为a,入口到相遇点距离为b,相遇点到环距离为c
//相遇时fast走过的路径为a+(b+c)k+b,k为圈数，且大于1
//相遇时slow走过的路径为a+b
//fast的速度是slow的2倍，那么2(a+b)=a+(b+c)k+b
//a+b = (b+c)k -> a = (b+c)k-b -> a = (b+c)k-b-c+c -> a = (b+c)(k-1) + c
//即指针分别从起点和相遇点出发，再次相聚的节点为环入口

function usePoint(head) {
  let slow = head;
  let fast = head;
  let middle;
  let count = 1;
  while (count > 0) {
    //当fast到达null终点时，无环
    if (!fast) {
      return null;
    }
    if (count !== 1 && slow.val == fast.val) {
      middle = fast;
      count = 0;
    } else {
      count++;
      slow = slow.next;
      fast = fast.next.next;
    }
  }
  fast = head;
  let find;
  while (middle) {
    if (middle.val == fast.val) {
      find = fast;
      middle = null;
    } else {
      middle = middle.next;
      fast = fast.next;
    }
  }
  return find;
}

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

// let repeatnode = useArray(two);
// console.log(`repeatnode.val = ${repeatnode.val}`);

let findnode = usePoint(two);
console.log(`findnode.val = ${findnode.val}`);
