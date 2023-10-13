<template>
  <div class="ucenter">
    <img :src="userInfo.profile.backgroundUrl" class="bg" >
    <van-icon name="wap-home-o" class="home" @click="$router.push('/')" />
    <div class="info">
      <div class="avatar">
        <img :src="userInfo.profile.avatarUrl" />
      </div>
      <div class="nickname">
        {{ userInfo.profile.nickname }}
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { onMounted, reactive } from "vue";
import {getMyMusic} from '@/api/ucenter'
export default {
  setup() {
    let userInfo = reactive({ profile: {} });
    const getMusic=async(id)=>{
      let res=await getMyMusic(id)
      console.log(res);
    }
    const getUserInfo = () => {
      userInfo = store.state.userInfo;
      console.log(userInfo);
      getMusic(userInfo.profile.userId)
    };
    getUserInfo();

    return {
      userInfo,
    };
  },
};
</script>

<style lang='less' scoped>
.ucenter {
  .bg {
    width: 100%;
  }
  .home {
    position: absolute;
    top: .2rem;
    left: .2rem;
    font-size: .5rem;
    color: rgb(93, 180, 247);
  }
  .info {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 0.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  }
}
</style>