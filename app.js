App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    var that = this

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          console.log("更新", res)
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },

  globalData: {
    SYS_CODE: 'Private-FruitShop',
    SYS_NAME: '私人水果店',

    API_URL: 'https://zygx360.com/xzdxw',
    //API_URL: 'http://192.168.0.160:8080/xzdxw',
    imgURL: 'http://zygx360.com:8081',
    APP_ID: 'wx714dbffba0b3a0c6',
    APP_SECRET: '9a0c8ef4f17f3f0683bc7855b74b241c',
    mchId: '1503498281',
    mchKey: '1cb9a0515114411ca841fd441dc0b1f0',
    desc: '私人水果店',
  }

})