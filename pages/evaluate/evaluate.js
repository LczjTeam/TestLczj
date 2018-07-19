// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate_contant: ['商品评价', '服务评价', '快递评价',],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/icon/no-star.png',
    selectedSrc: '../../images/icon/full-star.png',
    halfSrc: '../../images/icon/half-star.png',
    score: 3,
    scores: [3, 3, 3],
    evalute:""
  },
  InputEvalute:function(e){
    this.setData({
      evalute: e.detail.value
    })
  },
  //点击左边,半颗星
  selectLeft: function (e) {
    var score = e.currentTarget.dataset.score
    if (this.data.score == 0.5 && e.currentTarget.dataset.score == 0.5) {
      score = 0;
    }

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })

  },
  //点击右边,整颗星
  selectRight: function (e) {
    var score = e.currentTarget.dataset.score

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })
  },
  // 提交事件
  submit_evaluate: function () {
    console.log('评价得分' + this.data.scores)
    console.log('评价内容：' + this.data.evalute)
    
    wx.request({
      url: '',
      data:{
        order:"",
        goodsstar: this.data.scores[0]*2,
        servicestar: this.data.scores[1]*2,
        expressstar: this.data.scores[2]*2,
        comments: this.data.evalute,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
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