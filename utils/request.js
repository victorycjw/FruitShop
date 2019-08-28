function request(obj) {
  var header = obj.header || {}
  if (!header['Content-Type']) {
    header['Content-Type'] = 'application/json'
  }
  // This must be wx.request !
  wx.request({
    url: obj.url,
    data: obj.data || {},
    method: obj.method || 'GET',
    header: header,
    success: function(res) {
      typeof obj.success == "function" && obj.success(res)
    },
    fail: obj.fail || function() {},
    complete: obj.complete || function() {}
  })
}

module.exports = {
  request: request
}