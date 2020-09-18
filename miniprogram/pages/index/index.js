var app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    chooseImgs: [],
    textVal: "",
    markers:[],
    name:'',
    address:'',
    latitude:'',
    longitude:''
  },
  getLocation(){
    var that = this
    wx.chooseLocation({
      success:function(res){

        that.setData({
          markers:[
            {
              longitude:res.longitude,
              latitude :res. latitude,
              name:res.name,
              address : res.address,
              anchorX:300,
              anchorY:300,
              callout:{
                content:res.name,
                color:'red',
                fontSize:15,
                borderRadius:5,
                borderWidth:1,
                borderColor:"red",
                padding:2,
                display:'ALWAYS'
              }
            }
          ]

        })
      }
    })
  },
  // 点击 “+” 选择图片
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组 进行拼接 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });

  },
    // 点击 自定义图片组件
handleRemoveImg(e) {
  // 2 获取被点击的组件的索引
  const { index } = e.currentTarget.dataset;
  // 3 获取data中的图片数组
  let { chooseImgs } = this.data;
  // 4 删除元素
  chooseImgs.splice(index, 1);
  this.setData({
    chooseImgs
  })
},
handleTextInput(e) {
  
  this.setData({
    textVal: e.detail.value
  })
}, 
    handleFormSubmit(){
      let textVal = this.data.textVal;
      let  chooseImgs = this.data.chooseImgs;
      let  markers = this.data.markers;
     let img = []
      chooseImgs.forEach((v, i) => {
  
        wx.cloud.uploadFile({
          cloudPath: "img/" + new Date().getTime() +"-"+i+".png",
          filePath:v, // 文件路径
        }).then(res => {

         img.push(res.fileID)
         markers[0].img=img

         db.collection("weizhi").add({

          data:{
          //  res:this.data.res,
          //  title,phone,site
          // textVal,
          markers
          }
        }).then(res=>{

        })
        }).catch(error => {
          // handle error
          console.log(error)
        })
      })
  
      markers[0].textVal=textVal,
      // markers[0].img=chooseImgs
      

      wx.showToast({
       title: '提交成功',
       icon: 'success',
       // true 防止用户 手抖 疯狂点击按钮 
       mask: true
     });
     textVal = ""
     chooseImgs = []
     this.setData({
      textVal,
      chooseImgs
     })
    },

  //options(Object)
  onLoad: function(options){
    var that = this
    wx.getLocation({
      success:function(res){
        that.setData({
          markers:[
            {
              longitude:res.longitude,
              latitude:res.latitude,
              // iconPath:'https://6266-bfxy-hpbml-1302612614.tcb.qcloud.la/image/icon/peisongzhong.png?sign=ea93103ee4d29fccb33fc1b101170f37&t=1599987607',
              width:30,
              height:30,
              callout:{
                content:"我是当前位置",
                color:'red',
                fontSize:15,
                borderRadius:5,
                borderWidth:1,
                borderColor:'red',
                padding:2,
                display:'ALWAYS'
              }
            }
          ]
        })
      }
    })
  },

  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});