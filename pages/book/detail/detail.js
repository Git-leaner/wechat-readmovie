// pages/book/detail/detail.js
const util=require('../../../util/util.js');
import {DBPost} from '../../../DB/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    starUrl: [
      '/images/icon/wx_app_star.png',
      '/images/icon/wx_app_star@half.png',
      '/images/icon/wx_app_star@none.png'
    ],
    book:{},
    collect:false, //默认未收藏
    Storage:{
      'movie':'',
      'book':{
        collect:'',
        review:[{  //一条评论一个json
          avatar:'',
          name:'',
          msg:'',
          time:''
        }]
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'bookID' + options.id,
    //   success: function(res) {
    //     console.log(res);
    //     this.setData({
    //       collect: res.data.collect
    //     })
    //   }.bind(this),
    // })
    this.id = options.id;
    this.dbPost = new DBPost({ category: 'BOOK', DataID: this.id});//实例化数据管理类 
    this.postItem = this.dbPost.getPostItemById().data;
    console.log('post:'+this.postItem);

    var url = 'book/' +options.id;
    util.http(url,{},function(res){
      console.log(res);
      var book = res.data;
      book.tags.forEach((item)=>{
        item.name=item.name.substr(0,5);
      });
      book.stars=util.stars(book.rating.average);
      book.collectStatus = this.postItem.collectStatus;
      book.collectNum = this.postItem.collectNum;
      book.upStatus = this.postItem.upStatus;
      book.upNum = this.postItem.upNum;
      book.commentsNum = this.postItem.commentsNum;
      this.setData({book:book})
      console.log(this.data.book);
    }.bind(this))
  },
  // uploadImg:function(){
  //   var fileUrl=this.data.book.image.large;
  //   wx.downloadFile({
  //     url:fileUrl,
  //     success:function(res){
  //       var filePath=res.tempFilePath;
  //     }
  //   })
  // },
  onCommentTap(){
    wx.navigateTo({
      url: '../comment/comment?id=' + this.id,
    })
  },
  onCollectTap(){
    var collect = this.dbPost.collect();//保证js操作只执行一次

    this.setData({
      'book.collectStatus':collect.collectStatus,
      'book.collectNum':collect.collectNum
    })
    wx.showToast({//拟态弹窗
      title: collect.collectStatus?'收藏成功':'收藏失败',
      icon:'success',
      duration:1000,
      mask:true,
    })
  },
  onLikeTap(){
    var up = this.dbPost.up();
    this.setData({
      'book.upStatus': up.upStatus,
      'book.upNum': up.upNum
    })
    wx.showToast({//拟态弹窗
      title: up.upStatus ? '点赞成功' : '点赞失败',
      icon: 'success',
      duration: 1000,
      mask: true,
    })
  },
  onCollect:function(){
    var ID=this.data.book.id;
    var collect=this.data.collect;
    var msg='';
    if(collect){
      msg='取消收藏';
    }else{
      msg = '收藏成功';
    }
    collect=!collect;
    this.setData({collect: collect});
    wx.showToast({
      title: msg,
      icon:'success',
      duration:2000
    });
    wx.setStorage({
      key: 'bookID'+ID,
      data: {
        collect:collect,
      },
      success:function(res){
        console.log(res);
      }.bind(this)
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