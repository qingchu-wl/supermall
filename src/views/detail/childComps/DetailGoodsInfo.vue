<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">

      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt=""/>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",

    props: {
		  detailInfo: {
		    type: Object
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
		  imgLoad() {
		    //判断，所有图片都加载完了，那么进行一次回调就可以
        if(++this.counter === this.imagesLength) {
          this.$emit('imageLoad');
        }
      }
    },
    watch: {
      detailInfo() {
        //获取图片个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
	}
</script>

<style scoped>
  .goods-info{
    margin-top: 20px;
  }
  .info-list {
    padding: 0 5px;
  }
  .info-list img{
    width: 100%;
  }
  .desc {
    margin-bottom: 10px;
    padding: 0 5px;
  }
  .info-key {
    padding: 0 5px;
  }
</style>
