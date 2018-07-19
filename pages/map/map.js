// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    markers:[],
    shop:{},
    shop_png: "../../images/icon/shop.png",
    tel_png: "../../images/icon/telphone.png",
    address_png: "../../images/icon/address.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      var shopId = options.shop;
      console.log(shopId);
      wx.request({
        url: 'http://localhost:8087/Lczj/shops/loadById',
        method:"POST",
        data:{
          shop:shopId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          var _shop = res.data;
          console.log(_shop)
          that.setData({
            shop:_shop,
            latitude: _shop.pos_x,
            longitude: _shop.pos_y,
            markers:[{
              id : _shop.shop,
              latitude: _shop.pos_x,
              longitude: _shop.pos_y,
              name:_shop.name,
               iconPath: '../../images/icon/location.png',
               label: {
                 content: "    " + _shop.name + "\n    电话：" + _shop.phone + "    \n    详细地址：" + _shop.address +"    ",
                 color: "#ff0000",
                 fontSize: "16",
                 x:0,
                 y:-100,
                 borderRadius: "10",
                 bgColor: "#ffffff",
                 padding: "10",
                 borderWidth:1,
                 borderColor: "#ff0000"
               }
            }],
            
          })
          console.log(that.data.shop)
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('Shops');
    console.log(this.data.markers)
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