/* 字符串操作 */
/*
* 1. 字符串去除首位空格 -- trim()
* 需求场景：用户搜索前去除输入的首位空格
* */
// let str = "    白色不白，黑色不黑，我...   ";
// let result = str.trim();
// console.log(result, 'result'); // "白色不白，黑色不黑，我..."

/*
* 2. 字符串替换指定字符(串) -- replace()
* 需求场景：字符串的替换，关键词的屏蔽隐藏
* 用法： string.replace(searchValue, newValue)
* */
// let str = "你知道吗？世界上有60亿人，宇宙有60万亿小行星，你比小行星还要珍贵一万倍";
// let result1 = str.replace('亿', '个');
// let result2 = str.replace(/亿/g, '个');
// console.log(result1)  // 控制台打印："你知道吗？世界上有60个人，宇宙有60万亿小行星，你比小行星还要珍贵一万倍"
// console.log(result2)  // 控制台打印："你知道吗？世界上有60个人，宇宙有60万个小行星，你比小行星还要珍贵一万倍"

/*
* 3. 字符串合并 -- concat()
* 需求场景：字符串合并并展示
* */
// let str1 = '我123';
// let str2 = '你456';
// let result = str1.concat(str2);
// console.log(result, 'result') // '我123你456'

/*
* 4. 字符串转数组
* 需求场景: 字符串转数组进行遍历操作
* */
// let str = "张三,李四;王五";
// let result1 = str.split(',');
// let result2 = str.split(/[,;]/);
// console.log(result1) // 控制台打印：["张三", "李四;王五"]
// console.log(result2) // 控制台打印：["张三", "李四", "王五"]

/*
* 5. 字符串转数组
* 需求场景：字符串全部分割成字符数组
* 用法 [...string]
* */
// let str = '这是一个字符串string'
// let arr = [...str]
// console.log(arr) // 控制台打印：["这", "是", "一", "个", "字", "符", "串", "s", "t", "r", "i", "n", "g"]

/*
* 6. 字符串反转
* 需求场景： 将当前字符串反转输出
* 用法：[...string].reverse().join('')
* */
// let str = "两极反转，龙卷风摧毁停车场!";
// let result = [...str].reverse().join('');
// console.log(result); // !场车停毁摧风卷龙，转反极两

/*
* 7. 字符串的多次复制 -- repeat()
* 需求场景： 字符串需要进行 n 次自动复制。
* 用法： string.repeat(n)
* */
// let str1 = '复制'
// let result = str1.repeat(2)
// consol.log(result) // 控制台打印：复制复制
//
// let str2 = '10'
// let result = str2.repeat(5)
// console.log(result) // 控制台打印：1010101010

/*
* 8. 字符串是否包含某字符(串) -- search()
* 说明：检索字符串中指定的或与正则表达式相匹配的首个子字符串。如果匹配到了则返回匹配字符串首字符下标，如果没有匹配到，则返回 -1
* 需求场景： 字符串内关键字的搜索查询定位。
* 用法： string.search(searchvalue)。
* */
// let str = "今天的夜色很好，月亮也很圆，唯一遗憾的是，我不是从你的窗子里看到的月亮。";
// let result1 = str.search('月亮');
// let result2 = str.search(/[,。]/);
// console.log(result1) // 控制台打印：8
// console.log(result2) // 控制台打印：7

/*
* 9. 字符串是否包含某个字符(串) -- include()
* 说明：includes()可选择从某处下标之后开始查找，返回true或false。第二个参数代表从某下标处开始查找，忽略则代表从下标0开始查找
* 它和search()区别在于：search()返回指定下标， includes()返回true或false；search()不能从指定下标开始查找， includes()可以从指定下标处开始查找
* 需求场景： 判断字符串中是否有不合法字符等
* 用法： string.includes(searchvalue, start)
* */
// let str = "没有夏日的的凉风，也没有冬日的暖阳，它们只是恰好出现在了合适的时间罢了"
// let result1 = str.includes('冬日');
// let result2 = str.includes('冬日', 20);
// console.log(result1); // 控制台打印：true
// console.log(result2); // 控制台打印：false

/*
* 10. 字符串中指定的字符串值在首次或最后一次出现的位置 -- indexOf()和 lastIndexOf()
* 说明：indexOf() 方法可返回某个指定的字符串值首次出现的位置，即从前向后搜索。如果指定第二个参数 start，则在字符串中的指定位置开始从前向后搜索
* lastIndexOf() 方法可返回某个指定的字符串值最后出现的位置，即从后向前搜索。如果指定第二个参数 start，则在字符串中的指定位置从后向前搜索
* 需求场景： 关键字首次或最后一次出现的位置
* 用法1： string.indexOf(searchvalue,start) 指定的字符串值首次出现的位置
* 用法2： string.lastIndexOf(searchvalue,start) 指定的字符串值最后出现的位置
* */
// let str = "你来人间一趟，你要看看太阳。和你的心上人一起走在街上，了解她，也要了解太阳";
// let result1 = str.indexOf("太阳")
// let result2 = str.indexOf("太阳", 10)  // 从10下标的字符开始查找"太阳"，查找范围是"太阳。和你的心上人一起走在街上，了解她，也要了解太阳"，下标还是相对原字符串而言的，因此返回11。
// let result3 = str.lastIndexOf("太阳")
// let result4 = str.lastIndexOf("太阳", 10)  // 0-10下标的字符串为"你来人间一趟，你要看看"，没有"太阳"，返回-1
// console.log(result1) // 控制台打印：11
// console.log(result2) // 控制台打印：11
// console.log(result3) // 控制台打印：35
// console.log(result4) // 控制台打印：-1

/*
* 11. 字符串转大小写 -- toLowerCase() 和 toUpperCase()
* 说明： 字符串大小写之间的转换
* 用法1： string.toLowerCase() 转成小写字母
* 用法2： string.toUpperCase() 转成大写字母
* */
// let str = "For you, A thousand times over"
// let result1 = str.toLowerCase()
// let result2 = str.toUpperCase()
// console.log(result1) // 控制台打印："for you, a thousand times over"
// console.log(result2) // 控制台打印："FOR YOU, A THOUSAND TIMES OVER"

/*
* 12. 字符串填充到指定长度 -- padStart() 和 padEnd()
* 说明： 字符串填充指定字符到指定长度
* 需求场景： 字符串长度不足，需要补充至指定长度n，如年月日，隐藏手机号，隐藏昵称等。
* 用法1： string.padStart(n,'补充内容') 从字符串前添加补充内容。
* 用法2： string.padEnd (n,'补充内容') 从字符串后添加补充内容。
* */
// 在字符串前补充"-"，直到字符串的长度为5
// let str1 = '预备开始'
// let result = str1.padStart(5, '-')
// console.log(result) // 控制台打印："---预备开始"
//
// //在末尾添加"*"，直到字符串的长度为11
// let str2 = "184"
// let result = str2.padEnd(11, "*")
// console.log(result) // 控制台打印："184********"

/*
* 13. 字符串是否以特定字符(串)开头或结尾 -- startsWith()、endsWith()
* 用法1： string.startsWith(searchvalue, start)
* 用法2： string.endsWith(searchvalue, start)
* */
// let str = "过去的时候，我们相视一笑，就已过了大半辈子"
// let result1 = str.startsWith("过去")
// let result2 = str.startsWith("过去", 10)
// let result3 = str.endsWith("半辈子")
// let result4 = str.endsWith("半辈子", 20)
// console.log(result1); // 控制台打印：true
// console.log(result2); // 控制台打印：false
// console.log(result3); // 控制台打印：true
// console.log(result4); // 控制台打印：false

/*
* 14. 字符串截取
* substr()  substr(startIndex,length)
* slice()   slice[startIndex,endIndex)
* substring()  substring[startIndex,endIndex)
* */
/*
*
*
* */


let str = '0123456789';
let result1 = str.substr(2, 5); // 从下标2开始，截取5位
let result2 = str.slice(2, 5); // 从下标2截取到下标5（不包含下标5）
let result3 = str.substring(2, 5); // 从下标2开始截取，截取到下标5（不包含下标5）

console.log(result1) // 控制台打印：23456
console.log(result2) // 控制台打印：234
console.log(result3) // 控制台打印：234
