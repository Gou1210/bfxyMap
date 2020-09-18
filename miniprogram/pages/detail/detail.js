const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
id:0,
markerData:[]
  },
  getData(){
    const id = this.data.id
    let markerData = this.data.markerData
    db.collection('weizhi').where({_id:id}).get().then(res=>{
console.log(res.data[0].markers[0])
markerData.push(res.data[0].markers[0]) 
      this.setData({
        markerData
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  previewImg:function(e){
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.markerData[0].img;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function (options) {
    const id = options.id
setTimeout(()=>{
  this.getData()
},500)
this.setData({
  id
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