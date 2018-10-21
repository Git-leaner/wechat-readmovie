const util = require('../util/util.js');
class DBPost{
  constructor(param){
    this.category = param.category;//类目 书 电影
    this.DataID = param.DataID;
  }
  getCategory(){
    var postData=wx.getStorageSync(this.category);//获取对应类目数据
    if(!postData){
      var Data = require('../data/data.json.js');
      console.log(Data.postData);      
      postData=Data.postData[this.category];
      this.execSetStorageSync(postData);
    }
    return postData;
  }
  execSetStorageSync(data){//同步更新缓存数据
    wx.setStorageSync(this.category,data);
  }
  getPostItemById(){//根据id获取对应子数据
    var postData=this.getCategory();//存储数据数据
    var itemData={};  //初始化所需精准数据
    var found=false;
    postData.forEach((item,idx)=>{
      if(item.DataID == this.DataID){
        itemData={
          index:idx,
          data:item
        }
        found=true;
      }
    });
    if(!found){
      var newItem = {
        "DataID": this.DataID,
        "collectStatus": false,
        "collectNum": 0,
        "upStatus": false,
        "upNum": 0,
        "comments": [],
        "commentsNum": 0
      }
      postData.push(newItem);
      this.execSetStorageSync(postData);
      itemData = {
        index: 11,
        data: newItem
      }
    }
    return itemData;
  }
  getCommentData(){
    var itemData=this.getPostItemById().data;
    console.log(this.compareWithTime);
    // util.initTimeFormat();
    itemData.comments.sort(this.compareWithTime);
    itemData.comments.map(function(item){
      var date = new Date(item.create_time * 1);
      console.log(date);
      item.timeFormat = date.format('yyyy-MM-dd ww hh:mm:ss');
    });
    return itemData.comments;
  }
  compareWithTime(prev,next){ //评论时间排序
    var flag = parseFloat(prev.create_time)-parseFloat(next.create_time);
    if(flag<0){
      return 1;
    }else if(flag>0){
      return -1;
    }else{
      return 0;
    }
  }

  collect() {//收藏功能
    return this.updatePostData('collect');
  }
  up() {  //点赞
    return this.updatePostData('up')
  }
  newComment(newComment) {
   this.updatePostData('comment',newComment);
  }
  updatePostData(category,newComment) { //数据更新中控器
    var allPostData = this.getCategory(); //获取所有数据【书、电影】
    var itemData=this.getPostItemById(); //获取ID对应的数据
    var postData=itemData.data; //3级数据 具体ID对应数据
    switch (category){
      case 'collect':
        if(!postData.collectStatus){
          postData.collectStatus = true;
          postData.collectNum++;
        }else{
          postData.collectStatus = false;
          postData.collectNum--;
        }
        break;
      case 'up':
        if (!postData.upStatus) {
          postData.upStatus = true;
          postData.upNum++;
        } else {
          postData.upStatus = false;
          postData.upNum--;
        }
        break;
      case 'comment':
        postData.comments.push(newComment);
        postData.commentsNum++;
        break;
      default:
        break;
    }
    allPostData[itemData.index] = postData; //依据下标替换局部数据
    this.execSetStorageSync(allPostData);
    return postData;
  }
}
export{DBPost};
/*
  DBPost
    功能需求
      1.向本地存储进行查找对应的类目缓存数据 书|电影
      2.根据类目+ID查找对应数据
      3.操作数据内的评论、点赞 收藏等属性内容改变
      4.同步更新我们的本地缓存

    数据的格式
      storage={
        'BOOK':[
          {
            'DataID':'237148',
            'collectStatus':false,
            'collectNum':10,
            'upStatus':9,
            'upNum':9,
            'comments':[
              {
                'create_time':134564342,
                'name':'levi',
                'avatar':url,
                'msgStr':'',
                'msgPic':'', 
                'msgRecord':tempFilePaths
              }
              ]
          }
        ],
        'MOVIE':[]
      }
*/