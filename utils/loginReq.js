const app = getApp()
const request = require('request.js')

//1注册账户
export function adduser(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/applogin/adduser`,
    data: formdata,
    success: resolve,
    fail: function(res) {
      console.log("网络超时", res)
      wx.hideLoading()
      wx.showToast({
        title: '网络超时!',
        image: "/images/errortip.png"
      })
    },
    complete: function() {

    }
  })
}


//根据userid查询用户信息
export function checkUserInfo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/applogin/checkUserInfo`,
    data: formdata,
    success: resolve,
    fail: function () { } 
  })
}

//完善信息     applogin/editDetailInfo
export function editDetailInfo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/applogin/editDetailInfo`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}



//根据code查询名称    appbasic/findShare
export function findShare(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findShare`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}