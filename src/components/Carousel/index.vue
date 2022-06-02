<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:["list"],
  watch: {
    // 监听bannerList数据的变化：因为这条数据发生过变化-----由空数组变为数组里面有四个元素
    bannerList: {
      immediate: true,
      handler(newValue, oldValue) {
        // 现在咱们通过watch监听bannerList属性的属性值的变化
        // 如果执行handler方法，代表组件实例身上的这个属性的属性值已经有了【数组：四个元素】
        // 当前这个函数执行，只能保证bannerList数据已经有了，但是没办法保证v-for已经执行结束了
        // v-for执行结束，才有结构【现在watch当中没办法保证】
        // nextTick：在下次DOM更新循环结束后执行延迟回调，在修改数据之后立刻使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            autoplay: true,
            loop: true, //
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>