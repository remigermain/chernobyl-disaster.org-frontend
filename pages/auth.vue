<template>
  <div class="wrapper">
    <div class="flex flex-col justify-center items-center grid-about-intro z-2">
      <nuxt-child />
    </div>
    <div class="overflow-hidden m-10 ml-0 flex justify-center items-center grid-home-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-about.jpeg" alt="background-about" class="object-cover">
      </picture>
    </div>
  </div>
</template>
