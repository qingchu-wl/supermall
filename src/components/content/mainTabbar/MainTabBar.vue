<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="pink">
      <img slot="tab-bar-img" src="~assets/img/tabbar/首页.png">
      <img slot="tab-bar-img-action" src="~assets/img/tabbar/首页1.png">
      <div slot="tab-bar-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/categety">
      <img slot="tab-bar-img" src="~assets/img/tabbar/分类.png">
      <img slot="tab-bar-img-action" src="~assets/img/tabbar/分类1.png">
      <div slot="tab-bar-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="tab-bar-img" src="~assets/img/tabbar/购物车.png">
      <img slot="tab-bar-img-action" src="~assets/img/tabbar/购物车1.png">
      <div slot="tab-bar-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="tab-bar-img" src="~assets/img/tabbar/我的.png">
      <img slot="tab-bar-img-action" src="~assets/img/tabbar/我的1.png">
      <div slot="tab-bar-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
	export default {
		name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
