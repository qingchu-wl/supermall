<template>
	<div class="bottom-bar">
    <div class="check-content">
      <check-button :value="isCheckedAll" class="check-buttom" @click.native="checkClickAll"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
	import CheckButton from "components/content/checkButton/CheckButton";
  export default {
		name: "CartBottomBar",
    components: {CheckButton},
    computed: {
		  totalPrice() {
		    return '￥' + this.$store.state.cartList.filter(item => {
		      return item.checked
		      }).reduce((proValue,item) => {
		        return proValue + item.price * item.count
        },0)
      },
      checkLength() {
		    return this.$store.state.cartList.filter(item => item.checked).length
      },
      isCheckedAll() {
        if(this.$store.state.cartList.length === 0 ) return false
        //当有没选中时，则取消全选
        //1.使用filter
        // return !(this.$store.state.cartList.filter(item => !item.checked.length))
        //2.使用find
        return !this.$store.state.cartList.find(item => !item.checked)
          }
    },
    methods: {
      checkClickAll() {
        //点击全选，当全选时改为全不选，当未全选时改为全选
        if(!this.isCheckedAll) {
          this.$store.state.cartList.reduce((proValue,item) => {
            item.checked = true
          },0)
          //forEach方法
          // this.cartList.forEach(item => item.checked = true)
        } else {
          this.$store.state.cartList.reduce((proValue,item) => {
            item.checked = false
          },0)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    float: left;
  }
  .total-price {
    margin-left: 65px;
    float: left;
  }
  .check-buttom {
    width: 20px;
    height: 20px;
  }
  .calculate  {
    float: right;
    background-color: red;
    width: 70px;
    text-align: center;
    color: #fff;
  }
</style>
