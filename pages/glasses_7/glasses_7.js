// pages/glasses_7/glasses_7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '../../images/jpgs/_1.jpg'
      }, {
        link: '/pages/logs/logs',
        url: '../../images/jpgs/_2.jpg'
      }, {
        link: '/pages/test/test',
        url: '../../images/jpgs/_3.jpg'
      }, {
        link: '/pages/test/test',
        url: '../../images/jpgs/_4.jpg'
      }, {
        link: '/pages/test/test',
        url: '../../images/jpgs/_5.jpg'
      }
    ], items: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    good:{},
    color: 0
  },
  imageLoad: function (e) {
    var res = wx.getSystemInfoSync();
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    this.setData({
      bannerHeight: res.windowWidth / ratio
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    var goods = wx.getStorageSync('goods');
    console.log(goods);
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/good/loadById', //仅为示例，并非真实的接口地址
      data: {
        code: goods
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)

        wx.setStorageSync('color', res.data.t_colors[0].color);


        this.setData({
          good : res.data,
          color: res.data.t_colors[0].color
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
  
  }, 
  next:function () {
    wx.redirectTo({ 
      url: '../glasses_8/glasses_8',
    })
  }, setVal: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    wx.setStorageSync('color', id);
    this.setData({
      color: id
    })
  }
})