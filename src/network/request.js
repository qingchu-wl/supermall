
import axios from "axios";

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    // http://152.136.185.210:7878/api/m5
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  //2. axios的拦截器
  //请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 对数据做一些操作.例如处理一些不符合要求的信息
    // 携带token信息
    // 必须返回config
    return config
  }, err => {
    console.log(err);
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  //发送真正的网络请求
  return instance(config)
}

