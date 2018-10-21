// pages/setting/setting.js
const MD5=require('../../util/MD5.js').MDF;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userinFo_city:'',
    line: [
      {
        imgUrl:'/images/icon/wx_app_location.png',
        text:'地图信息',
        bindEvent: 'gomap'
      },
      {
        imgUrl: '/images/icon/wx_app_clear.png',
        text: '清除缓存',
        bindEvent: 'cacheEvent'
      },
      {
        imgUrl: '/images/icon/wx_app_cellphone.png',
        text: '设备信息',
        bindEvent: 'phoneEvent'
      },
      {
        imgUrl: '/images/icon/wx_app_exl.png',
        text: 'excel下载',
        bindEvent: 'excelEvent'
      },
      {
        imgUrl: '/images/icon/wx_app_scan.png',
        text: '二维码扫描',
        bindEvent: 'scanEvent'
      },
      {
        imgUrl: '/images/icon/wx_app_network.png',
        text: '网络信息',
        bindEvent: 'netEvent'
      },
    ],
    systemInfo:{},
    sysShow:false,
  },
  cacheEvent() { 
    wx.showModal({
      title: '是否清除数据',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确认',
      confirmColor: '',
      success: function (res) {
        console.log(res);
        if(res.confirm){
          wx.clearStorage();
          wx.showToast({
            title: '缓存已清空',
            icon: 'success',
            duration: 1000,
            mask: true
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  gomap() {
    wx.navigateTo({
      url: './map/map',
    })
  },
  phoneEvent() { 
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        this.setData({
          systemInfo: res,
          sysShow:true
        })
        var timer=setTimeout(function(){
          this.setData({
            sysShow: false
          })
          clearTimeout(timer)
        }.bind(this),1000)
      }.bind(this),
    })
  },
  excelEvent() {
    wx.downloadFile({
      url:exl,
      success(res){
        wx.openDocument({
          filePath: res.tempFilePath,
        })
      }
    })
   },
  scanEvent() { 
    wx.scanCode({
      onlyFromCamera:false,
      success:function(res){

      }
    })
  },
  netEvent(){
    wx.getNetworkType({
      success: function(res) {
        console.log(res)
        wx.showModal({
          title: '网络状态',
          content: res.networkType,
          showCancel: true,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      withCredentials:false,
      lang:'zh_TW',
      success:function(res){
        var data=JSON.parse(res.rawData);
        console.log(data);
        var province=data.province;
        var appid ='2015063000000001';
        var salt=Date.now();
        var key ='123456';
        var strC = appid + province+salt+key;
        var sign = MD5(strC);
        console.log(sign);
        wx.request({
          url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
          method:'GET',
          data:{
            q: province,
            appid: appid,
            salt:salt,
            form:'auto',
            to:'zh',
            sign:sign
          },
          success:function(res){
            console.log(res);
            this.setData({
              userInfo:data,
              // userinFo_city: res.data.trans_result[0].dst
            })
          }.bind(this),
        })
        console.log(res)
      }.bind(this),
      fail:function(err){

      }
    })
  },
  mapEvent:function(){

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