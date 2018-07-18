// pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     mywearvo:{},
     address:{},
     sum:0,
     voucher: 0,
     vouchers: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取优惠券数量
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/customer/loadByPhone',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 当method 为POST 时 设置以下 的header 
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("customer").phone
      },
      success:  (res) =>{
        console.log(res.data);
        this.setData({
          vouchers: res.data.voucher

        })
      },
      'fail': function (error) {
        console.log(error)
        wx.showToast({
          title: "优惠券信息获取失败",
          icon: none,
          duration: 2000
        });
      }
    })


    //设置优惠券信息
    wx.removeStorageSync("orderAddress");
    var mywearvo1 =  wx.getStorageSync("orderdetail");
     
    this.setData({
      mywearvo: mywearvo1, 
      sum : mywearvo1.leftEyeglass.eyeglassVo.t_eyeglass.price + mywearvo1.goodsVo.t_goods.price
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
    var order = wx.getStorageSync("order_code");
    console.log(order == null)
    if (addr == null) {
      wx.navigateBack(2)
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
  setVoucher:function(e){ 
    var v = this.data.voucher; 
    var vs = this.data.vouchers; 
    var sm = this.data.sum; 

    this.setData({
      voucher: (v == 0 ? 1:0),
      sum: (v == 0 ? sm - vs : sm + vs )
    })
  }
  ,
  payment: function (event) {

    if (this.data.address == null || this.data.address.address==null ){
      
      wx.showToast({
        title: '请先选择收货人 ~ ~',
      });
      return;
    }

    var that = this;
    console.log(wx.getStorageSync("openid"))
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/wx/createUnifiedOrder',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 当method 为POST 时 设置以下 的header 
      header: { 
        'content-type': 'application/x-www-form-urlencoded'
       },
      data: { 
        openid: wx.getStorageSync("openid"),
        address: this.data.address.address,
        mywear: this.data.mywearvo.t_mywear.mywear,
        customer: wx.getStorageSync("customer").vip,
        totalfee: this.data.sum,
        body : "智能选镜试戴商品",
        voucher: this.data.vouchers
      },
      success: function (res) {
        if (res.data.code ==null || res.data.code == 500){
          console.log(res.data.detail) 
          wx.showToast({
            title: res.data.detail,
            icon: none,
            duration: 2000
          });
          return;
        }
        
        console.log(res.data.detail) 

        var info = JSON.parse('{' + res.data.detail+'}')
        console.log('签名：' + info.paySign)
        console.log('APPID：' + info.appId)
        console.log('随机串：' + info.nonceStr)
        console.log('时间戳：' + info.timeStamp)
        console.log('bao：' + info.package)
        console.log('order：' + info.order)
        //这个applyId一定要大写 而且签名的参数和调用方法的参数值一定要统一
        wx.requestPayment({
          'appId': info.appId,
          'timeStamp': info.timeStamp,
          'nonceStr': info.nonceStr,
          'package': info.package,
          'signType': 'MD5',
          'paySign': info.paySign,
          'success': function (paymentRes) {
            
            wx.showToast({
              title: "支付成功",
              icon: "success",
              duration: 2000
            });

            wx.redirectTo({
              url: '../orderdetail_1/orderdetail_1?order='+info.order,
            })
            
          },
          'fail': function (error) {
            console.log(error)
            wx.showToast({
              title:"支付失败",
              icon: none,
              duration: 2000
            });
          }
        })    
      }
    });
  }, relaunch:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  }
})