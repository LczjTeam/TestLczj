var wxutil = require('../../utils/wxutil.js')

Page({
  data: {
    currentTab: 0,
    listData: [[],,[],[],[]],
    states: [false, false, false, false], 
  },
  onLoad: function () { 
     this.loadCoupons(0); 
  },
  switchNav: function (e) {
    var page = this;
    var index = e.target.dataset.current;
    if (this.data.currentTab == index) {
      return false;
    } else {
      if (!this.data.states[index]){
        this.loadCoupons(index); 
      }

      this.setData({
        currentTab: index
      })
    }
  }, 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadCoupons(this.data.currentTab);
    wx.stopPullDownRefresh();
  },
  loadCoupons: function (flag) {

    var lists = this.data.listData;
    var statess = this.data.states;
    
    var params = {};
    params.customer = wx.getStorageSync("customer").vip;
    params.state = flag;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/orders/list',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.length == null){
          wx.showToast({
            title: '获取失败',
            duration:2000
          })
        }


        var list = [];
        for (var i = 0; i < res.data.length; i++) {
          var it = {};
          it.order = res.data[i].t_order; 
          var items = [];
          for (var j = 0; j < res.data[i].mywearVos.length; j++) {
            var item = {}
            item.selfphoto = "http://jx-lczj.nat300.top/Lczj" + res.data[i].mywearVos[j].t_mywear.selfphoto;
            item.showphoto = "http://jx-lczj.nat300.top/Lczj" + res.data[i].mywearVos[j].t_mywear.showphoto;
            item.price = res.data[i].mywearVos[j].goodsVo.t_goods.price + res.data[i].mywearVos[j].leftEyeglass.eyeglassVo.t_eyeglass.price;
            item.name = res.data[i].mywearVos[j].goodsVo.t_goods.name + '(' + res.data[i].mywearVos[j].goodsVo.t_brand.name + "  " + res.data[i].mywearVos[j].goodsVo.t_goods.models + ')';
            item.desc = '场景:' + res.data[i].mywearVos[j].t_occasion.name + '   脸型:' + res.data[i].mywearVos[j].t_face.name + '   左眼镜片:' + res.data[i].mywearVos[j].leftEyeglass.eyeglassVo.t_eyeglass.name + ' \t 右眼镜片:' + res.data[i].mywearVos[j].rightEyeglass.eyeglassVo.t_eyeglass.name; 
            items.push(item) 
          }
          it.items = items; 
          list.push(it);
        }
        console.log(JSON.stringify(list))
        lists[flag] = list;
        statess[flag] = true;
        this.setData({
          listData: lists,
          states: statess
        })
 
      }, fail: (error) => {
        wx.showToast({
          title: '数据获取失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })
 
  },detail:function(e){

    var id = e.currentTarget.dataset.id;
    console.log(id); 

    wx.navigateTo({
      url: '../orderdetail_1/orderdetail_1?order='+id+'&hide=1',
    })

  },
  del:function(e){
    var order = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/orders/delete',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 当method 为POST 时 设置以下 的header 
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        order: order 
      },
      success:  (res)=> {
        if (res.data) {
          wx.showToast({
            title: "删除成功！",
            icon: "success",
            duration: 2000
          });
          this.loadCoupons(this.data.currentTab); 
        }else{
          wx.showToast({
            title: "删除失败", 
            duration: 2000
          });
        }
      }, fail: (error) => {
        wx.showToast({
          title: '删除失败！',
          icon: 'none',
          duration: 2000
        })
      }});
  },
  evaluate:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../evaluate/evaluate?order='+id,
    })
  }

  ,pay:function(e){
    var order = e.currentTarget.dataset.id;
    var sum = e.currentTarget.dataset.price; 
    wxutil.wxpay(order,sum); 
  }
})