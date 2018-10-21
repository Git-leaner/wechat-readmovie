// pages/setting/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude:'',
    controls: [{
      id: 0,
      iconPath: '/images/icon/search.png',
      position: {
        left: 30,
        top: 30,
        width: 30,
        height: 30,
      },
      clickable:true,
    }],
    circles:{
      latitude:'',
      longitude:'',
      colro:'#368',
      fillerColor:'#468',
      radius:100,
      strokeWidth:3
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        console.log(res);
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }.bind(this),
    })
  },
  controls(e){
    console.log(e);
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