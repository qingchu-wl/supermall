<template>
  <div id="detai">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"  ref="scroll" :probe-type="3" @scroll="constentscroll">
      <detail-swiper :top-inmages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend"  ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top  @click.native="tapClick" v-show="isShowBackTop"/>
    <toast :show="show" :message="message"/>
  </div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";


  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import Toast from "components/common/toast/Toast";

  export default {
		name: "detail",
    components: {
		  DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Goods,
      Shop,
      Scroll,
      GoodsParam,
      getRecommend,
      Toast
    },
    data() {
		  return {
		    iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        itemImageListener: null,
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
        message: '哈哈哈',
        show: false
      }
    },
    mixins: [itemListenerMixin,backTopMixin],
    created() {
		  //1.保存传入的id
		  this.iid = this.$route.params.iid
      //2.根据id请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        if(res != null && res != undefined) {
          //1.获取顶部的图片轮播数据
          const data = res.result
          this.topImages = data.itemInfo.topImages

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          //3.创建店铺信息的对象
          this.shop = new Shop(data.shopInfo)

          //4.获取详情图片
          this.detailInfo = data.detailInfo

          //5.获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

          //6.获取评价信息
          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        //1.第一次获取
          //原因：Dom元素没加载完,this.$refs.recommend.$el没渲染
          // this.themeTopYs = []
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // //2.第二次获取：值不对
          // //原因：Dom元素加载完了，但是图片没加载完，
          // this.$nextTick(() => {
          //   this.themeTopYs = []
          //   this.themeTopYs.push(0);
          //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          //   console.log(this.themeTopYs);
          // })
        }
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    mounted() {
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      constentscroll(position) {
        //1.获取y值
        const positionY = -position.y
        //2.positionY 和主题中值进行比对
        let length = this.themeTopYs.length
        for(let i = 0;i<length-1;i++) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <
          this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex  = this.currentIndex
          }
          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i ===
          //   length - 1 && positionY >= this.themeTopYs[i]))) {
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex  = this.currentIndex
          //   console.log(this.currentIndex);
          // }
          //3.是否显示回到顶部
          this.isShowBackTop = -position.y > 800
        }
      },
      addCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2..将商品添加到购物车
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res => {
          // this.show = true
          // this.message = res
          //
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },3000)
          // console.log(res);
          this.$toast.show(res,1500)
        })
      }
    },
    destroyed() {
		  this.$bus.$off('itemImgLoad',this.itemImgListener);
    }
  }
</script>

<style scoped>
  #detai {
    position: relative;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }

</style>
