<template>
	<div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo"/>
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right" >
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailShopInfo",
    props: {
		  shop: {
		    type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if(value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
	}
</script>

<style scoped>
  .shop-info {
    padding-top: 30px;
  }
  .shop-top {
    height: 50px;
    width: 100%;
    line-height: 50px;
  }
  .shop-top img{
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
  }
  .title {
    display: inline-block;
    height: 50px;
    margin-left: 10px;
    float: left;
  }
  .shop-middle {
    margin-top: 30px;
    height: 100px;
  }
  .shop-middle-item {
    margin-left: 20px;
    float: left;
  }
  .info-sells {
    text-align: center;
    color: #000000;
    width: 70px;
    height: 50px;
    float: left;
    margin-left: -10px;
  }
  .sells-count {
    font-size: 20px;
    font-weight: 500;
  }
  .sell-text {
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
  }
  .info-goods {
    text-align: center;
    color: #000000;
    width: 70px;
    height: 50px;
    float: left;
    margin-left: -10px;
  }
  .goods-count {
    font-size: 20px;
    font-weight: 500;
  }
  .goods-text {
    font-size: 14px;
    font-weight: 500;
    margin-top: 8px;
  }
  .shop-middle-left{
    height: 50px;
    width: 130px;
    margin-top: 25px;
  }
  .shop-middle-right {
    width: 140px;
    height: 100px;
    color: #000;
    display: flex;
    flex-direction: column;
    align-content: space-between;

  }
  .shop-middle-right tr{
    height: 30px;
  }
  .score {
    color: green;
  }
  .better span{
    background-color: green;
    color: #fff;
  }
  .score-better {
    color: red;
  }
  .better-more span {
    background-color: red;
    color: #fff;
  }
  .shop-bottom {
    border-radius: 10px;
    background-color: #ecebe8;
    height: 30px;
    width: 150px;
    margin: auto;
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
  }
</style>
