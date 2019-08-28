const app = getApp()
const request = require('request.js')

//生成订单     /apporder/buildeOrderInfo
export function buildeOrderInfo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/buildeOrderInfo`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

//获取拼单
export function buildeSpellInfo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appSpell/buildeSpellInfo`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}




// 微信支付更新订单状态   /apporder/updateOrderWxPaySuccess
export function updateOrderWxPaySuccess(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/updateOrderWxPaySuccess`,
    data: formdata,
    success: resolve, 
    fail: function () { }
  })
} 

//查询用户所有订单 /apporder/findUserAllOrder
export function findUserAllOrder(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/findUserAllOrder`,
    data: formdata, 
    success: resolve,
    fail: function () { }
  })
}

// 确认收货   /apporder/updateOrderStateRecipient
export function updateOrderStateRecipient(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/updateOrderStateRecipient`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

//保存评论     appuserbase/saveComment
export function saveComment(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appuserbase/saveComment`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

//获取订单数量    /apporder/findUserOrderCount
export function findUserOrderCount(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/findUserOrderCount`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 取消订单
export function cancelOrder(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/cancelOrder`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 退款订单   apporder/saveOrderRefund
export function saveOrderRefund(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/saveOrderRefund`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 获取商品   apporder/saveOrderRefund
export function getProductAndOrder(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/getProductAndOrder`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}