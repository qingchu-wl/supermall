<template>
  <div id="detai">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-inmages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad: imageLoad/>
      <detail-param-info :param-info="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "../home/childComps/DetailShopInfo";
  import DetailGoodsInfo from "../home/childComps/DetailGoodsInfo";
  import DetailParamInfo from "../home/childComps/DetailParamInfo";

  import Scroll from "../../components/common/scroll/Scroll";


  import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

  export default {
		name: "detail",
    components: {
		  DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Goods,
      Shop,
      Scroll,
      GoodsParam
    },
    data() {
		  return {
		    iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
		  //1.保存传入的id
		  this.iid = this.$route.params.iid
      //2.根据id请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部的图片轮播数据
        console.log(res);
        if(res != null && res != undefined) {
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
        }
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
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
