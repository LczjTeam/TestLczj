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
    wx.removeStorageSync("zhpx");
    var p = wx.getStorageSync("params");
    var params = {};
    params.degress = p.left_ds > p.right_ds ? p.left_ds : p.right_ds;
    params.asdegress = p.left_sg > p.right_sg ? p.left_sg : p.right_sg;

    console.log(params.degress)
    console.log(params.asdegress)
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/eyeglass/eyeglasscommend',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        console.log(res.data);
        wx.setStorageSync('zhpx',res.data)
        
         this.setData({
           listData : res.data
         })
      }, fail: (error) => {
        wx.showToast({
          title: '数据获取失败！',
          icon: 'none',
          duration: 2000
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
    if (e.currentTarget.dataset.id == '1'){
      this.setData({
        listData: wx.getStorageSync('zhpx')
      })
    } else if (e.currentTarget.dataset.id == '2') {

      var lists = this.sortByPrice(sort);  
      this.setData({
        listData: lists
      })
    } else if (e.currentTarget.dataset.id == '3') {
      this.setData({
        listData: wx.getStorageSync('zhpx')
      })
    }



  }, sortByPrice:function(sort){
    var ls = wx.getStorageSync('zhpx');
    for(var i = 0 ; i < ls.length  ; i++ ){ 
      for (var j = i; j < ls.length; j++) {
        var it = ls[j];
        if(sort == 1){
          if (ls[i].t_eyeglass.price > it.t_eyeglass.price) {
            var itm = ls[i];
            ls[i] = it;
            ls[j] = itm; 
          }
        } else if (ls[i].t_eyeglass.price < it.t_eyeglass.price) {
          var itm = ls[i];
          ls[i] = it;
          ls[j] = itm; 
        }
      } 
      
    }
    console.log(ls);
    return ls;

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
    
    var sogood = wx.getStorageSync("zhpx");
    if(sogood!=null){
      this.setData({
        listData:sogood
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
  next: function () {
    wx.navigateTo({
      url: '../glasses_9/glasses_9',
    })
  } 
})