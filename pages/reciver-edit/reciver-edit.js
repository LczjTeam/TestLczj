// pages/reciver-edit/reciver-edit.js
var model = require('../../model/model.js')

var show = false;
var item = {};
var sorage = wx.getStorageSync("customer");
var vip = sorage.vip;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    it:{},
    customer: vip,
    province:"",
    city:"",
    county:""
  },

  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },

  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },

  click: function (e) {
    /*this.setData({
        address:this.phone+"001"
    })*/
    var that = this;


    var params = {
      address:that.data.it.address,
      customer: that.data.customer,
      consignee: that.data.it.consignee,
      phone: that.data.it.phone,
      provincename: that.data.province,
      cityname: that.data.city,
      countyname: that.data.county,
      street: that.data.it.street,
      isdefault: that.data.it.isdefault
    }

    console.log(JSON.stringify(params, null, 4));


    wx.request({
      url: "http://localhost:8087/Lczj/address/update",
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log("提交成功!")
        wx.navigateBack({
          delta: 1
        })
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      var it = options.it;
      console.log(it);
      wx.request({
        url: "http://localhost:8087/Lczj/address/loadByAddress",
        data:{
          address:it
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function(res) {
          
          console.log(res.data)
          item= res.data;
          that.setData({
            it:item,
            province:item.provincename,
            city:item.cityname,
            county:item.countyname
          })
        
          
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  }
})