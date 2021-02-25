// pages/home/home.js
import {
  getGoods,
  getMultidata
} from '../../service/home'

const TOP_DISTANCE = 1000

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '精选', '新款'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop:0
  },
  onLoad: function (options) {

    this._getMultidata()

    this._getGoods('pop')

    this._getGoods('new')

    this._getGoods('sell')
  },
  tabControlClick(event) {
    // let tempType = ''
    // if (event.detail.index === 0) {
    //   tempType = 'pop'
    // } else if (event.detail.index === 1) {
    //   tempType = 'new'
    // } else {
    //   tempType = 'sell'
    // }

    const type = ['pop', 'new', 'sell']

    const index = event.detail.index

    this.setData({
      currentType: type[index]
    })

  },
  _getMultidata() {

    getMultidata().then(res => {

      const banners = res.data.data.banner.list

      const recommends = res.data.data.recommend.list

      this.setData({
        //  es6对象增强写法
        banners,
        recommends
      })

    }).catch(err => {
      console.log(err);
    })
  },
  _getGoods(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1

    getGoods(type, page).then(res => {


      const list = res.data.data.list

      const tempList = this.data.goods[type].list

      tempList.push(...list)

      const typeKey = `goods.${type}.list`

      const pageKey = `goods.${type}.page`

      this.setData({
        //  es6对象增强写法
        [typeKey]: tempList,
        [pageKey]: page

      })

    }).catch(err => {
      console.log(err);
    })
  },
  onReachBottom() {
    //  上拉加载更多
    this._getGoods(this.data.currentType)
  },
  onPageScroll(option) {
    //  显示back-top
    const scrollTop = option.scrollTop

    const flag = scrollTop >= TOP_DISTANCE

    if (flag != this.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }

    //控制tab-control
    const flag_bak = scrollTop >= this.data.tabScrollTop

    if(flag_bak!=this.isTabFixed){
      this.setData({
        isTabFixed:flag_bak
      })
    }
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
      this.data.tabScrollTop=rect.top
    }).exec()
  }
})