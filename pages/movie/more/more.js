const util = require('../../../util/util.js');
const PATH = {
  'TOP250': 'movie/top250',  //热映250
  'theater': 'movie/in_theaters', //正在热映
  'comming': 'movie/coming_soon' //即将上映
}
const startParam = {
  'start': 0,
  'count': 21
}
// pages/movie/more/more.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    postData:[],
    start:0,
    count:21,
    loading:false,
    starUrl: [
      '/images/icon/wx_app_star.png',
      '/images/icon/wx_app_star@half.png',
      '/images/icon/wx_app_star@none.png'
    ],
    noMore:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pathName = options.path ||'comming';
    console.log(options.path);
    wx.getStorage({
      key: this.pathName,
      success: function(res) {
        console.log(res);
        this.setData({
          title:res.data.title,
          postData: res.data.postData,
          start: res.data.postData.length
        })
      }.bind(this),
      fail: function(res) {
        this.loadData();
      }.bind(this),
      complete: function(res) {},
    })
  },
  loadData(){
    util.http(PATH[this.pathName], startParam, function (res) {
      console.log(res);
      var subjects = res.data.subjects;
      var title = res.data.title;
      if (subjects.length>0){
        subjects.forEach(item => {
          item.stars = util.stars(item.rating.average);
          item.title = item.title.length > 5 ? item.title.substr(0, 5) + '...' : item.title.substr(0, item.title.length);
          item.starUrl = this.data.starUrl;
        })
        var dataList = {
          'title': title,
          'postData': subjects
        }
        this.setData({
          title: dataList.title,
          postData: dataList.postData,
          start: dataList.postData.length
        })
        this.setStorage(this.pathName, dataList)
      }else{
        wx.showToast({
          title: '没有更多',
          icon: '',
          image: '',
          duration: 1000,
        })
        this.setData({
          noMore:true
        })
      }
    }.bind(this));
  },
  showdetail(e) {
    console.log(e);
    var id = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    if (!this.data.loading && !this.data.noMore) {
      this.setData({ loading: true })
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      var start = this.data.start + 1;
      var count = this.data.count;
      var loaded = this.data.postData;//拿上一次电影数组
      util.http(PATH[this.pathName], { start: start, count: count }, function (res) {
        console.log(res);
        var subjects = loaded.concat(res.data.subjects);
        var title = res.data.title;
        subjects.forEach(item => {
          item.stars = util.stars(item.rating.average);
          item.title = item.title.length > 5 ? item.title.substr(0, 5) : item.title.substr(0, item.title.length);
          item.starUrl = this.data.starUrl;
        });
        var dataList = {
          'title': title,
          'postData': subjects
        };
        this.setData({
          postData: dataList.postData,
          start: count + start,
          loading: false
        })
        this.setStorage('comming',dataList)
        wx.hideLoading();
      }.bind(this))
    }
  },
  setStorage(key,data){
    wx.setStorage({
      key: key,
      data: data,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})