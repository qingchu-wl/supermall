import {
  ADD_CONUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  [ADD_CONUNTER](state,payload) {
    payload.count++
  },
  [ADD_TO_CART](state,payload) {
    payload.checked = false
    state.cartList.push(payload)
  }
}
