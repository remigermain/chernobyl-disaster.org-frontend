<template>
  <div class="wrapper">
    <div class="extra-auto grid-home-intro w-full z-2">
      <div class="w-full md:w-3/4 mx-auto flex justify-center items-center flex-col h-full">
        <h2 class="text-6xl uppercase mb-8 grid-home-intro-title font-russia">
          {{ $t('global.chernobyl' ) }}
        </h2>
        <p class="mb-16 text-lg leading-7 break-words inline-block mt-2">
          {{ $t('global.description') }}
        </p>
        <extra-nuxt-link :to="{name: 'timeline'}" class="px-4 py-4 bg-gray-900 text-white font-bold rounded-sm hover:bg-gray-800 btn-icon-show">
          {{ $t('global.timeline') }}
          <icon-arrow-right />
        </extra-nuxt-link>
      </div>
    </div>
    <div class="grid-home-image overflow-hidden m-10 flex justify-center items-center">
      <extra-img src="background-home.jpeg" :default="true" class-native="object-cover img-home" />
    </div>
  </div>
</template>

<script>
import iconArrowRight from "@/assets/svg/arrow-right.svg"
export default {
  components: { iconArrowRight }
}
</script>

<style lang="scss">

.grid-home-image {
  grid-area: 2 / 4 / 6 / 6;
  transition: opacity .5s;
}

.grid-home-intro {
  grid-area: 2 / 1 / 6 / 4;
}


@media screen and (max-width:900px){
  .grid-home-image {
    margin-right: 0;
    img {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
    transform: translate(0, -50%);
    top: 50%;
    right: 0;
    position: absolute;
    opacity: .3;
  }
}
</style>
