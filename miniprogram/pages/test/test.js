// miniprogram/pages/test/test.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
marker:{},
polyline: [{
  points: [
  ],
  color: "#33c9FFDD",
  width: 3,
}]
  },
kaiqi(){
  let polyline = this.data.polyline
  let marker = this.data.marker
  let points = polyline[0].points
  const that = this
  wx.openSetting({
    
    success (res) {
      wx.startLocationUpdateBackground({
        success(res) {
          
          wx.onLocationChange(function(res) {
            marker = res
            var myDate = new Date();
            setTimeout(()=>{
              if(res!=points[points.length]){
                points.push(res)

                if((myDate.getHours()==15)&&myDate.getMinutes()>0&&myDate.getMinutes()<45){
                  db.collection('polyline').add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                      time:myDate,
                      polyline:polyline
                    }
                  })
                  .then(res => {
                    console.log(res)
                  })
                }
              }
            },3000)

            that.setData({
              polyline,
              marker
            })
          })
        },
        fail(res) {
         console.log('开启后台定位失败', res)
        }
       })
    }
  })
  
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){

    var myDate = new Date();
    myDate.getHours();       //获取当前小时数(0-23)

    myDate.getMinutes();     //获取当前分钟数(0-59)
    
    myDate.getSeconds();     //获取当前秒数(0-59)


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
//  let num = this.data.num+1
//  this.setData({
//    num
//  })
 
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