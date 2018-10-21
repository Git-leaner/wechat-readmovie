// pages/movie/detail/detail.js
const util = require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    movie:{},
    starUrl: [
      '/images/icon/wx_app_star.png',
      '/images/icon/wx_app_star@half.png',
      '/images/icon/wx_app_star@none.png'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id || '26942674';
    wx.getStorage({
      key: id,
      success: function(res) {
        this.setData({
          id:id,
          movie:res.data
        })
        console.log(res);
      }.bind(this),
      fail:function(err){
        var url = '/movie/subject/' + id;
        util.http(url, {}, function (res) {
          console.log(res);
          this.setStorage(id,res.data);
          this.setData({
            id:id,
            movie:res.data
          })
        }.bind(this))
      }.bind(this)
    })
  },
  setStorage(key, data) {
    wx.setStorage({
      key: key,
      data: data,
    })
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