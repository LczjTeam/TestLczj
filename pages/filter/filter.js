// pages/filter/filter.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brands:[],
    brand:[],      //传出去的参
    efficacys:[],
    efficacy:"",     //传出去的参
    prices:[
      {
        id:0,
        low:0,
        high:'~'+200,
        isChecked:false
      },
      {
        id:1,
        low: 200,
        high: '~'+500,
        isChecked: false
      },
      {
        id:2,
        low:500,
        high:'~'+1000,
        isChecked: false
      },
      {
        id:3,
        low:1000,
        high:"以上",
        isChecked: false
      }
    ],
   price:{}
  },
  showPage: function () {
    var that = this;
    wx.request({
      url: "http://localhost:8087/Lczj/brand/list",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        var lists = [];

        for (var i = 0; i < res.data.length; i++) {
          var item = {};
          var it = res.data[i];
          item.brand = it.brand;
          item.name = it.name;
          item.company = it.company;
          item.type = it.type;
          item.recommend = it.recommend;
          item.isChecked = false;
          lists.push(item);

        }
        console.log(lists)

        that.setData({
          brands: lists
        })
      }
    }),
      wx.request({
      url: "http://localhost:8087/Lczj/efficacy/list",
        data: {
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          var lists = [];

          for (var i = 0; i < res.data.length; i++) {
            var item = {};
            var it = res.data[i];
            item.efficacy = it.efficacy;
            item.name = it.name;
            item.isChecked = false;
            lists.push(item);
          }
          console.log(lists)

          that.setData({
            efficacys: lists
          })
        }
      })
  },
  checkboxChange:function(e){
    var array=[];
    console.log(e.currentTarget.dataset.id);
    console.log(this.data.brands);
    var items = this.data.brands;
    
    for(var i=0;i<items.length;i++)
    {
      //console.log(items[i]);
      if (items[i].brand == e.currentTarget.dataset.id)
      {
        items[i].isChecked = !items[i].isChecked;
        console.log(items[i].isChecked);
        console.log(items[i]);
        break;
      }
    }
    
    for (var i = 0; i < items.length; i++)
    {
      if(items[i].isChecked == true)
        array.push(items[i].brand);
    }
    console.log(array);
    this.setData({
      brands:items,
      brand:array
    })
  },
  checkboxChange1: function (e) {
    var efficacy_item;
    console.log(e.currentTarget.dataset.id);
    console.log(this.data.efficacys);
    var items = this.data.efficacys;

    for (var i = 0; i < items.length; i++) {
      //console.log(items[i]);
      if (items[i].efficacy != e.currentTarget.dataset.id) {
        items[i].isChecked = false;
      } else {
        items[i].isChecked = !items[i].isChecked;
        //console.log(items[i].isChecked);
        //break;
        efficacy_item = items[i].efficacy;
      }

    }
    console.log(efficacy_item);
    this.setData({
      efficacys: items,
      efficacy: efficacy_item
    })
  },

  checkboxChange2: function (e) {
    var price_item={};
    console.log(e.currentTarget.dataset.id);
    console.log(this.data.prices);
    var items = this.data.prices;

    for (var i = 0; i < items.length; i++) {
      //console.log(items[i]);
      if (items[i].id != e.currentTarget.dataset.id) {
        items[i].isChecked = false;
      } else {
        items[i].isChecked = !items[i].isChecked;
        //console.log(items[i].isChecked);
        //break;
        price_item.low = items[i].low;
        //console.log(price_item.low)
        price_item.high = items[i].high;
      }

    }
    console.log(price_item);
    this.setData({
      prices: items,
      price: price_item
    })
  },
  click:function(e){
    var that=this;
    wx.request({
      url: '',
      data:{
        brand:that.data.brand,
        price:that.data.prices,
        efficacy:that.data.efficacy
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log("提交成功!")

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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