<template>
  <div class="wrapper">
    <div class="extra-auto grid-home-intro w-full z-10">
      <div class="w-full md:w-3/4 mx-auto flex justify-center items-center flex-col h-full">
        <h2 class="text-6xl uppercase mb-8 grid-home-intro-title -sm:hidden font-russia">
          {{ $t('global.chernobyl' ) }}
        </h2>
        <p class="mb-16 text-lg leading-7 break-words inline-block mt-2">
          {{ $t('global.description') }}
        </p>
        <extra-nuxt-link :to="{name: 'timeline'}" class="px-4 py-4 bg-gray-900 text-white font-bold rounded-sm hover:bg-gray-800 btn-icon-show">
          {{ $t('global.timeline') }}
          <fa icon="arrow-right" size="xs" />
        </extra-nuxt-link>
      </div>
    </div>
    <div class="overflow-hidden m-10 ml-0 flex justify-center items-center grid-home-image">
      <extra-img src="background-home.jpeg" :default="true" class-native="object-cover" />
    </div>
  </div>
</template>


<style lang="scss">

.grid-home-image {
  transition: opacity .5s;
}

@media screen and (max-width:900px){
  .grid-home-intro {
    grid-column: span 2;
    .grid-home-intro-title {
      text-align: center;
    }
  }
  .grid-home-image {
    width: 50%;
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
