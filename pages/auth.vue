<template>
  <div class="wrapper">
    <div class="flex flex-col justify-center items-center grid-about-intro z-2">
      <nuxt-child />
    </div>
    <div class="overflow-hidden m-10 ml-0 flex justify-center items-center grid-home-image">
      <extra-img src="background-about.jpeg" :default="true" class-native="object-cover" />
    </div>
  </div>
</template>
