<template>
  <div class="music-list">
    <div class="top">
      <span class="title">发现好歌单</span>
      <span class="more">查看更多</span>
    </div>
    <div class="music-item">
      <van-swipe :show-indicators="false" :width="130" :loop="false">
        <van-swipe-item v-for="item in musicList" :key="item">
          <router-link :to="{ path: 'musiclist', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <span class="playcount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gl-play-copy"></use>
              </svg>
              {{ format(item.playCount) }}
            </span>
            <div class="name">{{ item.name }}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getMusic } from "@/api/home";
export default {
  setup() {
    let musicList = ref([]);

    onMounted(async () => {
      // 多少条数据
      let limit = 12;
      const res = await getMusic(12);
      musicList.value = res.result;
    });
    const format = (num) => {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    };
    return {
      musicList,
      format,
    };
  },
};
</script>

<style lang='less' scoped>
.music-list {
  margin-top: 0.2rem;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.16rem;
    .title {
      font-size: 0.4rem;
      font-weight: bold;
    }
    .more {
      border: 1px solid #ddd;
      border-radius: 0.3rem;
      padding: 0.1rem;
    }
  }
  .music-item {
    width: 100%;
    .van-swipe {
      width: 100%;
      height: 3.8rem;
      overflow: hidden;
      .van-swipe-item {
        position: relative;
        width: 100%;
        padding: 0 0.1rem;
        a {
          color: #000;
        }
        img {
          width: 100%;
          height: 2.5rem;
          border-radius: 0.2rem;
        }
        .playcount {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          // z-index: 9;
          .icon {
            width: 0.3rem;
            height: 0.3rem;
          }
          color: #fff;
        }
      }
    }
  }
}
</style>