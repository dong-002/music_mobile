import request from "./request"

const getBanner=(type)=>{
  return request({
    method: 'GET',
    url: '/banner',
    params: {
      type
    }
  })
}
//首页推荐歌单
const getMusic=(limit)=>{
  return request({
    method: 'GET',
    url: '/personalized',
    params: {
      limit
    }
  })
}

export {
  getBanner,getMusic
}