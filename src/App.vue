<template>
  <router-view/>
    <Footer v-if="$store.state.footerShow" />

</template>
<script>
import Footer from "@/components/musicList/Footer.vue";
export default {
  components: {Footer},
  setup() {
    
  },
}
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: .5rem;
  height: .5rem;
}
</style>
