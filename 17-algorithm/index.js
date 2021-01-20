/* 排序通用方法 */

// 检测是否为数组
function checkArray(array) {
  // 不支持isArray Api 使用 array && typeof array === 'object' && array.length
  return Array.isArray(array)
}

// 交换方法
function swap(array, left, right) {
  let rightValue = array[right];
  array[right] = array[left];
  array[left] = rightValue;
}

/* 冒泡排序 */
function bubble(array) {
  let isArray = checkArray(array);
  if (!isArray) return;
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1);
    }
  }
  return array;
}

/* 插入排序 */
function insertion(array) {
  if (!checkArray(array)) return;
  for (let i = 0; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1);
    }
  }
  return array;
}

/* 选择排序 */
function selection(array) {
  if (!checkArray(array)) return;
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex;
    }
    swap(array, i, minIndex);
  }
}
