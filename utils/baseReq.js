const app = getApp()
const request = require('request.js')

//获取首页轮播图  
export function findsilde(formdata ,resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findslide`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

/**
 * 收货地址相关
 */

// 查询用户收货地址   /appaddress/findUserAddress   openid
export function findUserAddress(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appaddress/findUserAddress`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}
// 新增收货地址   /appaddress/addUserAddress
export function addUserAddress(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appaddress/addUserAddress`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}
// 修改默认地址   /appaddress/editUserAddressIsDefault
export function editUserAddressIsDefault(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appaddress/editUserAddressIsDefault`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}
// 删除收货地址   /appaddress/deleteUserAddress
export function deleteUserAddress(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appaddress/deleteUserAddress`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}
// 查询默认地址 /apporder/findUserDefaultAddress
export function findUserDefaultAddress(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apporder/findUserDefaultAddress`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 我的团队   /appbasic/findUserBranch
export function findUserBranch(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findUserBranch`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 生成二维码   /appbasic/createUserRQCode
export function createUserRQCode(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/createUserRQCode`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 查询二维码   /appbasic/getUserRQCode
export function getUserRQCode(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/getUserRQCode`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 获取联系我们   /appbasic/findContact
export function findContact(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findContact`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 修改银行卡   /appbasic/editUserBankcard
export function editUserBankcard(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/editUserBankcard`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 删除银行卡   /appbasic/deleteUserBankcard
export function deleteUserBankcard(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/deleteUserBankcard`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 查询银行卡  /appbasic/findBankcardByOpenid
export function findBankcardByOpenid(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findBankcardByOpenid`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 新增银行卡   /appbasic/saveUserBankcard
export function saveUserBankcard(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/saveUserBankcard`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 设置默认银行卡   /appbasic/editUserBankcardIsDefault
export function editUserBankcardIsDefault(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/editUserBankcardIsDefault`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 查询默认银行卡   /appbasic/findDefaultBankcardByOpenid
export function findDefaultBankcardByOpenid(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findDefaultBankcardByOpenid`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 查询消息列表   appMessage/findMessage
export function findMessage(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appMessage/findMessage`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


// 根据code查询人员信息   appusermoney/findByUserCode
export function findByUserCode(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appusermoney/findByUserCode`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}