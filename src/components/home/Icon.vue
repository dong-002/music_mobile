<template>
  <div class="icon-body">
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-tuijian"></use>
    </svg>
    <div>每日推荐</div>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-zhibo"></use>
    </svg>
    <div>私人FM</div>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-gedan"></use>
    </svg>
    <div>歌单</div>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-paihangbang"></use>
    </svg>
    <div>排行榜</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.icon-body {
  display: flex;
  justify-content: space-around;
  .icon-item {
    text-align: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>