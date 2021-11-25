<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'

	export default {
		name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
		  return {
        scroll: null,
      }
    },
    mounted() {
		  // 1.创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        // 滚动条
        probeType: this.probeType,
        //上拉
        pullUpLoad: this.pullUpLoad,
        click: true,
        // 滚轮事件
        mouseWheel: true,
        // 控制scroll的刷新
        observeDOM: true
      })
      // 2.监听滚轮滚动位置
      if(this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll',position)
        })
      }
      //3.监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
		  //跳转到顶部
      scrollTo(x,y,time = 300) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      //刷新高度
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      //监听高度。返回高度
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
