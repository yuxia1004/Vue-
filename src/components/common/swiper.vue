<template>
  <div class="swiper-container" :id="config.id">
    <div class="swiper-wrapper">
      <slot></slot>
    
    </div>
    <div class="swiper-pagination" v-if="config.info.pagination"></div>
  </div>
</template>
 
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  props: ["config"],
  mounted() {
    this.$nextTick(() => {
      new Swiper("#"+this.config.id, this.config.info);
    });
  }
};
</script>
<style lang="scss">
.swiper-pagination-bullet{
  background: white;
  opacity: 0.5;
}
.swiper-pagination-bullet-active{
  background: white;
  opacity: 1;
}
</style>