import {debounce} from "common/util";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    tapClick(){
      this.$refs.scroll.scrollTo(0,0)
    }
  }

}
