// pages/product/productData/productData.js
const maskLayer = require('../../../utils/xmls/maskLayer/maskLayer.js'); //遮罩
const productReq = require("../../../utils/productReq.js")
const orderReq = require("../../../utils/orderReq.js")
const WxParse = require("../../../utils/wxParse/wxParse.js")
const app = getApp()
var num
Page({  
  dispric(){
    this.setData({
      showpric:true
    })
  },
  /** 
   * 页面的初始数据
   */
  data: {
    imgURL: app.globalData.imgURL,
    current: 0,
    spell:'',
    spellNo:"",
    showpric:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("----------------options--------------------")
    console.log("orderid是", options.orderId)
    console.log(options)
    var proId = options.proId
    var orderId = options.orderId
    var that=this
    num = 1

    if (orderId) {
      orderReq.getProductAndOrder({ orderId: orderId }, function (res) {
        console.log("res",res)
        proId = res.data.map.productId;
        that.setData({
          spellNo: res.data.map.spellNo,
          proId: proId,
          num: num
        })

        that.findProductInfo(proId)
        that.findCommentByProductId(proId)
      })
     }else{
      this.findProductInfo(proId)
     }
    
    var userInfo = wx.getStorageSync("userInfo")
    if (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }
  },
 
  findProductInfo: function(id) {
    var that = this
    var userId = wx.getStorageSync("userId") ? wx.getStorageSync("userId") : ''
    var formdata = {
      id: id,
      userId: userId
    }
    productReq.findProductInfo(formdata, function(res) {
      console.log("商品详情", res)
      that.setData({
        proData: res.data.map.product,
        proSpecList: res.data.map.productSpec,
        collect: res.data.map.collect,
        picList: res.data.map.picList,
        proColorList: res.data.map.productColour,
        proSizeList: res.data.map.productModel
      })

      WxParse.wxParse('article', 'html', res.data.map.product.details, that, 5);
    })
  },


  // 商品评价
  findCommentByProductId: function(proId) {
    var that = this
    var formdata = {
      toId: proId,
      page: 1,
      rows: 10
    }
    productReq.findCommentByProductId(formdata, function(res) {
      console.log('商品评价', res)
      that.setData({
        myEvaluate: res.data
      })
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 显示遮罩层
  showSpecification: function(e) {
    var that = this
    console.log(e)
    var userInfo = that.data.userInfo
    if (!userInfo) {
      wx.showToast({
        title: '还未登陆',
        image: '/images/errortip.png'
      })
      return false
    }
    maskLayer.showModal(that)
    that.setData({
      showSpecification: true,
      buttonType: e.currentTarget.dataset.name,
      index:e.currentTarget.dataset.index
    })
  },


  // 隐藏遮罩
  hideModal: function() {
    var that = this
    that.setData({
      showSpecification: false,
    })
    maskLayer.hideModal(that)
  },

  // 商品数量与减少
  add: function(e) {
    console.log(e);
    var that = this;
    var index = that.data.specIndex;
    
    var proSpecList = that.data.proSpecList;
    
    var spellPrice = that.data.spell;
    if (num < 999) {
      num += 1;
      spellPrice += proSpecList[index].spellPrice;
      that.setData({
        num: num,
        spell:spellPrice
      })
    } else {
      wx.showToast({
        title: '超过上限了',
        image: '/images/errortip.png'
      })
    }
  },
  minus: function(e) {
    var that = this;
    var index = that.data.specIndex;
    var proSpecList = that.data.proSpecList;
    var spellPrice = that.data.spell;
    if (num > 1) {
      num -= 1;
      spellPrice -= proSpecList[index].spellPrice;
      that.setData({
        num: num,
        spell: spellPrice
      })
    } else {
      wx.showToast({
        title: '超过下限了',
        image: '/images/errortip.png'
      })
    }
  },

  inputnumber: function(e) {
    var that = this

    num = Number(e.detail.value)
    if (num > 0) {
      that.setData({
        num: num
      })

    } else {
      wx.showToast({
        title: '填写错误',
        image: '/images/errortip.png'
      })
    }
  },

  // 规格选择
  specListChange: function(e) {
    var that =this;
    console.log(num);
    num=1;
    that.setData({
      num:num
    })
    var that = this
    var specIndex = e.detail.value;
    console.log(specIndex);
    var proSpecList = that.data.proSpecList;
    console.log(proSpecList);
    var spell = proSpecList[specIndex].spellPrice;
    var isSpell=proSpecList[specIndex].isSpell;
    console.log(isSpell);
    that.setData({
      isSpell:isSpell
    })
    that.setData({
      proSpecItem: proSpecList[specIndex],
      specIndex: specIndex,
      spell:spell
    })
  },
  // 收藏
  saveCollect: function() {
    var that = this
    var user_info = wx.getStorageSync("userInfo")
    var userId = wx.getStorageSync("userId")
    var wxOPENID = wx.getStorageSync("wxOPENID")
    var proData = that.data.proData
    var formdata = {
      userId: userId,
      userName: user_info.wxName,
      userPic: user_info.wxPic,
      userOpenid: wxOPENID,
      toCollectId: proData.id,
      toCollectName: proData.name
    }
    productReq.saveCollect(formdata, function(res) {
      console.log("收藏", res)
      that.findProductInfo(that.data.proId)
    })
  },
  // 取消收藏
  removeCollect: function() {
    var that = this
    var wxOPENID = wx.getStorageSync("wxOPENID")
    var formdata = {
      userOpenid: wxOPENID,
      toCollectId: that.data.proId
    }
    productReq.removeCollect(formdata, function(res) {
      console.log("取消收藏", res)
      that.findProductInfo(that.data.proId)
    })
  },

  addCarts: function() {
    var that = this
    var price
    var proSpecItem = that.data.proSpecItem
    var proData = that.data.proData
    var number = that.data.num
    var userInfo = that.data.userInfo
    var proColorList = that.data.proColorList
    var proSizeList = that.data.proSizeList
    var colorItem = that.data.colorItem
    var sizeItem = that.data.sizeItem
    if (proColorList && !colorItem) {
      wx.showToast({
        title: '先选择颜色',
        image: '/images/errortip.png'
      })
      return false
    }
    if (proSizeList && !sizeItem) {
      wx.showToast({
        title: '先选择型号',
        image: '/images/errortip.png'
      })
      return false
    }
    if (!proSpecItem) {
      wx.showToast({
        title: '先选择规格',
        image: '/images/errortip.png'
      })
    } else {
      var carts = null;
      if (that.data.buttonType == "shoppingSure") {
        wx.removeStorageSync("pintuan")
      }else{
        carts = wx.getStorageSync('carts')
      }
      if (!carts) {
        carts = []
      }
      console.log(carts);
      //if (carts.price == carts.oldprice){
        console.log(carts)
        console.log(proData.id)
        var result = 0
        var resultj = -1
        for (var j = 0; j < carts.length; j++) {
          var ooo = carts[j].productId == proData.id;
          console.log(proData.id);
          var iii = carts[j].productSpecId == proSpecItem.id;
          console.log(proSpecItem);
          console.log(ooo, iii)
          if (ooo && iii) { /* 购物车有此商品*/
            result = 1
            resultj = j
          }
        }
      console.log(resultj);
        if (resultj != -1) {
          wx.showToast({
            title: '存在此商品',
            image: '/images/errortip.png'
          })
          return;
        } else {
          if (userInfo.userType == 1) {
            price = proSpecItem.vipPrice
          } else if (that.data.buttonType == "shoppingSure"){
            price=that.data.spell;
            console.log(price);
          } else {
            price = proSpecItem.specPrice
            console.log(price)
          }
        }

      
          carts.push({
            isSpell:that.data.isSpell,
            checkState: true,
            productId: proData.id,
            productName: proData.name,
            productPic: proData.smallPic,
            productSpecId: proSpecItem.id,
            productSpecName: proSpecItem.specName,
            price: price,
            oldPrice: proSpecItem.specPrice,
            spellPrice:proSpecItem.spellPrice,
            vipPrice: proSpecItem.vipPrice,
            number: number,
            total: Number(price) * Number(number),
            model: sizeItem ? sizeItem.model : '',
            modelId: sizeItem ? sizeItem.id : '',
            colourId: colorItem ? colorItem.id : '',
            colour: colorItem ? colorItem.colour : '',
            spellNo:that.data.spellNo
          })
          console.log(that.data.buttonType);
          if (that.data.buttonType == "shopping") {
             wx.setStorageSync("carts", carts);
            wx.switchTab({
              url: '../../shopping/shopping',
            })
          } else if (that.data.buttonType == "shoppingSure"){
            console.log("carts:"+carts)
            wx.setStorageSync("pintuan", carts);
            console.log(carts);
            console.log(carts[0].price);
            
            if(carts[0].number==1){
              var price=carts[0].price;
            }else{
              var number = carts[0].number;
              var price=carts[0].total/number;
            }
            var number=carts[0].number;
            console.log(number);
            console.log(111);
            wx.navigateTo({
              url: '/pages/shoppingSure/shoppingSure?price='+price+'&number='+number+"&type=pintuan",
            })
          } else {
            wx.setStorageSync("carts", carts);
            wx.showToast({
              title: '加入购物车',
            })
          }
    }
    wx.setStorageSync("carts", carts)
    console.log(carts);


  },

  // swiper切换
  swiperchange: function(e) {
    var that = this
    var current = e.detail.current
    that.setData({
      current: current
    })
  },

  choosebaby: function(e) {
    var that = this
    console.log(e)
    var current = e.currentTarget.dataset.id
    that.setData({
      current: current
    })
  },

  // 预览轮播图
  previewImage: function(e) {
    var that = this
    var picList = that.data.picList
    var current = e.currentTarget.dataset.img
    var urls = new Array
    for (var i = 0; i < picList.length; i++) {
      urls.push(that.data.imgURL + picList[i].img)
    }
    console.log(urls)
    wx.previewImage({
      urls: urls,
      current: current
    })
  },

  // colorListChange 颜色选择
  colorListChange: function(e) {
    var that = this
    var colorIndex = e.detail.value
    var proColorList = that.data.proColorList
    that.setData({
      colorItem: proColorList[colorIndex],
      colorIndex: colorIndex
    })
  },

  // sizeListChange 颜色选择
  sizeListChange: function(e) {
    var that = this
    var sizeIndex = e.detail.value
    var proSizeList = that.data.proSizeList
    that.setData({
      sizeItem: proSizeList[sizeIndex],
      sizeIndex: sizeIndex
    })
  }



})