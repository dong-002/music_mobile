<template>
  <div class="footer">
    <div class="left" @click="showDetail">
      <img :src="playList[playListIndex].al.picUrl" />
      <div class="name">
        <div class="song-name">{{ playList[playListIndex].name }}</div>
        <div class="tips">左右滑动可以换歌</div>
      </div>
    </div>
    <div class="right">
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-if="!isplay">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      @timeupdate="timeUpdate"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="showPop"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicInfo="playList[playListIndex]"
        :play="play"
        :isplay="isplay"
        :timeUpdateForce=timeUpdateForce
      />
    </van-popup>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { mapMutations, mapState } from "vuex";
import { isPlay } from "@/api/musiclist";
import { showToast } from "vant";
import "vant/es/toast/style";
import MusicDetail from "@/components/musicList/MusicDetail.vue";

export default {
  data() {
    return {};
  },
  components: {
    MusicDetail,
  },
  mounted() {
    this.$store.dispatch("saveLyric", this.playList[this.playListIndex].id);
  },
  updated() {
    this.$store.dispatch("saveLyric", this.playList[this.playListIndex].id);
    this.setDuration(this.$refs.audio.duration)
  },
  methods: {
    play: async function () {
      // 判断是否可以播放
      let res = await isPlay(this.playList[this.playListIndex].id);
      // console.log(res);
      if (!res.success) {
        showToast(res.message);
        return;
      }

      // 播放或者暂停
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsplay(true);
      } else {
        this.$refs.audio.pause();
        this.updateIsplay(false);
      }
    },
    showDetail() {
      this.setPop();
    },
    // 播放时间
    timeUpdate(e) {
      // console.log(e.target.currentTime);
      this.updateCurrentTime(e.target.currentTime)
    },
    // 手动更改播放时间
    timeUpdateForce(time) {
      this.$refs.audio.currentTime=time
    },
    ...mapMutations(["updateIsplay", "setPop",'updateCurrentTime','setDuration']),
  },
  watch: {
    // 监听播放下标，实现点击自动播放
    playListIndex: {
      deep: true,
      handler: function () {
        this.play();
      },
    },
    // 刚进入列表，下标还是0，点击第一首下标也是0，不会播放第一首。监听列表的改变，可以播放第一首
    playList() {
      this.play();
    },
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isplay", "showPop"]),
  },
};
</script>

<style lang='less' scoped>
.footer {
  position: fixed;
  border-top: 1px solid #ddd;
  height: 1.4rem;
  width: 100%;
  background: #fff;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    margin-left: 0.2rem;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .name {
      padding-left: 0.2rem;
      .tips {
        color: #999;
        font-size: 0.28rem;
        padding-top: 0.06rem;
      }
    }
  }
  .right {
    width: 23%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>