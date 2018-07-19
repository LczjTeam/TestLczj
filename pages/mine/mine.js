Page({
  data: {
      src:'',
      vouchers:0
  },
  onLoad: function () {
    this.setHeadPic();
    

  },onShow(){
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/customer/loadByPhone',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // 当method 为POST 时 设置以下 的header 
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: wx.getStorageSync("customer").phone
      },
      success: (res) => {
        console.log(res.data);
        wx.setStorageSync("customer",res.data)
        this.setData({
          vouchers: res.data.voucher

        })
      },
      'fail': function (error) {
        console.log(error)
        wx.showToast({
          title: "优惠券信息获取失败",
          icon: 'none',
          duration: 2000
        });
      }
    })
  }
  , loadCoupon:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  }, shr:function(){
    wx.navigateTo({
      url: '../reciver/reciver',
    })
  }, order:function(){
    wx.navigateTo({
      url: '../order/order',
    })

  },
  recommend:function(){
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  }
  , person: function () {
    wx.navigateTo({
      url: '../person/person',
    })

  }, stores: function () {
    wx.navigateTo({
      url: '../stores/stores',
    })

  },services:function(){
    wx.navigateTo({
      url: '../services/services',
    })
  } ,
  exit:function(){
    wx.removeStorageSync('customer');
    wx.redirectTo({ 
      url: '../login/login?phone=-1',
    })
  },setHead:function(){ 

    if (this.data.username=='未登录'){

        wx.navigateTo({
          url: '../authorize/authorize',
        })

        return;
    }

    var srtype = [];
    wx.showActionSheet({
      itemList: ['拍照','相册'],
      success: (res)=> {
        console.log(res.tapIndex)
        if (res.tapIndex==0){
          srtype.push('camera');
        }else{
          srtype.push('album');
        }

        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: srtype, // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempImagePath = res.tempFilePaths[0];

            var customer = wx.getStorageSync("customer"); 
            wx.uploadFile({
              url: 'http://jx-lczj.nat300.top/Lczj/customer/updateFace', //仅为示例，非真实的接口地址
              filePath: tempImagePath,
              name: 'file',
              formData: {
                phone: customer.phone,
                face:''
              },
              success:  (res)=>{
                var data = res.data
                var head_url = "http://jx-lczj.nat300.top/Lczj/customerheads/" + res.data;
                console.log(head_url);
                this.setData({
                  src: head_url
                })
                customer.face = res.data;
                wx.setStorageSync('customer', customer);
                console.log(res.data)
              }
            }) 
          }
        })
      },
      fail:  (res)=> {
        console.log(res.errMsg)
      }
    })
  }, loadTrytowear:function(){
      wx.navigateTo({
        url: '../trytowear/trytowear',
      })
  },onShow:function(){
    this.setHeadPic();
  },
  setHeadPic:function(){
    if (wx.getStorageSync('customer') == null || wx.getStorageSync('customer').vip == null ) {
      var head_url = '../../images/icon/default_head.png';
      console.log(head_url);
      this.setData({
        src: head_url,
        username: '未登录'
      })
      return;

    }
    var head_url = "http://jx-lczj.nat300.top/Lczj/customerheads/" + wx.getStorageSync('customer').face;
    console.log(head_url);
    this.setData({
      src: head_url,
      username: wx.getStorageSync('customer').name
    }) 
  }
});