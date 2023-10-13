import { createStore } from 'vuex'
import { getLyric } from '@/api/musiclist'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    // 默认播放表单
    playList: [
      {
        al: {
          id: 2685339,
          name: "Concert YY 黄伟文作品展 演唱会",
          pic: 109951163639097090,
          picUrl:
          "https://p1.music.126.net/eVNxevw1W5lyBmdq18tMJw==/109951163639097093.jpg",
          pic_str: "109951163639097093",
        },
        name: "倾城 (Live)",
        ar: [{name:"陈奕迅"}],
        id: 27867449
      },
    ],
    // 默认播放第一条
    playListIndex: 0,
    // 是否正在播放
    isplay: false,
    // 收藏数
    subscribedCount: 0,
    // 是否弹出音乐详情
    showPop: false,
    // 歌词
    lyric: {},
    // 是否显示歌词
    lyricShow: false,
    // 播放器播放时间，存到store，在播放音乐的时候存起来，在歌词页面按照时间高亮显示当前歌词
    currentTime: 0,
    // 音乐的总时间
    duration: 0,
    // 是否显示底部
    footerShow: true,
    // 用户信息
    userInfo: {}
  },
  getters: {},
  mutations: {
    setSubscribedCount: function (state, value) {
      state.subscribedCount = value
    },
    updateIsplay(state, value) {
      state.isplay=value
    },
    updatePlayList(state, value) {
      state.playList=value
    },
    updateIndex(state, value) {
      state.playListIndex=value
    },
    setPop(state, value){
      state.showPop=!state.showPop
    },
    saveLyric(state,value){
      state.lyric=value
    },
    updateCurrentTime(state,value){
      state.currentTime=value
    },
    setLyricShow(state,value) {
      state.lyricShow=value
    },
    setDuration(state,value) {
      state.duration=value
    },
    updateFooterShow(state,value) {
      state.footerShow=value
    },
    updateUserInfo(state,value) {
      state.userInfo=value
    },
  },
  actions: {
    // 获取歌词
     saveLyric: async function(context,value){
      let res=await getLyric(value)
      context.commit('saveLyric',res.lrc)
    }
  },
  modules: {},
  plugins: [
    // 数据持久化
    createPersistedState({
      // 将数据放到了sessionStorage中
      storage: window.sessionStorage,
      key: 'userInfo',
      render(state){
        return {userInfo:state.userInfo}
      }
    })
  ]
})
