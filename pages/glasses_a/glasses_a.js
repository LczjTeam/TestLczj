// pages/glasses_a/glasses_a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src :"",
    btn_text:'确认保存',
    btn_type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 

    var rs = wx.getStorageSync("src_dst");
    console.log(rs)
    this.setData({
      src: (wx.getStorageSync('host') + rs.dst)
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
  
  },save:function(){
  
    var params = wx.getStorageSync("params");
    var rs = wx.getStorageSync("src_dst")  
  
    params.selfphoto =  "/"+rs.root+"/"+rs.src;
    params.showphoto = rs.dst;
    params.customer = wx.getStorageSync('customer').vip;
    params.goods = wx.getStorageSync('goods');
    params.color = wx.getStorageSync('color');
    params.left = wx.getStorageSync('left');
    params.right = wx.getStorageSync('right');

    console.log(params,null,4)

    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/mywear/add', //仅为示例，并非真实的接口地址
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        this.setData({ 
          btn_type: 1
        })
        
        console.log(res.data) 
        wx.setStorageSync('orderdetail', res.data)
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        });

        
      }, fail: (error) => {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }, back:function(){

    wx.switchTab({
      url: '../index/index',
    })

  }, goDetail:function () {
    console.log("orderdetail")
    wx.setStorageSync('_back', '1')
    wx.reLaunch({
      url: '../orderdetail/orderdetail',
    })
  }
})