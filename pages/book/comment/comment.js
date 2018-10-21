// pages/book/comment/comment.js
import {DBPost} from '../../../DB/DBPost.js';
var util=require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    txtCommentMsg:'',
    imgCommentMsg: [
      // '/images/comment/train-1.jpg',
      // '/images/comment/train-2.jpg',
      // '/images/comment/train-3.jpg'
    ],
    VoiceCommentMsg:[],
    id:'',
    recordAudioURL:'',
    voiceToText:true,
    recording:false,
    controlpanel:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ID = options.id;
    util.initTimeFormat();
    var id= this.ID;
    this.setData({id:id});
    this.execDataSync(id);
  },
  txtCommentTap(e){
    var textMsg = e.detail.value; 
    this.setData({ txtCommentMsg: textMsg});
  },
  sendTap(){
    var txtCommentMsg = this.data.txtCommentMsg;
    var imgCommentMsg = this.data.imgCommentMsg
    if (/^\s*$/g.test(txtCommentMsg) || imgCommentMsg.length<1) {
      wx.showToast({
        title: '请输入合法文本',
        icon: 'warn',
        duration: 1000,
        mask: true
      })
      return;
    }
    var newComment = {
      avatar: `/images/avatar/avatar-${(~~Math.random * 3) + 1}.png`,
      name: ['Miley', 'Levi', '科比', '哈登', '詹姆斯'][~~(Math.random * 5) + 1],
      comment: {
        txt: textMsg,
        img: '',
        voice: ''
      },
      create_time: Date.now(),
      timeFormat: ''
    };
    this.dbPost.newComment(newComment);
    this.execDataSync(this.id);
  },
  execDataSync(id){
    this.dbPost = new DBPost({ category: 'BOOK', DataID: id })//数据实例化
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments
    });
  },
  execDataReset(){
    this.setData({
      txtCommentMsg:'',
      imgCommentMsg:[],
      voiceCommentMsg:[],
      recording:false,
      recordAudioURL:'',
      controlpanel:false
    })
  },
  //语音=>文字
  changeKeyboard(){
    var toggle=this.data.voiceToText;
    this.setData({
      voiceToText:!toggle
    })
    console.log(toggle);
  },
  //开始录音
  startRecord(){
    this.startTime = Date.now();//记录开始时间
    this.setData({ recording:true })
    wx.startRecord({
      success:function(res){//录音成功返回tempfilepath
        var url=res.tempFilePath;
        var diff = Math.ceil((this.endTime-this.startTime)/1000)//向上取整
        this.submitRecordComment(url, diff);
      }.bind(this),
      fail:function(err){},
      complete(res){},
    })
  },
  endRecord(){
    this.setData({recording:false})
    this.endTime=Date.now();//记录停止时间
    wx.stopRecord();
  },
  submitRecordComment(url,diff){
    var newComment={
      avatar: `/images/avatar/avatar-${~~(Math.random() * 3) + 1}.png`,
      name:['Levi','科比詹姆士'][~~(Math.random()*2)],
      comment:{
        txt:'',
        img:[],
        voc:{url:url,diff:diff,length:Math.min(100,diff*20)}
      },
      create_time:Date.now(),
      timeFormat:'',
    }
    this.dbPost.newComment(newComment);
    var id=this.data.id;
    this.execDataReset(); //重置信息
    this.execDataSync(id);  //数据绑定渲染
    this.submitimgSuccess();//提示信息
  },
  //语音播放
  vocPlay(e){
    var url=e.target.dataset.voice;
    this.setData({recordAudioURL:url});
    wx.stopVoice()//停止播放
    wx.playVoice({
      filePath: url,
      success:function(res){console.log(res)},
      fail:function(res){},
      complete:function(){}
    })
  },
  submitimgSuccess(){
    wx.showToast({
      title:'评论成功',
      icon: 'success',
      duration: 1000,
      mask: true
    })
  },
  //添加图片开关
  UserPhotoAdd(){
    this.setData({ controlpanel: !this.data.controlpanel})
  },
  imgCommentInput(){
    var imgArr=this.data.imgCommentMsg;//获取图片数组
    if(imgArr.length>=3){
      return
    }
    wx.chooseImage({
      count:3, //最大图片选择数量
      sizeType:['compressed','original'],
      successType:['album','camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        imgArr=[].concat(tempFilePaths);
        console.log(tempFilePaths, imgArr);                
        this.setData({
          imgCommentMsg:imgArr,
        })
        console.log(this.data.imgCommentMsg)
      }.bind(this),
      fail:function(res){},
      complete:function(res){}
    })
  },
  clearpic(e){
   var index=e.target.dataset.idx;
   wx.showModal({
     title: '删除',
     content: '是否确认删除图片',
     showCancel:true,
     cancelColor:'#',
     confirmText:'删除',
     confirmColor:'',
     success:function(res){
       var imgArr = this.data.imgCommentMsg;
       imgArr.splice(index,1);
       this.setData({
         imgCommentMsg: imgArr
       })
     }.bind(this),
     fail:function(){}
   })
  }
})