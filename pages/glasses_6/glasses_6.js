// pages/glasses_6/glasses_6.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    listData : [],
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var list = wx.getStorageSync("recommends");


    var listInfo = [];
    for(var i = 0 ;  i < list.length ;i++){
      var item = {};
      item.goods = list[i].t_goods.goods;
      item.path = list[i].t_wears[0].path; 
      item.image = "http://jx-lczj.nat300.top/Lczj/goods/" + list[i].t_wears[0].path;
      listInfo.push(item);
    }
 



    var userInfo = options.src_url ;
    this.setData({
      listData : listInfo,  
      current: listInfo[0].goods,
      src:userInfo
    });
    console.log(JSON.stringify(this.data.listData, null, 4))

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
  resets: function () {
    wx.navigateBack(1);
  }, saveImage() {
    wx.downloadFile({
      url: this.data.src, //仅为示例，并非真实的资源
      success: (res) => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function (res) {
              var savedFilePath = res.savedFilePath
              wx.showToast({
                title: '保存成功',
                duration: 2000
              })
            }
          })
        }
      }
      ,
      error: err => {
        console.log(err.detail)
      }
    })
  }, setVal: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    wx.setStorageSync('goods', this.data.listData[id].goods);
    this.setData({
      current: id
    })
    var rs = wx.getStorageSync("src_dst");
    console.log(rs)
    
    var glass = this.data.listData[id].path;

    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/files/wearglasses', //仅为示例，并非真实的接口地址
      data: {
        root: rs.root,
        url: rs.src,
        glasses: glass,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
        rs.dst = res.data;
        wx.setStorageSync("src_dst", rs) 
        this.data.src = wx.getStorageSync('host') + res.data;
      }
    })
      
  },
  next:function(){
    wx.navigateTo({
      url: '../glasses_7/glasses_7',
    })
  } 
})