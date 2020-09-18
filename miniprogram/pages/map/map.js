const db = wx.cloud.database()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
 
    latitude: 24.4795100000,
    longitude: 118.0894800000,
    markers: [
    
        
    ],
  },
  getData(){
    db.collection('weizhi').get().then(res=>{

      const markers = []
      res.data.map((v)=>{

        v.markers[0].id = v._id
        markers.push(v.markers[0])

      })
              // console.log(markers)
      this.setData({
        markers
      })
    })
  },
  toaddress:function(e){

    const id =e.markerId

    // wx.openLocation({
    //   latitude: this.data.markers[id].latitude,
    //   longitude: this.data.markers[id].longitude,
    // })
    wx.reLaunch({
      // url: '/pages/index/index?'+id
      url: '/pages/detail/detail?id='+id
      // success: function(res) {},
      // fail: function(res) {},
      // complete: function(res) {},
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  getDataTap(){
    this.getData()
  },
  onLoad: function(options) {
    this.getData()
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