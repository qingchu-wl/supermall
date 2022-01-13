<template>
	<div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="tittle">
        <div
          v-for="(item,index) in tittle"
             class="tittle-item"
             :class="{active: index === currentIndex}"
              @click="tittleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
  export default {
		name: "DetailNavBar",
    components: {NavBar},
    data() {
		  return {
        tittle: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
		  //标题的点击事件
      tittleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      //返回
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .tittle {
    display: flex;
    font-size: 13px;
  }
  .tittle-item {
    display: flex;
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
