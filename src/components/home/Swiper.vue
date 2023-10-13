<template>
  <div class="swiper-body">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getBanner } from "@/api/home";
export default {
  name: "Swiper",
  setup() {
    const state = reactive({
      images: [
        
      ],
    });
    onMounted(async () => {
      let res = await getBanner(1);
      state.images = res.banners;
    });
    return { state, };
  },
};
</script>

<style lang='less' >
.swiper-body {
  width: 100%;
  .van-swipe {
    width: 100%;
    height: 3.6rem;
    overflow: hidden;
    .van-swipe-item {
      padding: .2rem;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.16rem;
      }
    }
  }
}
</style>