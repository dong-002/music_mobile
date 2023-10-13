import axios from "axios";
import router from "@/router";

const instance=axios.create({
  baseURL: '/api',
  timeout: 7*1000,
  withCredentials: true,
  
})

instance.interceptors.request.use(config=>{

  return config
},error=>{
  Toast('发送请求失败');
  return 
})

instance.interceptors.response.use(response=>{
  if(response.data.code==200) {
    return response.data
  }else if(response.data.code==301) {
    // 没登录就调用需要登录的接口
    Toast('请登录后重试');
    router.push('/login')
  }
  return response
},error=>{

  return error
})

export default instance