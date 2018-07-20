var wxutil = require('../../utils/wxutil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    sum:0,
    hide:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.hide)
    if(options.hide != null){
      this.setData({
        hide:1
      })
    }
    var params = {};
    params.order = options.order;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/orders/loadById',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        console.log(res.data)
        
        this.setData({
          order: res.data
        }) 


        var sm = 0
        for(var i = 0 ; i < res.data.mywearVos.length ; i++ ){
          var item = res.data.mywearVos[i];
          sm += item.leftEyeglass.eyeglassVo.t_eyeglass.price + item.goodsVo.t_goods.price;
        }

        this.setData({
          sum: sm - res.data.t_order.voucher
        })
      }
    })


  }, 
  pay:function(e){
 
    var orders = this.data.order.t_order.order;
    var totalfees = this.data.order.t_order.totalfee;
    wxutil.wxpay(orders,totalfees);
  }
  ,
  home:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  }, express: function (e) {
    var express = e.currentTarget.dataset.express;
    var expressid = e.currentTarget.dataset.expressid;  
    wx.navigateTo({
      url: '../express/express?express=' + express + '&expressid=' + expressid,
    })
  },
  evaluate: function (e) { 
    wx.navigateTo({
      url: '../evaluate/evaluate?order=' + this.data.order.t_order.order,
    })
  }
})