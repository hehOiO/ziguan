//  转小写
let lower = value => value.toLowerCase();

//  转大写
let upper = value => value.toUpperCase();

let TimeDate = function (timestamp, number) {
  let timestamp1
  if (String(timestamp).length == 10) {
    timestamp1 = Number(timestamp) * 1000;
  } else {
    timestamp1 = Number(timestamp);
  }
  const dateObj = new Date(+timestamp1); // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
  const year = dateObj.getFullYear(); // 获取年，
  const month = dateObj.getMonth() + 1; // 获取月，必须要加1，因为月份是从0开始计算的
  const date = dateObj.getDate(); // 获取日，记得区分getDay()方法是获取星期几的。
  const hours =
    dateObj.getHours() >= 10 ?
    dateObj.getHours() :
    "0" + dateObj.getHours();
  const minutes =
    dateObj.getMinutes() >= 10 ?
    dateObj.getMinutes() :
    "0" + dateObj.getMinutes(); // 获取分
  const seconds =
    dateObj.getSeconds() >= 10 ?
    dateObj.getSeconds() :
    "0" + dateObj.getSeconds(); // 获取秒

  if (number == '3') {
    return year + '-' + month + '-' + date
  } else {
    return year + '-' + month + '-' + date + '\n' + hours + ':' + minutes + ':' + seconds
  }
}
let sum = function (number) {
  var abs = Math.abs(number)
  number = Number(number);
  if (abs < 10000) {
    return number
  } else if (10000 <= abs && abs < 100000000) {
    return (number / 10000).toFixed(2) + '万'
  } else {
    return (number / 100000000).toFixed(2) + '亿'
  }
}
export {
  lower,
  upper,
  TimeDate,
  sum
}
