<template>
  <div class="wrapper">
    <div class="flex flex-col justify-center items-center about-items grid-about-intro z-10">
      <div class="flex justify-between items-center flex-wrap -md:flex-col">
        <extra-img src="profil/profil.jpg" :exclude="['desktop']" class-native="rounded-full w-1/4 -md:w-2/4"/>
        <h1 class="w-2/4 text-4xl italic text-gray-800 -md:w-full">
          <a href="https://germainremi.fr" class="text-purple-800 hover:text-purple-500" >@</a>
          GERMAIN remi
        </h1>
      </div>
      <div class="flex justify-between items-center flex-wrap">
        <div class="1/4 -md:hidden" />
        <p class="w-3/4 -md:w-full">
          {{ $t('pages.about.creator-description') }}
        </p>
      </div>
      <a href="//TODO" class="px-4 py-4 bg-gray-900 text-white font-bold rounded-sm hover:bg-gray-800 btn-icon-show">
        {{ $t('pages.about.help-reator') }}
        <fa icon="smile-beam" size="xs" />
      </a>
    </div>
    <div class="overflow-hidden m-10 ml-0 flex justify-center items-center grid-home-image">
      <extra-img src="background-about.jpeg" :default="true" class-native="object-cover" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

@media screen and (max-width:900px){
  .grid-about-intro {
    grid-column: span 2;
  }
}
.about-items > * {
  margin-top: 5em
}

@screen -md {
  .about-items > * {
    margin-top: 1em
  }
}
</style>
