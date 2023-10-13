import request from "./request"

const Login=(data)=>{
  return request({
    method: 'GET',
    url: '/login',
    params: {
      email:data.email,
      password: data.password
    }
  })
}

const getUserInfo=(id)=>{
  return request({
    method: 'GET',
    url: '/user/detail',
    params: {
      uid: id
    }
  })
}

const sendCheckCode=(phone)=>{
  return request({
    method: 'GET',
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

// 手机登录
const phoneLogin=(data)=>{
  return request({
    method: 'GET',
    url: '/login/cellphone',
    params: {
      phone:data.phone,
      password: data.password
    }
  })
}

export {
  Login,getUserInfo,sendCheckCode,phoneLogin
}