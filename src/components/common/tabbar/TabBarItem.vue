<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isaction"><slot name="tab-bar-img"></slot></div>
    <div v-else><slot name="tab-bar-img-action"></slot></div>
    <div :style="activeStyle" :class="{action: isaction}"><slot name="tab-bar-text"></slot></div>
<!--    <img src="../../assets/img/我的.png">-->
<!--    <div>首页</div>-->
  </div>
</template>

<script>
	export default {
		name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
		  isaction() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
		    return this.isaction ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        if (this.$route.path != this.path) {
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .action {
    color: #cf1253;
  }
</style>
