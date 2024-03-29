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
// TODO
// leetcode 968

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
        const j = this.judge(this.data[2 * n + 1], this.data[2 * n + 2])
          ? 2 * n + 2
          : 2 * n + 1;
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

const heap = new Heap(1);
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
// leetcode 215 done check
// TODO
// leetcode 373 done check   heap解法c++可过，js超过时间限制,舍弃sort方法，利用数组有序优化了插入排序算法
// leetcode 692 done check
// TODO
// leetcode 295 对顶堆 check
// leetcode 面试题17.20 done check
// TODO
// leetcode 264 check
// leetcode 313 check
// leetcode 1753 done check
// leetcode 1801 done check




// 并查集
// 连通性问题
// Quick-Find算法，染色方法，查找快
// Quick-Union算法，利用树形结构，快速合并


// leetcode 547 done
// leetcode 200 done
// leetcode 990 done
// leetcode 684 done
// leetcode 1319 done
// leetcode 128 done
// leetcode 947 done
// todo
// leetcode 1202 


