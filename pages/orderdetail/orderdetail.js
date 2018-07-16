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
  
  }
})