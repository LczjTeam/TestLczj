// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2016-09-01", 
    sex: 1, 
    c_name:'',
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var customer = wx.getStorageSync('customer'); 
    this.setData({
      sex: customer.sex,
      c_name: customer.name,
      phone: customer.phone
    })
    if (customer.birthday!=null){
        this.setData({
          date: customer.birthday
        })
    }
  
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
    console.log(wx.getStorageSync('customer'));
    if (wx.getStorageSync('customer') == null || wx.getStorageSync('customer') == '') {
      wx.redirectTo({
        url: '../authorize/authorize',
      })
      return;
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
  
  },bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }, setSex: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.currentTarget.id);
    this.setData({
      sex: e.currentTarget.id+''
    });
  },
  listenerNameInput: function (e) { 
    this.data.c_name = e.detail.value; 
  }
  ,save:function(){

    var self = this;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/customer/update', //仅为示例，并非真实的接口地址
      data: {
        phone: self.data.phone,
        sex: self.data.sex,
        name: self.data.c_name,
        birthday: self.data.date,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => { 
        console.log(res.data) 
        if(res.data==true){
          var customer = wx.getStorageSync('customer'); 
          customer.sex =this.data.sex;
          customer.name = this.data.c_name;
          customer.birthday = this.data.date;
          wx.setStorageSync('customer', customer); 
          wx.showToast({
            title: '修改成功',
            icon:"success",
            duration:2000
          })
        }else{
          wx.showToast({
            title: '修改失败！',
            icon: "none",
            duration: 2000
          })
        }
      }
    })


  }
})