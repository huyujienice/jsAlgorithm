//输入两个链表，找出它们的第一个公共结点。

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

one.next = four;
four.next = eight;
eight.next = nine;

two.next = three;
three.next = five;
five.next = six;
six.next = seven;
seven.next = eight;
eight.next = nine;
nine.next = ten;

//使用双指针
//每个指针第一次走到终点时，可以从另一个链表重新开始挪动
//当两个指针经过零次或者一次转换挪动的时候，必定会相交于指针公共节点
//因为当有公共节点的之后，2个链表公共节点后的内容完全一致，长度也完全一致
function useConnect(one, two) {
  let top = one;
  let bottom = two;
  let topCount = 0;
  let bottomCount = 0;
  let find = null;
  while (top && bottom) {
    if (top.val == bottom.val) {
      find = top;
      top = null;
      bottom = null;
    }
    if (top?.next) {
      top = top.next;
    } else {
      if (!topCount) {
        topCount++;
        top = two;
      } else {
        top = null;
      }
    }
    if (bottom?.next) {
      bottom = bottom.next;
    } else {
      if (!bottomCount) {
        bottomCount++;
        bottom = one;
      } else {
        bottom = null;
      }
    }
  }
  return find;
}

//使用set结构辅助
function useSet(one, two) {
  let set = new Set();
  let find;
  while (one) {
    set.add(one.val);
    one = one.next;
  }
  while (two) {
    let old = set.size;
    set.add(two.val);
    if (old == set.size) {
      find = two;
      two = null;
    } else {
      two = two.next;
    }
  }
  return find;
}

//使用指针执行双重遍历，找到指针相等的点
function usePoint(one, two) {
  let point = one;
  let find;
  while (point) {
    let judge = two;
    while (judge) {
      if (point.val == judge.val) {
        find = point;
        point = null;
        judge = null;
      } else {
        judge = judge.next;
      }
    }
    point = point?.next;
  }
  return find;
}

let findnode = usePoint(one, two);
console.log(`findnode.val=${findnode.val}`);

let findsnode = useSet(one, two);
console.log(`findsnode.val=${findsnode.val}`);

let findssnode = useConnect(one, two);
console.log(`findssnode.val=${findssnode.val}`);
