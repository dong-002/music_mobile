import request from "./request"

const getMyMusic=(uid)=>{
  return request({
    method: 'GET',
    url: '/user/playlist',
    params: {
      uid
    }
  })
}

export {
  getMyMusic
}