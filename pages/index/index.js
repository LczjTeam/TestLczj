//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '进入我的小程序',
    src: '../../images/icon/logo.jpg',
    username: '乐潮之镜',
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
  }
  ,
  onLoad: function () {
    this.setInit();
  },
  onShow: function () {
    this.setInit();
  }
  ,
  setInit: function () {
 
    wx.setStorageSync('host', 'http://jx-lczj.nat300.top/Lczj'); 
    var customer = wx.getStorageSync("customer");

    if (customer == null || customer.vip == null) {
    
        wx.redirectTo({
          url: '../login/login?phone=-1',
        })
        return;
    }
    return;


    // if (customer != null && customer.vip != null ){
    //   var head_url = "http://jx-lczj.nat300.top/Lczj/customerheads/" + customer.face;
    //   console.log(head_url);
    //   this.setData({
    //     src: head_url,
    //     username: wx.getStorageSync('customer').name,
    //     hasUserInfo: true
    //   })  
    //   return;
    // }else{

    //   wx.redirectTo({
    //     url: '../login/login?phone=-1',
    //   })
    //   return;

    // }

    // if (app.globalData.userInfo) {
      
    //   this.setData({
    //     src: res.userInfo.avatarUrl,
    //     username: res.userInfo.nickName,
    //     hasUserInfo: true
    //   })
    //   console.log(this.data.userInfo.avatarUrl);

    //   wx.setStorageSync('head_url', this.data.userInfo.avatarUrl);
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       src: res.userInfo.avatarUrl,
    //       username: res.userInfo.nickName,
    //       hasUserInfo: true
    //     })
  
    //     console.log(JSON.stringify(this.data.userInfo,null,4));
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       console.log(JSON.stringify(app.globalData.userInfo));
    //       this.setData({
    //         src: res.userInfo.avatarUrl,
    //         username: res.userInfo.nickName,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // console.log(JSON.stringify(this.data.userInfo,null,4));




     
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      src: res.userInfo.avatarUrl,
      username: res.userInfo.nickName,
      hasUserInfo: true
    })
  },enter:function(){
    wx.navigateTo({
      url: '../glasses_1/glasses_1',
    });
  
  } 
})