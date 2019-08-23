const app = getApp()
const request = require('request.js')

//根据OPENID查询用户是否已存在
export function checkUserInfo(data, resolve) {
  request.request({
    url: `${app.globalData.API_URL}/appbasic/checkUserInfo`,
    data: data,
    success: resolve,
    fail: function() {}
  })
}

//注册用户信息
export function addUserInfo(data, resolve) {
  request.request({
    url: `${app.globalData.API_URL}/appbasic/addUserInfo`,
    data: data,
    success: resolve,
    fail: function() {}
  })
}


// 大厅红包列表(未抢完的)
export function getLandMineList(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/getLandMineList`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}

// 创建雷包
export function createLandMine(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/createLandMine`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}

// 创建雷包记录
export function getCreateGameRecList(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/getCreateGameRecList`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}



// 抢红包
export function grabRedPacket(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/grabRedPacket`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}
// 抢红包
export function grabSubsidy(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/grabSubsidy`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}
// 抢雷包记录
export function getGrabRedPacketList(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/getGrabRedPacketList`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}

// 单个雷包记录
export function getRedPacketListById(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/getRedPacketListById`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}



// 抢补助时间判断
export function getSubsidyDateState(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appLandMine/getSubsidyDateState`,
    data: formdata,
    success: resolve,
    fail: function() {},
    complete: function() {}
  })
}