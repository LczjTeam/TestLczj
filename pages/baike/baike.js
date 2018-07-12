var app = getApp()
Page({
  data: {   
    listData:[],
    start:0
  },
  onLoad: function () {  
   this.setDatas();
  },setDatas:function(){
    var self = this;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/news/listByStart', //仅为示例，并非真实的接口地址
      data: {
        start: self.data.start,
        length: 20
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        
        var s = self.data.start + 20;
        console.log(res.data)
        self.setData({
          listData: res.data,
          start: s
        })
      }
    })
  },
  onPullDownRefresh() { 
    setTimeout(() => {
      this.setData({
        start: 0
      });
      this.setDatas();
      wx.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom() {
    

    if (this.data.listData.length % 5 == 0) { 
      this.setDatas();
    } else {
      wx.showToast({
        title: '没有更多数据了！',
        icon:"none",
        duration:2000
      })
    }
  }
  
})  