// pages/stores/stores.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    shop:"../../images/icon/shop.png",
    tel:"../../images/icon/telphone.png",
    address:"../../images/icon/address.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/shops/list',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        var lists = [];

        for (var i = 0; i < res.data.length; i++) {
          var item = {};
          var it = res.data[i];
          item.shop=it.shop;
          item.name = it.name;
          item.address = it.address;
          item.phone = it.phone;
          lists.push(item);

        }
        console.log(lists)

        that.setData({
          listData: lists
        })
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