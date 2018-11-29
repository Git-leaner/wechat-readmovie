var hotapp = require('./util/hotapp.js');
//hotapp.setDebug(true); // 显示调试信息开关
App({
  onLaunch: function () {
    // Do something initial when launch.
  },
  onShow: function () {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})