<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixd"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top  @click.native="tapClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home"
  import {debounce} from "components/common/util";

  export default {
		name: "Home",
    data() {
		  return {
		    banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixd: false,
        saveY: 0
      }
    },
    components: {
      HomeSwiper,
      NavBar,
      RecommendView,
      FeatureView,
      TabControl,
      getHomeGoods,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求多个数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //3.监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })

    },
    //进入时跳转指定位置
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    //离开时记录位置
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
		  /**
       * 事件监听相关
		  */
       tabClick(index) {
         switch (index) {
            case 0: this.currentType = 'pop'
             break
           case 1: this.currentType = 'new'
             break
           case 2: this.currentType = 'sell'
             break
         }
         this.$refs.tabControl1.currentIndex = index
         this.$refs.tabControl2.currentIndex = index
      },
      tapClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
         //判断BackTop是否显示
        this.isShowBackTop = -position.y > 800
        //2.决定tabControl是否吸顶
        this.isTabFixd = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 		  网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*在浏览器使用原生滚动时使用*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
