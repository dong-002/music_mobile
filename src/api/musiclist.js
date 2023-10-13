import request from "./request"
// 歌单详情
const getMusicList=(id)=>{
  return request({
    method: 'GET',
    url:`/playlist/detail`,
    params: {
      id
    }
  })
}

// 获取歌单列表
const getSongs=(data)=>{
  return request({
    method: 'GET',
    url:'playlist/track/all',
    params: {
      id:data.id,
      limit: data.limit,
      offset: data.offset
    }
  })
}

// 判断音乐是否可以播放
const isPlay=(id)=>{
  return request({
    method: 'GET',
    url:'/check/music',
    params: {
      id
    }
  })
}

// 获取歌单
const getLyric=(id)=>{
  return request({
    method: 'GET',
    url:'/lyric',
    params: {
      id
    }
  })
}

export {
  getMusicList,getSongs,isPlay,getLyric
}