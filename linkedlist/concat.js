//输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
//核心即排序算法

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
four.next = six;

five.next = six;
six.next = eight;
eight.next = ten;

//将第一个链表当做标准，将第二个链表的节点查找位置，并插入
//因为2个链表单调递增，所有可以如此
function newSortListArray(one, two) {
  let point = two;
  let arraynode = one;
  while (point) {
    let nextnode = point.next;

    let current = arraynode;
    if (current.val > point.val) {
      //当第一个指针都比插入的队列小的时候，第一个指针置为head
      point.next = current;
      arraynode = point;
    } else {
      while (current) {
        let afternode = current.next;
        if (current.next) {
          //插入2个节点之间
          if (current.val < point.val && current.next.val > point.val) {
            let after = current.next;
            current.next = point;
            point.next = after;
          }
        } else {
          //最后一个节点
          if (current.val < point.val) {
            current.next = point;
            point.next = null;
          }
        }
        current = afternode;
      }
    }

    point = nextnode;
  }
  logList(arraynode);
  return arraynode;
}

//取巧，通过array结构进行中转排序
function sortListArray(one, two) {
  let array = [];
  while (one) {
    array.push(one);
    one = one.next;
  }
  while (two) {
    array.push(two);
    two = two.next;
  }
  array.sort((a, b) => {
    return a.val - b.val;
  });
  array.forEach((item, index) => {
    if (index == array.length - 1) {
      item.next = null;
    } else {
      item.next = array[index + 1];
    }
  });
  let head = array[0];
  logList(head);
  return head;
}

// sortListArray(one, two);
newSortListArray(two, one);
