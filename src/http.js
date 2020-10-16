import axios from 'axios'
import router from './router'
// import qs from 'qs'
if(process.env.NODE_ENV === 'production' ){
  $.ajax({
      url: 'serverconfig.json',
      async: false,
      type: 'get',
      dataType: "json",
      success: function (rs) {
          if (rs.ApiUrl) {
              axios.defaults.baseURL = rs.ApiUrl;
          }
      }
  });
}else{//开发环境
  axios.defaults.baseURL = 'https://admin.sxdi888.com';//在static下的config.js获取服务器地址
}
// 限制快速点击
var requesting = []

var limitTime = 2000 //請求間隔時間
axios.defaults.timeout = 5000; //响应时间


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头 
axios.defaults.async = true;
axios.defaults.crossDomain = true;
let CancelToken = axios.CancelToken
let source = CancelToken.source();

axios.interceptors.request.use(function (config) {
  // config.url = config.url + "?lang=zh"
  // config.url = config.url + "?lang=" + localStorage.getItem("lang")
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // console.log(config,888)
  // if (config.method === 'post') { // post请求时，处理数据
  //   config.data=qs.stringify({'token':sessionStorage.getItem("token")})
  //   if(config.data){
  //     // config.data = qs.stringify(config.data)
  //     console.log(config.data,1111)
  //   }else{
  //     // config.data=qs.stringify({})
  //     console.log(config.data,2222)
  //   }
  // }
  // 在发送请求之前做些什么
  if (sessionStorage.getItem('token')) {
    config.url = config.url + "?token=" + sessionStorage.getItem("token")
    // config.headers['token'] = sessionStorage.getItem("token")
  }
  // console.log(config)
  // console.log(source.token)
  // 限制快速点击
  var requestingId = JSON.stringify(config.data)
  if (config.method === 'post' && requestingId) {
    let nowTime = new Date().getTime()
    requesting = requesting.filter(item => {
      return item.startTime + limitTime > nowTime //筛选请求时间间隔
    })
    let sessionUrl = requesting.filter(item => {
      return item.requestingId === requestingId; //参数对比
    })

    if (sessionUrl.length > 0) {
      // 请求重复 中断请求（目前还没找到更好的方法，如果return false   会导致页面报错，虽然不影响页面效果及功能
      //此处通过修改请求（请求一个没多大作用并且返回快的地址），来达到只请求一次的效果，也可对其进行筛选
      // config.url = 'http://www.baidu.com';
      // config.method = 'post';
      // config.data.cancelToken = source.token
      // return config
      newConfig.cancelToken = source.token;
      return newConfig;
    } else {
      let item = {
        requestingId: requestingId,
        startTime: nowTime
      }
      requesting.push(item);
      return config
    }
  } else {
    return config;
  }
  // return config;
}, function (error) {
  console.log(error,'error')
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // if (response.data.code == 0 && response.data.token) { // 判断token是否存在，如果存在说明需要更新token
  //   sessionStorage.setItem('token', response.data.token) // 覆盖原来的token
  // } else { //401 过期token
  //   sessionStorage.removeItem('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
  //   router.replace("/login");
  // }
  // token 已过期，重定向到登录页面
  if (response.data.code == '401') {
    sessionStorage.removeItem('token')
    router.replace("/login");
  }
  // IE 8-9 
  if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
    try {
      // eslint-disable-next-line no-param-reassign
      response.data = JSON.parse(response.request.responseText);
    } catch (e) {
      // ignored
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
export default axios;
