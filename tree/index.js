//二叉树用二叉链表表示存储
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

//二叉树用数组表示
//把根结点存储在下标为1的位置，把左子结点存储在下标为2*i的位置，把右子结点存储在2*i+1的位置，以此类推  
//所以，求一个结点的父结点：i/2即可
//https://www.jianshu.com/p/a04d73417f7c
