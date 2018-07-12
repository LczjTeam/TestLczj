// pages/shr/shr.js
var that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    it:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // wx.request({
    //   url: 'http://jx-lczj.nat300.top/Lczj/face/list', //仅为示例，并非真实的接口地址
    //   data: {
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res) => {
    //     console.log(res.data)

    //     lists = [];

    //     for (var i = 0; i < res.data.length; i++) {
    //       var item = {};
    //       var it = res.data[i];
    //       item.face = it.face;
    //       item.name = it.name;
    //       if (i == 0) item.style = 'margin-left:0px;';
    //       else item.style = ''; 
    //       lists.push(item);
    //     }

    //     console.log(lists)
      
    //     this.setData({
    //       listData: lists,
    //       currentFace: lists[0].face
    //     })
    //   }
    // })

  }, goAdd:function(e){
    wx.navigateTo({
      url: '../reciver-add/reciver-add',
    })
        
  },
    showPage:function(){
        var that = this;
        wx.request({
            url:"http://localhost:8087/Lczj/address/list",
            data:{},
            header:{
                'content-type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            success:function (res) {
                var lists = [];

                for(var i=0;i<res.data.length;i++){
                    var item = {};
                    var it = res.data[i];
                    item.address = it.address;
                    item.customer = it.customer;
                    item.consignee = it.consignee;
                    item.phone = it.phone;
                    item.street = it.street;
                    item.province = it.provincename;
                    item.city = it.cityname;
                    item.county = it.countyname;
                    item.isDefault = it.isdefault;
                    lists.push(item);

                }
                console.log(lists)

                that.setData({
                    listData:lists
                })
            }
        })
    },
    checkboxChange:function(e){
      wx.request({
          url:"http://localhost:8087/Lczj/address/updateDefault",
          data:{
              address:e.detail.value[1],
              customer: wx.getStorageSync("customer").vip,
          },
          method:"POST",
          header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          success: (res)=> {
              console.log("提交成功!");
              this.showPage();
              console.log(e.detail.value[0]);
              console.log(wx.getStorageSync("customer").vip);
          }
      })
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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

      this.showPage();
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
    this.showPage();
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