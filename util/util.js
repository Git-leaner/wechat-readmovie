// const douban ='http://localhost:8083/v2/';
var hotapp = require('./hotapp.js');
// const douban = 'http://qtalking.co:8083/v2';
const douban ='http://47.106.102.92:8081/v2/';
function http(PATH,opt,callback){
  // wx.request({
  //   url: douban+PATH,
  //   data:opt,
  //   metdod:'POST',
  //   header: {
  //     // 'content-type': 'application/json'
  //     'Content-Type': 'json'
  //   },
  //   success:function(res){
  //     callback&callback(res);
  //   }
  // })
  hotapp.request({
    useProxy: true,
    url: douban + PATH,// 需要代理请求的网址
    data: opt,
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      callback & callback(res);
    }
  })
}

//var time=new Date() time.format('yyyy-MM-dd www HH:mm')
function initTimeFormat(){
  Date.prototype.format=function(format,date){
    var o={
      'M+': this.getMonth()+1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
    }
    if(/(y+)/.test(format)){
      format = format.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));
    }
    if(/(w+)/.test(format)){
      var week='';
      switch(this.getDay()+""){
        case '0':
          week = '星期天';
          break;
        case '1':
          week = '星期一';
          break;
        case '2':
          week = '星期二';
          break;
        case '3':
          week = '星期三';
          break;
        case '4':
          week = '星期四';
          break;
        case '5':
          week = '星期五';
          break;
        case '6':
          week = '星期六';
          break;
      }
      format=format.replace(RegExp.$1,week);
    }
    for(var key in o){
      if(new RegExp("("+key+")").test(format)){
        format=format.replace(RegExp.$1,RegExp.$1.length == 1?o[key]:("00"+o[key]).substr((""+o[key]).length));
      }
    }
    return format;
  }
};
// function starsFormat(score){
//   var arr=[];
//   var i = 0;
//   var min = ~~score;
//   var max=Math.round(score);
//   while(i<5){
//     if(i<(min/2)){
//       arr.push(1);
//     }else if(max>min && arr.indexOf(0.5) == -1){
//       arr.push(0.5);
//     }else{
//       arr.push(0);
//     }
//   }
//   return arr;
// }
function starsFormat(num){
  var stars=[];
  var int=~~num;
  var i=0;
  var rank = num-0.4>int?int+1:int;
  var starRank = rank/2; 
  while(i < 5){
    if( i < ~~starRank) stars.push(1);
    else if(starRank >~~starRank && stars.indexOf(0.5)==-1) stars.push(0.5);
    else stars.push(0);
    i++;
  }
  return stars;
  console.log(num);
  console.log(stars);
  if(num-0.4>int){
    console.log(int+1);
  }else{
    console.log(int);
  }
}
/*
10-9.5 10 5 
9.4-8.5 9 4.5
8.4-7.5 8 4
7.4-6.5 7 3.5
6.4 5.5 6 3
5.4-4.5 6 3

10-9.5 10 5
9.4-8.5 9 4.5
8.4-7.5 8 4

1-0.5 1
0.4-0 0
*/
module.exports={
  http:http,
  stars:starsFormat,
  initTimeFormat: initTimeFormat
}