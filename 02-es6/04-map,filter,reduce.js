/* 涉及题目： map,filter,reduce 的作用 */
/*
* map 和 filter 都是遍历数据返回新数组，且不会对原数组产生影响
* 区别： map用于遍历修改数据操作, filter用于通过条件过滤数据
* */

/*
* reduce(function(total,currentValue,currentIndex,arr),initialValue)
* reduce可以将数组的元素通过回调函数最终转换为一个值
* */

// 数组索引元素求和

const arr = [1, 2, 3];
const sum = arr.reduce((total, currentValue, currentIndex) => total + currentValue, 0);

// reduce实现数组map操作
const tempArr = [1, 2, 3];
const mapArr = tempArr.map(item => item * 2); // [2, 4, 6]
const reduceArr = tempArr.reduce((total, currentValue) => {
  total.push(currentValue * 2);
  return total;
}, [])
console.log(reduceArr, 'reduceArr');
