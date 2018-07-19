var app = getApp()
Page({
  data: {   
    listData:[],
    start:0
  },
  onLoad: function () {  
   this.setDatas();
  }, 
  setDatas: function (){ 
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/news/listByStart', //仅为示例，并非真实的接口地址
      data: {
        start: this.data.start,
        length: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        
        var s = this.data.start + 10; 
        var list = []
        if (this.data.listData != null){
           list = this.data.listData;
        }

        for(var i = 0 ; i < res.data.length ; i++){
          list.push(res.data[i]);
        }

        this.setData({ 
          listData:list,
          start: s
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
  onPullDownRefresh() { 
    setTimeout(() => {
      this.setData({
        start: 0,
        listData: []
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