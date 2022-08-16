// 二叉树用二叉链表表示存储
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

// 二叉树用数组表示
// 把根结点存储在下标为1的位置，把左子结点存储在下标为2*i的位置，把右子结点存储在2*i+1的位置，以此类推
// 所以，求一个结点的父结点：i/2即可
// https://www.jianshu.com/p/a04d73417f7c

// 二叉树前序遍历 leetcode 144  done  check
// N叉树前序遍历 leetcode 589  done  check
// 翻转二叉树 leetcode 226  done   check
// 层序遍历二叉树 leetcode 剑指offer 32  done   check
// 二叉树的层序遍历 leetcode 107  done  check
// 二叉树锯齿形层序遍历 leetcode 103 done check

// 进阶
// leetcode 110  done check
// leetcode 112  done check
// leetcode 105  done check
// leetcode 222  done check
// leetcode 剑指offer 54  done  check
// leetcode 剑指offer 26  done check
// leetcode 662  done check
// leetcode 968  todo

// 堆
class Heap {
  data = [];
  //type=1为大顶堆type=2为小顶堆
  type;
  constructor(type = 1) {
    this.type = type;
  }
  judge(a, b) {
    if (this.type === 1) {
      return a <= b;
    } else {
      return a >= b;
    }
  }
  swap(i, j) {
    const m = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = m;
  }
  push(it) {
    this.data.push(it);
    let n = this.data.length - 1;
    while (n > 0) {
      const f = Math.floor((n - 1) / 2);
      if (this.judge(this.data[f], this.data[n])) {
        this.swap(f, n);
        n = f;
      } else {
        break;
      }
    }
    console.log(`push${it},heap=${this.data}`);
  }
  pop() {
    const r = this.data[0];
    this.data[0] = this.data[this.data.length - 1];
    this.data.length--;
    let n = 0;
    while (2 * n + 1 < this.data.length) {
      let a = n;
      if (2 * n + 2 < this.data.length) {
        const l = this.data[2 * n + 1];
        const r = this.data[2 * n + 2];
        const j = this.judge(l, r) ? 2 * n + 2 : 2 * n + 1;
        if (this.judge(this.data[n], this.data[j])) {
          this.swap(n, j);
          a = j;
        }
      } else {
        if (this.judge(this.data[n], this.data[2 * n + 1])) {
          this.swap(n, 2 * n + 1);
          a = 2 * n + 1;
        }
      }
      if (a === n) {
        break;
      } else {
        n = a;
      }
    }
    console.log(`pop${r},heap=${this.data}`);
    return r;
  }
}

const heap = new Heap(2);
heap.push(0);
heap.push(1);
heap.push(1);
heap.push(2);
heap.push(4);
heap.push(4);
heap.push(1);
heap.push(3);
heap.push(3);
heap.push(2);

heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();
heap.pop();

// leetcode 剑指offer 40  done check
// leetcode 1046 done check
// leetcode 703 done check
// leetcode 215 done
// leetcode 373 todo
// leetcode 692 done
// leetcode 295
// leetcode 面试题17.20
// leetcode 264
// leetcode 313
// leetcode 1753
// leetcode 1801
