// pages/book/book.js
var endInput;
const util=require('../../util/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postUrl:[
      "/images/post/post-1.jpg",
      "/images/post/post-2.jpg",
      "/images/post/post-3.jpg",
      "/images/post/post-4.jpg",
      "/images/post/post-5.jpg"
    ],
    starUrl:[
      '/images/icon/wx_app_star.png',
      '/images/icon/wx_app_star@half.png',
      '/images/icon/wx_app_star@none.png'
    ],
    bookList:[],
    bookName:'',
    placeHolder:'请输入书名/作者/出版社',
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:8083/v2/book/search?q=诺贝尔&count=30',
    //   method:'GET',
    //   header: {
    //     // 'content-type': 'application/json'
    //     'Content-Type': 'json'
    //   },
    //   success:function(res){
    //     var listData=res.data.books;
    //     listData.forEach((item)=>{
    //       item.stars = util.stars(item.score);
    //     });
    //     this.setData({
    //       bookList:listData
    //     })
    //   }.bind(this)
    // })
    var postData=require('../../data/data.json.js');
    var listData = postData.bookData.books;
    listData.forEach((item)=>{
      item.stars = util.stars(item.rating.average);
    });
    console.log(listData);
    this.setData({
      bookList: listData
    })
    // wx.getFileInfo({
    //   filePath: 'data/data.wxs',
    //   success(res){      },
    //   fail(res){      }
    // })
  },
  bookInput: function(e){
    clearTimeout(endInput);
    endInput= setTimeout(function(){
      console.log(e.detail.value);
      this.setData({
        bookName: e.detail.value
      })
    }.bind(this),500)
  },
  bookSearch: function(){
    wx.showLoading({
      title: '查找中',
    });
    wx.showNavigationBarLoading();
    var bookName=this.data.bookName;
    if(/^\s+$/g.test(bookName)){
      this.setData({
        msg:'请输入合法内容!'});
        return      
    }
    console.log(bookName);
    util.http('book/search',{
      q:bookName
    },function(res){
        var bookList = res.data.books;
        bookList.forEach((item) => {
          item.stars = util.stars(item.rating.average);
        });
        this.setData({
          bookList:bookList
        })
    }.bind(this))
    wx.hideLoading();
    wx.hideNavigationBarLoading();
  },
  showDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id='+id,
    })
    // wx.switchTab({
    //   url: '../detail/detail',
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