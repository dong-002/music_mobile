<template>
  <div class="home">
    <TopNav />
    <Swiper />
    <Icon />
    <MusicList />
  </div>
</template>

<script>
import TopNav from "@/components/home/TopNav.vue";
import Swiper from "@/components/home/Swiper.vue";
import Icon from "@/components/home/Icon.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: "Home",
  components: {
    TopNav,Swiper,Icon,MusicList,
  },
};
</script>

<style lang="less" scoped>
.home {
 
}
</style>