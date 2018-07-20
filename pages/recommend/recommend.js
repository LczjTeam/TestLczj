// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: '',
    typescolor: '',
    phone:''
  },

  /**
   * 推荐事件
   */
  recommend: function () {
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/newcustomer/add', //仅为示例，并非真实的接口地址
      data: {
        vip:wx.getStorageSync("customer").vip ,
        phone:this.data.phone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(JSON.stringify(res.data, null, 4));
        if(res.data) {
          wx.redirectTo({
              url: '../recommend_1/recommend_1',
          })
        }else{
          wx.showToast({
            title: '该手机号已被推荐过 ~ ~',
            duration:2000
          })
        }
      }, fail: (error) => {
        wx.showToast({
          title: '推荐错误！',
          icon: 'none',
          duration: 2000
        })
      }
      });
  },
  /**
   * 手机号输入提示及检测
   */
  bindKeyInput: function (e) {
    this.setData({
      phone: e.detail.value
    });

    if (this.data.phone == '' || this.data.phone.length != 11) {
      this.setData({
        types: 'warn',
        typescolor: '#E64340'
      })
    } else {

      this.setData({
        types: 'success',
        typescolor: 'green',

      });
    }
  }, 
 

 
})