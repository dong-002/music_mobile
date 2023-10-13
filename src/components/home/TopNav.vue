<template>
  <div class="top-nav">
    <svg class="icon" aria-hidden="true" @click="showChange">
      <use xlink:href="#icon-31liebiao"></use>
    </svg>
    <div class="nav">
      <span @click="$router.push('/ucenter')">我的</span>
      <span :style="{fontWeight: 'bold'}">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <svg class="icon" aria-hidden="true" @click="this.$router.push('/search')">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
  <van-popup
    v-model:show="showLeft"
    position="left"
    :style="{ width: '50%', height: '100%', opacity: '.9' }"
  >
    <div class="info">
      <div class="avatar" @click="$router.push('/ucenter')">
        <img :src="userInfo.profile.avatarUrl" />
      </div>
      <div class="nickname" @click="$router.push('/ucenter')">
        {{ userInfo.profile.nickname }}
      </div>
      <div class="join-time">
        加入时间：{{ time }}
      </div>
    </div>
  </van-popup>
</template>

<script>
import moment from "moment"
export default {
  name: "TopNav",
  data() {
    return {
      showLeft: false,
      userInfo: this.$store.state.userInfo,
      
    };
  },
  methods: {
    showChange() {
      this.showLeft = !this.showLeft;
    },
  },
  computed: {
    time() {
      return moment(this.userInfo.createTime).format('YYYY年MM月DD日')
    }
  }
};
</script>

<style lang="less" scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
  height: 1rem;
  .nav {
    display: flex;
    width: 65%;
    justify-content: space-around;
  }
}
.info {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 0.7rem;
    height: 0.7rem;
    overflow: hidden;
    border-radius: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nickname {
    padding: .1rem 0;
  }
  .join-time {
    font-size: .26rem;
    color: rgb(126, 126, 126);
  }
}
</style>