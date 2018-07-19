// pages/trytoweardetial/trytoweardetial.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    mywear : {},
    left_ds: {
      datas: [],
      index: 0,
      text: '0'
    },
    left_eyes: {
      types: ['近视', '远视'],
      index: 0,
      text: '近视'
    }, 
    left_sg: {
      datas: [],
      index: 0,
      text: '0'
    },
    left_zw: {
      datas: [],
      index: 0,
      text: '0'
    }, 
    right_eyes: {
      types: ['近视', '远视'],
      index: 0,
      text: '近视'
    },
     right_ds: {
      datas: [],
      index: 0,
      text: '0'
    },
    right_sg: {
      datas: [],
      index: 0,
      text: '0'
    },
    right_zw: {
      datas: [],
      index: 0,
      text: '0'
    }
  },
  bindLeftPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)



    this.setData({
      left_eyes: {
        types: ['近视', '远视'],
        index: e.detail.value,
        text: this.data.left_eyes.types[e.detail.value]
      }
    })

    //左眼近视类型
    wx.setStorageSync('left_type', this.data.left_eyes.types[e.detail.value])


  }, bindRightPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      right_eyes: {
        types: ['近视', '远视'],
        index: e.detail.value,
        text: this.data.right_eyes.types[e.detail.value]
      }
    })

    //右眼近视类型
    wx.setStorageSync('right_type', this.data.right_eyes.types[e.detail.value])


  }, bindLeftDsPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      left_ds: {
        datas: this.crateNums(0, 1600, 25),
        index: e.detail.value,
        text: this.data.left_ds.datas[e.detail.value]
      }
    });
    //左眼度数
    wx.setStorageSync('left_ds', this.data.left_ds.datas[e.detail.value])

  }, bindRightDsPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      right_ds: {
        datas: this.crateNums(0, 1600, 25),
        index: e.detail.value,
        text: this.data.right_ds.datas[e.detail.value]
      }
    });
    //右眼度数
    wx.setStorageSync('right_ds', this.data.right_ds.datas[e.detail.value])

  }, bindLeftSgPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      left_sg: {
        datas: this.crateNums(0, 1000, 25),
        index: e.detail.value,
        text: this.data.left_sg.datas[e.detail.value]
      }
    });
    //左眼散光度数
    wx.setStorageSync('left_sg', this.data.left_sg.datas[e.detail.value])

  }, bindRightSgPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      right_sg: {
        datas: this.crateNums(0, 1000, 25),
        index: e.detail.value,
        text: this.data.right_sg.datas[e.detail.value]
      }
    });
    //右眼散光度数
    wx.setStorageSync('right_sg', this.data.right_sg.datas[e.detail.value])

  }, bindLeftZwPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      left_zw: {
        datas: this.crateNums(0, 180, 5),
        index: e.detail.value,
        text: this.data.left_zw.datas[e.detail.value]
      }
    });
    //左眼散光轴位
    wx.setStorageSync('left_zw', this.data.left_zw.datas[e.detail.value])

  }, bindRightZwPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      right_zw: {
        datas: this.crateNums(0, 180, 5),
        index: e.detail.value,
        text: this.data.right_zw.datas[e.detail.value]
      }
    });
    //右眼散光轴位
    wx.setStorageSync('right_zw', this.data.right_zw.datas[e.detail.value])

  }, crateNums: function (min, max, dis) {
    var nums = [];
    for (var i = min; i <= max; i += dis) {
      nums.push(i);
    }
    //console.log(JSON.stringify(nums,null,4))
    return nums;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    


      console.log(options.mywear) 
      var params = {};

      params.mywear = options.mywear; 
      console.log(params, null, 4)
      wx.request({
        url: 'http://jx-lczj.nat300.top/Lczj/mywear/loadById', //仅为示例，并非真实的接口地址
        data: params,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {

          wx.setStorageSync('left_tpye', res.data.leftEyeglass.t_wearglass.wearglass)
          wx.setStorageSync('left_ds', res.data.leftEyeglass.t_wearglass.degress)
          wx.setStorageSync('left_sg', res.data.leftEyeglass.t_wearglass.asdegress)
          wx.setStorageSync('left_zw', res.data.leftEyeglass.t_wearglass.axis) 
          wx.setStorageSync('right_tpye', res.data.rightEyeglass.t_wearglass.wearglass)
          wx.setStorageSync('right_ds', res.data.rightEyeglass.t_wearglass.degress)
          wx.setStorageSync('right_sg', res.data.rightEyeglass.t_wearglass.asdegress)
          wx.setStorageSync('right_zw', res.data.rightEyeglass.t_wearglass.axis )

          this.setData({
            left_eyes: {
              types: ['近视', '远视'],
              index: res.data.leftEyeglass.t_wearglass.wearglass,
              text: res.data.leftEyeglass.t_wearglass.wearglass == 0 ? '近视':'远视'
            }
          });

          this.setData({
            right_eyes: {
              types: ['近视', '远视'],
              index: res.data.rightEyeglass.t_wearglass.wearglass,
              text: res.data.rightEyeglass.t_wearglass.wearglass == 0 ? '近视' : '远视'
            }
          });
          this.setData({
            left_ds: {
              datas: this.crateNums(0, 1600, 25),
              index: res.data.leftEyeglass.t_wearglass.degress/25,
              text: '' + res.data.leftEyeglass.t_wearglass.degress
            }
          });
          this.setData({
            right_ds: {
              datas: this.crateNums(0, 1600, 25),
              index: res.data.rightEyeglass.t_wearglass.degress/25,
              text: '' + res.data.rightEyeglass.t_wearglass.degress
            }
          });

          this.setData({
            left_sg: {
              datas: this.crateNums(0, 1000, 25),
              index: res.data.leftEyeglass.t_wearglass.asdegress / 25,
              text: '' + res.data.leftEyeglass.t_wearglass.asdegress
            }
          });
          this.setData({
            right_sg: {
              datas: this.crateNums(0, 1000, 25),
              index: res.data.rightEyeglass.t_wearglass.asdegress / 25,
              text: '' + res.data.rightEyeglass.t_wearglass.asdegress
            }
          });

          this.setData({
            left_zw: {
              datas: this.crateNums(5, 180, 5),
              index: (res.data.leftEyeglass.t_wearglass.axis / 5) - 1,
              text: '' + res.data.leftEyeglass.t_wearglass.axis
            }
          });
          this.setData({
            right_zw: {
              datas: this.crateNums(5, 180, 5),
              index: (res.data.rightEyeglass.t_wearglass.axis / 5)-1,
              text: '' + res.data.rightEyeglass.t_wearglass.axis
            }
          });


          this.setData({
             mywear : res.data
          }) 
        }, fail: (error) => {
          wx.showToast({
            title: '数据获取失败！',
            icon: 'none',
            duration: 2000
          })
        }
      });

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
  
  }, previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表
    })
  },save:function(e){

    var params = {};
    params.mywear = this.data.mywear.t_mywear.mywear;
    // params.customer = wx.getStorageSync("customer").vip;
    params.left_type = wx.getStorageSync('left_type');
    params.left_ds = wx.getStorageSync('left_ds');
    params.left_sg = wx.getStorageSync('left_sg');
    params.left_zw = wx.getStorageSync('left_zw'); 
    params.right_type = wx.getStorageSync('right_type'); 
    params.right_ds = wx.getStorageSync('right_ds');
    params.right_sg = wx.getStorageSync('right_sg');
    params.right_zw = wx.getStorageSync('right_zw');

    console.log(params)
    wx.request({
      url: 'http://jx-lczj.nat300.top/Lczj/mywear/update',
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: (res) => {
        console.log(res.data)
        wx.setStorageSync("orderdetail", res.data);
        wx.setStorageSync('_back', '0')
        wx.navigateTo({
          url: '../orderdetail/orderdetail',
        })

      }, fail: (error) => {
        wx.showToast({
          title: '更新失败！',
          icon: 'none',
          duration: 2000
        })
      }
    })



  }  
})