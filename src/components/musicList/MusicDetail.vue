<template>
  <img :src="musicInfo.al.picUrl" class="bg" />
  <div class="music-detail">
    <div class="left">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="mid">
      <Vue3Marquee :duration="10">
        {{ musicInfo.name }}
      </Vue3Marquee>
      <div class="author">
        <span v-for="item in musicInfo.ar" :key="item.id">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="right">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 旋转 -->
  <div class="detail-content" v-if="!lyricShow">
    <img
      src="@/assets/needle-ab.png"
      class="needle"
      :class="[isplay ? 'needle_active' : '']"
    />
    <img src="@/assets/cd.png" class="cd" @click="updateLyricShow(true)" />
    <img
      :src="musicInfo.al.picUrl"
      class="bg-img"
      :class="[isplay ? 'active' : 'pause']"
    />
  </div>
  <!-- 歌词 -->
  <div
    class="detail-lyric"
    v-show="lyricShow"
    @click="updateLyricShow(false)"
    ref="lyricRef"
  >
    <p
      v-for="item in handelLyric"
      :key="item"
      :class="{
        lyric_active: currentTime >= item.time && currentTime < item.suf,
      }"
    >
      {{ item.text }}
    </p>
  </div>
  <div class="detail-footer">
    <div class="top">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="progress">
      <van-slider v-model="progress" @change="onChange" />
    </div>
    <div class="bottom">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="!isplay" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
export default {
  props: ["musicInfo", "play", "isplay", "timeUpdateForce"],
  components: {
    Vue3Marquee,
  },
  data() {
    return {
      progress: 0,
    };
  },
  methods: {
    backHome() {
      this.setPop();
      this.setLyricShow(false);
    },
    updateLyricShow(type) {
      this.setLyricShow(type);
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      }
      if (index > this.playList.length - 1) {
        index = 0;
      }
      this.updateIndex(index);
    },
    onChange(value) {
      let time = (this.duration / 100) * value;
      // console.log(time);
      // this.updateCurrentTime(time)
      this.timeUpdateForce(time);
    },
    ...mapMutations([
      "setPop",
      "setLyricShow",
      "updateIndex",
      "updateCurrentTime",
      'updateIsplay'
    ]),
  },
  watch: {
    // 监听音乐播放，让高亮歌词一直在中间
    currentTime(newVal) {
      let active = document.getElementsByClassName("lyric_active");
      // console.log([active]);
      if (active) {
        let lyricRef = this.$refs.lyricRef;
        if (active[0].offsetTop > 300) {
          lyricRef.scrollTop = active[0].offsetTop - 300;
        }

        // 更新进度条
        this.progress = Math.ceil((this.currentTime / this.duration) * 100);
        // 放完这一首放下一首
        if (newVal >= this.duration) {
          this.updateIsplay(false)
          this.goPlay(1);
        }
      }
    },
  },
  mounted() {
    // console.log(this.lyric.lyric);
  },
  computed: {
    ...mapState([
      "lyric",
      "lyricShow",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    // 处理歌词 按行划分，并且得到歌词的时间
    handelLyric() {
      let arr = [];
      if (this.lyric.lyric) {
        arr = this.lyric.lyric.split(/[(\r\n)\r\n]+/).map((item, index) => {
          let m = item.slice(1, 3);
          let s = item.slice(4, 6);
          let ms = item.slice(7, item.indexOf("]"));
          let text = item.slice(item.indexOf("]") + 1, item.length);
          let time = parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
          return { m, s, ms, text, time };
        });

        arr.forEach((element, index) => {
          // 下一句歌词的开始时间 处于当前歌词开始到下一句歌词开始，都是当前歌词高亮显示
          if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
            element.suf = arr[index].time + 100;
          } else {
            element.suf = arr[index + 1].time;
          }
        });
        console.log(arr);
        return arr;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.bg {
  width: 100%;
  height: 100%;
  filter: blur(60px);
  position: absolute;
  z-index: -1;
}
.music-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .icon {
    fill: #fff;
  }
  .mid {
    width: 50%;
    color: #fff;

    .author {
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 0.28rem;
      }
    }
  }
}
.detail-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 9.2rem;
  .needle {
    height: 3rem;
    width: 2rem;
    z-index: 3;
    position: absolute;
    left: 50%;
    top: 0.5rem;
    transform: rotate(-2deg);
    // 动画 2秒
    transition: all 2s;
    // 旋转的基点
    transform-origin: 0 0;
  }
  .needle_active {
    height: 3rem;
    width: 2rem;
    z-index: 3;
    position: absolute;
    left: 50%;
    top: 0.5rem;
    transform: rotate(10deg);
    // 动画 2秒
    transition: all 2s;
    // 旋转的基点
    transform-origin: 0 0;
  }
  .cd {
    width: 60%;
    z-index: 2;
    position: absolute;
    top: 2.3rem;
  }
  // cd旋转的动画效果 从0度旋转到360度
  @keyframes cd_rotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .bg-img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: absolute;
    top: 2.5rem;
    // 旋转动画
    animation: cd_rotate 10s linear infinite;
  }
  .active {
    // 开始动画
    animation-play-state: running;
  }
  .pause {
    // 暂停动画
    animation-play-state: paused;
  }
}

.detail-lyric {
  width: 100%;
  height: 9.2rem;
  overflow: scroll;
  padding-top: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  p {
    color: rgb(175, 174, 174);
    padding-bottom: 0.25rem;
  }
  .lyric_active {
    color: #fff;
    font-size: 0.4rem;
  }
}
.detail-footer {
  // position: absolute;
  // bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #fff;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .progress {
    width: 100%;
    padding: 0 0.1rem;
    .van-slider {
      :deep(.van-slider__button) {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: #fff;
      width: 0.5rem;
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>