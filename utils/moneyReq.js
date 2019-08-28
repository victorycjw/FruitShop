const app = getApp()
const request = require('request.js')

//查询是否领取优惠券  /appbasic/getNewUserCoupon
export function getNewUserCoupon(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/getNewUserCoupon`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 领取优惠卷   /appbasic/addUserCoupon
export function addUserCoupon(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/addUserCoupon`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 查询优惠卷   /apporder/findAvailableCoupon
export function findAvailableCoupon(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/findAvailableCoupon`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 生成支付 /apppay/payOrder
export function payOrder(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apppay/payOrder`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 查询充值有礼   appusermoney/findPayGift
export function findPayGift(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appusermoney/findPayGift`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 充值     /appbalance/addbalance
export function addbalance(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    // url: `${app.globalData.API_URL}/appbalance/addbalance`,    //准确
    url: `${app.globalData.API_URL}/apppay/addbalance`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 余额记录     /appbasic/findUserBalanceByType
export function findUserBalanceByType(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findUserBalanceByType`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 积分记录     /appbasic/findUserIntegralByType
export function findUserIntegralByType(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findUserIntegralByType`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 零钱记录     /appbasic//findUserDibsByType
export function findUserDibsByType(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findUserDibsByType`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 提现手续费 appusermoney/findCodeParamer
export function findCodeParamer(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appusermoney/findCodeParamer`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 提现零钱     appDeposit/saveDeposit
export function saveDeposit(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appDeposit/saveDeposit`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 提现记录   appDeposit/findDeposit
export function findDeposit(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appDeposit/findDeposit`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 零钱转余额   appusermoney/dibsEditBalance
export function dibsEditBalance(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appusermoney/dibsEditBalance`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}