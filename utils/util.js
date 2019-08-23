const app = getApp()
const request = require('request.js')

export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取openid
export function getOpenId(relate) {
  // var that = this;
  wx.login({
    success: function (res) {
      request.request({
        url: `${app.globalData.API_URL}/appwx/getOpenId`,
        data: {
          appId: app.globalData.APP_ID,
          appScret: app.globalData.APP_SECRET,
          code: res.code,
        },
        success: relate,
        fail: function () { }
      })
    },
    fail: function () {
      console.log("login失败")
    }
  })
}

//多张图片上传
export function uploadimg(data, resolve) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  data.formData.sort = i
  console.log("upload")
  wx.uploadFile({
    url: app.globalData.API_URL + '/appphoto/uploadPhotoPic',
    filePath: data.path[i],
    name: 'file',
    header: { "Content-Type": "multipart/form-data" },
    formData: data.formData,
    success: (resp) => {
      success++;
      console.log(resp)
      console.log('path:', data.path[i])
      console.log('success', i);
      //这里可能有BUG，失败也会执行这里
    },
    fail: (res) => {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log('complete ++i', i);
      i++;
      if (i == data.path.length) {   //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        wx.hideLoading()
        wx.showModal({
          title: '上传成功',
          content: '所有图片已经上传成功!',
          showCancel: false,
          success: function () {
            wx.navigateTo({
              url: '../photo/photo',
            })
          }
        })
      } else {//若图片还没有传完，则继续调用函数
        console.log('complete', i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }

    }
  });
  console.log("upload_end")
}

//多张图片下载
export function downloadimg(data, resolve) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  console.log("upload")
  wx.downloadFile({
    url: app.globalData.API_URL + data.list[i].url,
    success: (resp) => {
      success++;
      console.log(resp)
      // console.log('path:', data.path[i])
      console.log('success', i);
      wx.saveFile({
        tempFilePath: resp.tempFilePath,
      })
      //这里可能有BUG，失败也会执行这里
    },
    fail: (res) => {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log('complete ++i', i);
      i++;
      if (i == data.list.length) {   //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        wx.showToast({
          title: '资源下载完毕',
        })

      } else {//若图片还没有传完，则继续调用函数
        console.log('complete', i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.downloadimg(data);
      }

    }
  });
  console.log("upload_end")
}


/*获取当前页url*/
export function getCurrentPageUrl() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

/*获取当前页带参数的url*/
export function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}



//计算天数差的函数，通用  
export function DateDiff(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2006格式  
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数  
  return iDays
}