// pages/glasses_8/glasses_8.js

var ifClick = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    url:"../../images/icon/sort_default.png",
    isChecked:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var params = {};
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/eyeglass/list',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        console.log(res.data);
        
         this.setData({
           listData : res.data
         })
      }
    })
  },

  gofilter:function(){
    wx.navigateTo({
      url: '../filter/filter',
      success: function(res) {
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  clickAll:function(e){
    var that = this;
    this.setData({
      isChecked: e.currentTarget.dataset.id
    })
    console.log(this.data.isChecked)
    ifClick = !ifClick; 
    var sort = 0;
    if (this.data.isChecked=='2'){
      if (ifClick == true) {
        sort = 1
        this.setData({
          url: "../../images/icon/sort_up.png"
        })
      }
      else {
        sort = 2;
        this.setData({
          url: "../../images/icon/sort_down.png"
        })
      }
    }
    wx.request({
      url: '',
      data: {
        isChecked:this.data.isChecked,
        sort:sort
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
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
    var sogood = wx.getStorageSync("goods");
    this.setData({
      listData:sogood
    })
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
  next: function () {
    wx.navigateTo({
      url: '../glasses_9/glasses_9',
    })
  } 
})