function wxpay(order,sum) {
  console.log(order);
  console.log(sum); 
  console.log(wx.getStorageSync("openid"))
  wx.request({
    url: 'http://jx-lczj.nat300.top/Lczj/wx/pay',
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // 当method 为POST 时 设置以下 的header 
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      order: order,
      openid: wx.getStorageSync("openid"),
      totalfee: sum,
      body: "智能选镜试戴商品"
    },
    success: function (res) {
      if (res.data.code == null || res.data.code == 500) {
        console.log(res.data.detail)
        wx.showToast({
          title: res.data.detail,
          icon: none,
          duration: 2000
        });
        return;
      }

      console.log(res.data.detail)

      var info = JSON.parse('{' + res.data.detail + '}')
      console.log('签名：' + info.paySign)
      console.log('APPID：' + info.appId)
      console.log('随机串：' + info.nonceStr)
      console.log('时间戳：' + info.timeStamp)
      console.log('bao：' + info.package)
      console.log('order：' + info.order)
      //这个applyId一定要大写 而且签名的参数和调用方法的参数值一定要统一
      wx.requestPayment({
        'appId': info.appId,
        'timeStamp': info.timeStamp,
        'nonceStr': info.nonceStr,
        'package': info.package,
        'signType': 'MD5',
        'paySign': info.paySign,
        'success': function (paymentRes) {

          wx.showToast({
            title: "支付成功",
            icon: "success",
            duration: 2000
          });

          wx.navigateTo({
            url: '../orderdetail_1/orderdetail_1?order=' + info.order + '&hide=1',
          })

        },
        'fail': function (error) {
          console.log(error)
          wx.showToast({
            title: "支付失败", 
            icon: "none",
            duration: 2000
          });
        }
      })
    }
  });

}

module.exports = {
  wxpay: wxpay
}