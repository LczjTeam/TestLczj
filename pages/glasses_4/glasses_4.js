var app = getApp()
Page({
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
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad test');

    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/model/list', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)

       var  lists = [];

        for (var i = 0; i < res.data.length; i++) {
          var item = {};
          var it = res.data[i];
          item.face = it.t_model.model;
          item.name = it.t_model.name;  
          item.url = it.t_model.photo;  
          item.photo1 = 'http://jx-lczj.nat300.top/Lczj/models/' + it.t_model.photo; 
          lists.push(item);
        }

        console.log(lists) 
        this.setData({
          items: lists
        })
      }, fail: (error) => {
        wx.showToast({
          title: '数据获取失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })



  }, goes: function (event) {
    var url = event.currentTarget.dataset.url;
    console.log(url);
    console.log(wx.getStorageSync("default-path"));
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/files/wearglasses', //仅为示例，并非真实的接口地址
      data: {
        root:'models',
        url:url,
        glasses: wx.getStorageSync("default-path"),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)  

        var rs = {};
        rs.root = 'models';
        rs.src = url;
        rs.dst =  res.data; 
        wx.setStorageSync("src_dst", rs)  

        wx.navigateTo({
          url: '../glasses_6/glasses_6?src_url=' + wx.getStorageSync('host') + res.data,
        })
      }
    })
  } 
})  