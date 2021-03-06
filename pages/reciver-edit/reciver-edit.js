// pages/reciver-edit/reciver-edit.js
var sorage = wx.getStorageSync("customer");
var vip = sorage.vip;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    customer: vip,
    consignee: "",
    address:"",
    phone: "",
    province: "",
    city: "",
    county: "",
    street: "",
    isdefault:""
  },

  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
    })
    this.setData({
      province: this.data.region[0],
      city: this.data.region[1],
      county: this.data.region[2]
    })
    console.log(this.data.province)
  },
  bindConsignee: function (e) {
    this.setData({
      consignee: e.detail.value
    })
  },
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindStreet: function (e) {
    this.setData({
      street: e.detail.value
    })
  },
  click: function (e) {
    /*this.setData({
        address:this.phone+"001"
    })*/
    var that = this;


    var params = {
      address:that.data.address,
      customer: that.data.customer,
      consignee: that.data.consignee,
      phone: that.data.phone,
      provincename: that.data.province,
      cityname: that.data.city,
      countyname: that.data.county,
      street: that.data.street,
      isdefault: that.data.isdefault
    }

    console.log(JSON.stringify(params, null, 4));


    wx.request({
      url: "http://jx-lczj.nat300.top/Lczj/address/update",
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log("提交成功!")
        wx.navigateBack({
          delta: 1
        })
      },fail:(error) => {
        wx.showToast({
          title: '更新失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      var it = options.it;
      console.log(it);
      wx.request({
        url: "http://jx-lczj.nat300.top/Lczj/address/loadByAddress",
        data:{
          address:it
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function(res) {
          
          console.log(res.data)
          var item= res.data;
          that.setData({
            address: item.address, 
            consignee: item.consignee,
            phone: item.phone, 
            street: item.street, 
            isdefault: item.isdefault,
            province:item.provincename,
            city:item.cityname,
            county:item.countyname
          })
        
          
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

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
  
  }
})