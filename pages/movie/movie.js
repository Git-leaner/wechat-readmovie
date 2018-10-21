const util = require('../../util/util.js');
const PATH = {
  'TOP250': 'movie/top250?start=0&count=3',  //热映250
  'theater': 'movie/in_theaters?start=0&count=3', //正在热映
  'comming': 'movie/coming_soon?start=0&count=3' //即将上映
}
const startParam = {
  'start': 0,
  'count': 3
}
// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieList:{},
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
    var dataList=[];
    wx.getStorage({
      key: 'movie',
      success: function(res) {
        console.log(res);
        dataList = res.data;
        this.setData({
          movieList: dataList
        })
      }.bind(this),
      fail:function(res){
        this.loadData();
      }.bind(this)
    })
  },
  loadData(){
    var dataList = [];
    var item = {};
    var index = 0;
    for (let key in PATH) {
      util.http(PATH[key], { startParam}, function (res) {
        console.log(res);
        var subjects = res.data.subjects;
        var title = res.data.title;
        subjects.forEach(item => {
          item.stars = util.stars(item.rating.average);
          item.title = item.title.length > 5 ? item.title.substr(0, 5) : item.title.substr(0, item.title.length);
          item.starUrl = this.data.starUrl;
        })
        var item = {
          'title': title,
          'postData': subjects,
          'path': PATH[key],
          'key':key
        }
        dataList.push(item);
        this.setData({
          movieList: dataList
        })
        wx.setStorage({
          key: 'movie',
          data: dataList,
        })
        console.log(this.data.movieList);
      }.bind(this))
    }
  },
  more(e){
    console.log(e);
    var path = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: './more/more?path=' + path,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showdetail(e){
    console.log(e);
    var id=e.currentTarget.dataset.title;
    wx.navigateTo({
      url: './detail/detail?id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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