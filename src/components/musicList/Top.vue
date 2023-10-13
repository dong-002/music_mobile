<template>
  <div class="navbar">
    <img :src="musicInfo.coverImgUrl" class="bg" />
    <div class="left">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span class="txt">歌单</span>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="content">
    <div class="left-con">
      <img :src="musicInfo.coverImgUrl" />
      <span class="playcount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        {{ format(musicInfo.playCount) }}
      </span>
    </div>
    <div class="right-con">
      <div class="name">{{ musicInfo.name }}</div>
      <div class="author-info">
        <div class="avatar">
          <img :src="musicInfo.creator.backgroundUrl" />
        </div>
        <span class="nickname">{{ musicInfo.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <div class="desc">
        <span>{{ musicInfo.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
   
  </div>
   <div class="footer">
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <div>{{ musicInfo.commentCount }}</div>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <div>{{ musicInfo.shareCount }}</div>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <div>下载</div>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <div>多选</div>
      </div>
    </div>
</template>

<script>
import { nextTick, onMounted, ref } from "vue";
import { getMusicList } from "@/api/musiclist";
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex'
export default {
  setup() {
    const store=useStore()
    const router = useRouter();
    const route = useRoute();
    let musicInfo = ref({
      creator: {},
    });
    onMounted(async () => {
      let id = route.query.id;
      const res = await getMusicList(id);
      musicInfo.value = res.playlist;
      store.commit('setSubscribedCount',musicInfo.value.subscribedCount)
      // console.log(res);
    });
    const format = (num) => {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    };
    
    return {
      format,
      musicInfo,
    };
  },
};
</script>

<style lang='less' scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  position: relative;
  color: #fff;
  .icon {
    fill: #fff;
  }
  .bg {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 10rem;
    filter: blur(30px);
  }
  // color: #fff;
  .left {
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    .txt {
      padding-left: 0.5rem;
      font-size: 0.4rem;
    }
  }
  .right {
    width: 25%;
    display: flex;
    justify-content: space-around;
  }
}
.content {
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
  margin-bottom: .2rem;
  height: 3rem;
  .left-con {
    width: 36%;
    height: 2.6rem;
    position: relative;
    margin: 0 0.2rem;
    a {
      color: #000;
    }
    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
    }
    .playcount {
      position: absolute;
      right: 0.1rem;
      top: 0.1rem;
      // z-index: 9;
      color: #fff;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
      }
      color: #fff;
    }
  }
  .right-con {
    margin-right: 0.2rem;
    color: #fff;
    .name {
      font-weight: bold;
    }
    .author-info {
      margin: 0.3rem 0;
      display: flex;
      align-items: center;
      .avatar {
        overflow: hidden;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        img {
          width: 0.6rem;
          height: 0.6rem;
          vertical-align: middle;
        }
      }
      .nickname {
        color: #ddd;
        padding: 0 0.1rem;
      }
      .icon {
        width: 0.3rem;
      }
    }
    .desc {
      display: flex;
      span {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; /*重点*/
        font-size: .28rem;
      }
      .icon {
        width: 0.3rem;
      }
    }
  }
}
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item {
    color: #fff;
    .icon {
      fill: #fff;
    }
  }

}
</style>