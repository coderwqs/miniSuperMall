// pages/home/childComps/w-recommend/w-recommend.js
Component({
  properties: {
    recommend: {
      type: Array,
      value: []
    }
  },
  data: {
    isLoad: false
  },
  methods: {
    handleImageLoad() {
      if (!this.data.isLoad) {
        this.triggerEvent('imageLoad')
        this.data.isLoad = true
      }
    }
  }
})