// pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     order:{},
     address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.removeStorageSync("orderAddress");
    var mywearvo1 =  wx.getStorageSync("orderdetail");
     
    this.setData({
      mywearvo: mywearvo1,
    })
 
    var params = {};
    params.customer = wx.getStorageSync('customer').vip;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/address/loadDefault',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        console.log(res.data)
        if (res.data == null  || res.data.length == 0){

        }else{
          this.setData({
            address: res.data[0]
          })
        }

      }
    })  

  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var addr =wx.getStorageSync("orderAddress");
    console.log(addr==null)
    if (addr==null || addr.address!=null){
      this.setData({ 
        address: addr
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  payment: function (event) {
    var that = this;
    console.log('去支付按钮点击事件')
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/wx/createUnifiedOrder',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 当method 为POST 时 设置以下 的header 
      header: { 
        'content-type': 'application/x-www-form-urlencoded'
       },
      data: { 
        openid: wx.getStorageInfoSync("openid")
      },
      success: function (res) {
        console.log(res.data)

        if (res.data.prepayId != '') {
          console.log('微信统一下单接口调用成功 数据包：' + res.data.prepayId);
          console.log('微信统一下单接口调用成功 订单号：' + res.data.outTradeNo);
          console.log('调用微信支付接口之前先生成签名')
          //保存订单号信息
          var outTradeNo = res.data.outTradeNo;
          wx.request({
            url: 'http://192.168.8.50:8080/matouwang/wechat/wechatAppletGolf/generateSignature',
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // 当method 为POST 时 设置以下 的header 
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              prepayId: res.data.prepayId
            },
            success: function (paryResult) {
              console.log(paryResult)

              if (paryResult.data.sign != '') {
                console.log('微信支付接口之前先生成签名成功')
                console.log('签名：' + paryResult.data.sign)
                console.log('随机串：' + paryResult.data.nonceStr)
                console.log('时间戳：' + paryResult.data.timeStamp)
                //这个applyId一定要大写 而且签名的参数和调用方法的参数值一定要统一
                wx.requestPayment({
                  'appId': '',
                  'timeStamp': paryResult.data.timeStamp,
                  'nonceStr': paryResult.data.nonceStr,
                  'package': paryResult.data.package,
                  'signType': 'MD5',
                  'paySign': paryResult.data.sign,
                  'success': function (paymentRes) {
                    console.log(paymentRes)
                    that.setData({
                      notPay: true,
                      paySuccess: false,
                      teamNotPay: true,
                      button: true,
                      outTradeNo: outTradeNo,
                      payDate: new Date()
                    })
                  },
                  'fail': function (error) {
                    console.log(error)
                  }
                })
              } else {
                console.log('微信支付接口之前先生成签名失败')
              }
            }
          })
        }
      }
    });
  }
})