// pages/trytoware/trytoware.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    currentTab:0,
    cks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setDatas();
   
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
  
  },
  onPullDownRefresh() {
    setTimeout(() => {
      this.setDatas();
      wx.stopPullDownRefresh();
    }, 1000);
  }
  , setDatas:function(){
    var params = {};
    params.customer = wx.getStorageSync('customer').vip;
    console.log(params, null, 4)
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/mywear/listByCustomer', //仅为示例，并非真实的接口地址
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(JSON.stringify(res.data, null, 4));
        var list = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = {};
          item.mywear = res.data[i].t_mywear.mywear;
          item.selected = false;
          item.selfphoto = "http://jx-lczj.nat300.top/Lczj" + res.data[i].t_mywear.selfphoto;
          item.showphoto = "http://jx-lczj.nat300.top/Lczj" + res.data[i].t_mywear.showphoto;
          item.name = res.data[i].goodsVo.t_goods.name + '(' + res.data[i].goodsVo.t_brand.name + "  " + res.data[i].goodsVo.t_goods.models + ')';
          item.desc = '场景:' + res.data[i].t_occasion.name + '   脸型:' + res.data[i].t_face.name + '   左眼镜片:' + res.data[i].leftEyeglass.eyeglassVo.t_eyeglass.name + ' \t 右眼镜片:' + res.data[i].rightEyeglass.eyeglassVo.t_eyeglass.name ;
          list.push(item);
        }
        console.log(JSON.stringify(list))
        this.setData({
          listData: list,
          cks : [],
          currentTab: list.length == 0 ? 1:0
        }) 
      }
    })

  },
  //选择
  checkboxChange: function (e) {
    var ids = e.detail.value;
    console.log(ids);
    this.setData({
      cks:ids
    })
  }, 
  //删除
  dels: function () {
    if (this.data.cks.length == 0) {
      wx.showToast({
        title: '请先选择要删除的试戴信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    for (var i = 0; i < this.data.cks.length ; i++ ){
      var params = {}; 
      params.mywear = this.data.cks[i];
      console.log(params, null, 4)
      wx.request({
        url: 'http://jx-lczj.nat300.top/Lczj/mywear/delete',  
        data: params,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          console.log(JSON.stringify(res.data, null, 4));
          if(res.data){
            console.log("ok")
          }
        }
      })
    }
    

    var lists = [];
    for (var j = 0; j < this.data.listData.length; j++) {
      var itm = this.data.listData[j];
      console.log(itm);
      var ok = false;
      for (var i = 0; i < this.data.cks.length; i++) {
        if (this.data.cks[i] == itm.mywear){

           ok = true;
           break;
        } 
      }
      if (!ok) {
        lists.push(itm);
      }
    }

    this.setData({
      listData: lists,
      cks: [],
      currentTab: lists.length == 0 ? 1 : 0
    })
  



    wx.showToast({
      title: '删除成功！！',
      icon: 'success',
      duration: 2000
    });
    
  }, showDetail:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id); 
    wx.navigateTo({
      url: '../trytoweardetial/trytoweardetial?mywear='+id,
    })
  }
})