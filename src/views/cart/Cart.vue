<template>
	<div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
<!--    //商品列表-->
    <cart-list/>
<!--    //底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import CartList from "./childComps/CartList"

	import {mapGetters} from 'vuex'
  import CartBottomBar from "./childComps/CartBottomBar";
  export default {
		name: "Cart",
    components: {CartBottomBar, NavBar,CartList},
    computed: {
		  //mapGeters的两种用法
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
