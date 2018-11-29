Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success:function(res) {
        if (!res.authSetting['scope.userInfo', 'scope.camera']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: function () {
              wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                  this.setData({
                    userInfo: res.userInfo
                  })
                }.bind(this)
              })
              console.log(this.data)
            }.bind(this)
          })
        }
      }.bind(this)
    })
  },
  onTapJump: function(){
    // wx.navigateTo({
    //   url: '../book/book',
    // })
    wx.switchTab({
      url: '../book/book',
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