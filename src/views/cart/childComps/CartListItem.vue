<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @click.native="checkClick" :value="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <span>{{itemInfo.image}}</span>
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
	import CheckButton from "components/content/checkButton/CheckButton";
  export default {
		name: "CartListItem",
    components: {CheckButton},
    props: {
      itemInfo: {
		    type: Object,
        default() {
		      return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked;
      }
    }
	}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .item-bottom .item-price {
    color: orangered;
  }
</style>
