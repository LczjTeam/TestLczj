// pages/exprss/exprss.js

var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wuliu: {
      "LogisticCode": "634067340947",
      "ShipperCode": "ZTO",
      "Traces": [{
        "AcceptStation": "【南昌市】  【南昌二部】（0791-88187848） 的 辛斌13677098502 （13677098502） 已揽收",
        "AcceptTime": "2018-06-27 19:43:46"
      }, {
        "AcceptStation": "【南昌市】  快件离开 【南昌二部】 发往 【南昌】",
        "AcceptTime": "2018-06-27 19:44:18"
      }, {
        "AcceptStation": "【南昌市】  快件到达 【南昌中转部】",
        "AcceptTime": "2018-06-27 20:59:41"
      }, {
        "AcceptStation": "【南昌市】  快件离开 【南昌中转部】 发往 【盘锦中转】",
        "AcceptTime": "2018-06-27 21:06:14"
      }, {
        "AcceptStation": "【盘锦市】  快件到达 【盘锦中转】",
        "AcceptTime": "2018-06-29 06:52:33"
      }, {
        "AcceptStation": "【盘锦市】  快件离开 【盘锦中转】 发往 【阜新】",
        "AcceptTime": "2018-06-29 06:52:51"
      }, {
        "AcceptStation": "【阜新市】  快件到达 【阜新】",
        "AcceptTime": "2018-06-29 12:52:03"
      }, {
        "AcceptStation": "【阜新市】  【阜新】 的八二18841820281（18841820281） 正在第1次派件, 请保持电话畅通,并耐心等待",
        "AcceptTime": "2018-06-29 14:34:14"
      }, {
        "AcceptStation": "【阜新市】  快件已在 【阜新】 签收,签收人: 本人, 感谢使用中通快递,期待再次为您服务!",
        "AcceptTime": "2018-06-29 17:23:58"
      }],
      "State": "3",
      "EBusinessID": "1363575",
      "Success": true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    console.log()
    var expCode = options.express.slice(options.express.indexOf('(') + 1, options.express.indexOf(')'));
    console.log(expCode)  
    console.log(options.expressid)   


    //查物流
    //快递公司和，快递单号
    var logistics = [expCode, options.expressid]
    //数据内容
    var RequestData = "{'OrderCode':'','ShipperCode':'" + logistics[0] + "','LogisticCode':'" + logistics[1] + "'}"
    //utf-8编码的数据内容
    console.log(RequestData)
    var RequestDatautf = encodeURI(RequestData)
    console.log("RequestDatautf:" + RequestDatautf)
    //签名
    console.log(RequestData + '4c81f84b-53cc-4b6d-bbba-5b7fcc3dd73c')
    var DataSign = encodeURI(util.Base64((util.md5(RequestData + '4c81f84b-53cc-4b6d-bbba-5b7fcc3dd73c'))))
    console.log("DataSign:" + DataSign)
    if (logistics != null) {
      wx.request({
        url: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
        data: {
          //数据内容(进行过url编码)
          'RequestData': RequestDatautf,
          //电商ID
          'EBusinessID': '1360386',
          //请求指令类型：1002
          'RequestType': '1002',
          //数据内容签名把（请求内容（未编码）+ApiKey）进行MD5加密，然后Base64编码，最后进行URL（utf-8）编码
          'DataSign': DataSign,
          //请求、返回数据类型： 2-json；
          'DataType': '2',
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
              //   success: (res) => { 
          console.log(res.data)

          var list = [];
          for (var i = res.data.Traces.length -1; i >= 0; i--) {
            list.push(res.data.Traces[i]);
          }

          that.setData({
            wuliu: {
              LogisticCode: options.expressid,
              ShipperCode: options.express,
              Traces :list,
              State: res.data.State
            }
          })
          
        }
      })
    }


    // wx.request({
    //   url: 'http://jx-lczj.nat300.top/Lczj/express/loadByInfo', //仅为示例，并非真实的接口地址
    //   data: {
    //     expCode: expCode, 
    //     expNo: options.expressid
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   success: (res) => { 
    //     console.log(res.data)
 
    //     var list = [];
    //     for (var i = res.data.Traces.length -1; i >= 0; i--) {
    //       list.push(res.data.Traces[i]);
    //     }


    //     this.setData({
    //       wuliu: {
    //         Traces :list
    //       }
    //     })
    //   }, fail: (error) => {
    //     wx.showToast({
    //       title: '数据获取失败！',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // })


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

  }
})