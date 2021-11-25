export function debounce(func,delay) {
//防抖函数
  let timer = null
  return function (...ages) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, ages)
    },delay)
  }
}
