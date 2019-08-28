const app = getApp()
const request = require('request.js')


//首页VIP套餐    /appbasic/getVipGiftBagTop3
export function getVipGiftBagTop3(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/getVipGiftBagTop3`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 获取产品分类   /appbasic/getCategroyAll
export function getCategroyAll(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/getCategroyAll`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 根据分类ID获取商品详情   /appproduct/findProductByCategoryId
export function findProductByCategoryId(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appproduct/findProductByCategoryId`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 获取VIP商品信息    /appproduct/findProductByVip
export function findProductByVip(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appproduct/findProductByVip`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 获取积分商品    /appproduct/findIntegralProduct
export function findIntegralProduct(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appproduct/findIntegralProduct`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 获取美言分类视频-    /appproduct/findProductVideo
export function findProductVideo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appproduct/findProductVideo`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 查询用户是否已兑换视频   /appbasic/findUserVideoIsExchange
export function findUserVideoIsExchange(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/findUserVideoIsExchange`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 兑换积分视频   /apppay/payIntegralVideo
export function payIntegralVideo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/apppay/payIntegralVideo`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 增加播放量   /appbasic/editVideoTapNum
export function editVideoTapNum(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/editVideoTapNum`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}



// 根据商品id获取商品详情 /appproduct/findProductInfo
export function findProductInfo(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appproduct/findProductInfo`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

//首页热门商品    /appbasic/getHomeProduct
export function getHomeProduct(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appbasic/getHomeProduct`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


//保存收藏    appuserbase/ saveCollect
export function saveCollect(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appuserbase/saveCollect`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}
// 取消收藏 appuserbase/removeCollect
export function removeCollect(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appuserbase/removeCollect`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 保存评论 appuserbase/saveComment
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


// 查询人员收藏的对象列表 appuserbase/findUserCollect   openid page rows

export function findUserCollect(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appuserbase/findUserCollect`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 查询人员评论的对象列表 appuserbase/findUserComment
export function findUserComment(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appuserbase/findUserComment`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}

// 根据商品id查询评论列表 appuserbase/findCommentByProductId
export function findCommentByProductId(formdata, resolve) {
  formdata.sysCode = app.globalData.SYS_CODE
  formdata.sysName = app.globalData.SYS_NAME
  request.request({
    url: `${app.globalData.API_URL}/appuserbase/findCommentByProductId`,
    data: formdata,
    success: resolve,
    fail: function () { }
  })
}


