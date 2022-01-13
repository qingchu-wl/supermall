import {
  ADD_CONUNTER,
  ADD_TO_CART
} from './mutation-types'


export default {
  addCart(context,payload) {
    //payLoad新添加的商品
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    //1.查找之前数组是或否有该商品
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2.判断oldProduct
      if(oldProduct) {
        //数量加1
        // oldProduct.count += 1
        context.commit(ADD_CONUNTER,oldProduct)
        resolve('商品数量+1')
      }else {
        payload.count = 1
        //添加新的商品
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加新的商品')
      }
    })
  }
}
