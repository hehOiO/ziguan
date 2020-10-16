import request from '@/http'

export function passlogin(query) { //用户密码登录
  return request({
    url: '/api/account/login',
    method: 'get',
    params: query
  })
}
export function acclist(data) { //账户列表
  return request({
    url: '/api/index/getAccountList',
    method: 'post',
    data
  })
}
export function accinfo(data) { //资产详情
  return request({
    url: '/api/index/tradeAccountInfo',
    method: 'post',
    data
  })
}
export function addaccount(data) { //添加账户接口
  return request({
    url: '/api/account/addAccount',
    method: 'post',
    data
  })
}
export function swiaccount(query) { //切换账户 接口
  return request({
    url: '/api/account/switchAccount',
    method: 'get',
    params: query
  })
}
export function setpass(data) { //修改密码
  return request({
    url: '/api/account/changePwd',
    method: 'post',
    data
  })
}

export function searchstock(data) { //股票 模糊搜索
  return request({
    url: '/api/stock_situation/searchStock',
    method: 'post',
    data
  })
}
export function getexponent(data) { //股票指数 接口
  return request({
    url: '/api/stock_situation/getExponent',
    method: 'post',
    data
  })
}
export function getszStock(data) { //股票 后4种类型接口
  return request({
    url: '/api/stock_situation/getShSzStock',
    method: 'post',
    data
  })
}

export function getStockDetail(data) { //单个 股票详情
  return request({
    url: '/api/stock_situation/getStockDetailInfo',
    method: 'post',
    data
  })
}
export function addChoose(data) { //添加自选
  return request({
    url: '/api/stock_situation/addChoose',
    method: 'post',
    data
  })
}
export function deleteChoose(data) { //删除自选
  return request({
    url: '/api/stock_situation/deleteChoose',
    method: 'post',
    data
  })
}
export function createStrategy(query) { //委托买入
  return request({
    url: '/api/order/createStrategy',
    method: 'get',
    params: query
  })
}
export function sellStrategy(query) { //委托卖出
  return request({
    url: '/api/order/sellStrategy',
    method: 'get',
    params: query
  })
}
export function checkStrategy(data) { // 持仓
  return request({
    url: '/api/index/checkStrategy',
    method: 'post',
    data
  })
}
export function getStrategy(query) { //当日委托
  return request({
    url: '/api/index/getStrategy',
    method: 'get',
    params: query
  })
}
export function getStrategyHistory(query) { //历史委托
  return request({
    url: '/api/index/getStrategyHistory',
    method: 'get',
    params: query
  })
}
export function getStrategyDeal(query) { //当日成交
  return request({
    url: '/api/index/getStrategyDeal',
    method: 'get',
    params: query
  })
}
export function getStrategyDealHistory(query) { //历史成交
  return request({
    url: '/api/index/getStrategyDealHistory',
    method: 'get',
    params: query
  })
}
export function cancelStrategy(query) { //撤单 列表
  return request({
    url: '/api/order/cancelStrategy',
    method: 'get',
    params: query
  })
}
export function cancelStrategy1(data) { //撤单某只股票  post 
  return request({
    url: '/api/order/cancelStrategy',
    method: 'post',
    data
  })
}
export function logout(data){//退出登录 get
  return request({
    url: '/api/account/logout',
    method: 'get',
    data
  })
}
export function getMoneyWater(data) { //资金流水
  return request({
    url: '/api/index/getMoneyWater',
    method: 'post',
    data
  })
}
export function getStrategyOrder(query) { //交割单
  return request({
    url: '/api/index/getStrategyOrder',
    method: 'get',
    params: query
  })
}
export function cancelAllStrategy(query) { //全撤
  return request({
    url: '/api/order/cancelAllStrategy',
    method: 'get',
    params: query
  })
}
export function getStrategyDealDetail(data) { // 查看成交明细
  return request({
    url: '/api/index/getStrategyDealDetail',
    method: 'post',
    data
  })
}
export function waterType(query) { // 查看资金流水类型
  return request({
    url: '/api/index/waterType',
    method: 'get',
    params: query
  })
}
export function KLine(data) { // k线图
  return request({
    url: '/api/stock_situation/KLine',
    method: 'post',
    data
  })
}
export function minLine(data) { // 分时图
  return request({
    url: '/api/stock_situation/minLine',
    method: 'post',
    data
  })
}
export function delAccount(data) { // 删除账户
  return request({
    url: 'api/account/delAccount',
    method: 'post',
    data
  })
}