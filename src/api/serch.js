import request from "./request"

const getSearchList=(keywords)=>{
  return request({
    method: 'GET',
    url: '/search',
    params: {
      keywords
    }
  })
}

export {
  getSearchList,
}