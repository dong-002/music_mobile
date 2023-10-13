<template>
  <div class="music">
    <div class="top-panel">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span class="count"
          >播放全部<span>(共{{ songInfo.length }}首)</span></span
        >
      </div>
      <span class="like"> + 收藏({{subscribedCount}}) </span>
    </div>
    <div class="music-item" v-for="(item, index) in songInfo" :key="item.id">
      <div class="left" @click="playMusic(index)">
        <span>{{ index + 1 }}</span>
        <span class="song">
          <span class="song-name">{{ item.name }}</span>
          <span>
            <span
              v-for="author in item.ar"
              :key="author.id"
              class="author-name"
            >
              {{ author.name }}
            </span>
          </span>
        </span>
      </div>
      <div class="right">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getSongs } from "@/api/musiclist";
import { useRouter, useRoute } from "vue-router";
import {  useStore } from 'vuex'
export default {
  setup() {
    const route = useRoute();
    const store=useStore()
    let songInfo = ref([]);
    let subscribedCount=ref(store.state.subscribedCount)
    onMounted(async () => {
      let id = route.query.id;
      let params = { id: id, offset: 0, limit: 30 };
      const res = await getSongs(params);
      songInfo.value = res.songs;
      subscribedCount.value=store.state.subscribedCount
      console.log(res);
    });
    const changeIndex=(index)=> {
      store.commit('updateIndex',index)
    }

    const playMusic=(index)=>{
      // 点击歌就把现在的歌单存到store中，并且改变index
      store.commit('updatePlayList',songInfo.value)
      store.commit('updateIndex',index)
    }
    
    return {
      songInfo,subscribedCount,changeIndex,playMusic
    };
  },
};
</script>

<style lang='less' scoped>
.music {
  margin-top: 0.2rem;
  width: 100%;
  height: 10rem;
  background: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  overflow: auto;
  margin-bottom: 1.4rem;
  .top-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      margin-top: 0.2rem;
      margin-left: 0.1rem;
      display: flex;
      align-items: center;
      .count {
        margin-left: 0.1rem;
      }
    }
    .like {
      background: #ff0000;
      padding: 0.2rem;
      color: #fff;
      border-radius: 0.4rem;
      margin-top: 0.2rem;
      margin-right: 0.2rem;
    }
  }
  .music-item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    .left {
      display: flex;
      align-items: center;
      .song {
        margin-left: 0.3rem;
        display: flex;
        // justify-content: center;
        flex-direction: column;
        .song-name {
          padding-bottom: .1rem;
          font-weight: bold;
        }
        .author-name {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
          padding-right: .1rem;
        }
      }
    }
    .right {
      .bofang {
        margin-right: .4rem;
      }
      .icon {
        fill: #999;
      }
    }
  }
}
</style>