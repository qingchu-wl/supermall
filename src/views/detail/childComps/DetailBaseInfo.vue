<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
		  goods: {
		    type: Object,
        default() {
		      return {}
        }
      }
    }
	}
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
    padding-bottom: 20px;
  }
  .info-title {
    color: #000;
    font-size: 14px;
    font-weight: 500;
  }
  .info-price {
    margin-top: 10px;

  }
  .n-price{
    color: var(--color-high-text);
    font-size: 16px;
    font-weight: 500;
  }
  .o-price{
    margin-left: 5px;
    font-size: 12px;
    text-decoration: line-through;
  }
  .discount {
    margin-left: 3px;
    display: inline-block;
    background-color: #cf1978;
    color: #fff;
    font-size: 14px;
  }
  .info-other {
    margin-top: 15px;
    display: flex;
    justify-content:space-between;
    align-item: center;
    font-size: 14px;
    border-bottom: 1px solid #000000;
    border-color: #cccec8;
    padding-bottom: 5px;
  }
  .info-service {
    font-size: 13px;
    display: flex;
    justify-content:space-between;
    align-item: center;
    margin-top: 15px;
    color: #000;
    font-weight: 500;
  }
</style>

