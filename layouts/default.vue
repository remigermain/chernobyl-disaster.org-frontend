<template>
  <div class="body">
    <Nuxt />
    <cher-nuxt-link class="absolute top-0 right-0 rounded-full text-center m-5 p-2" :to="{name: 'about'}">
      <cher-img class-native="w-8 info-button" src="info.svg" :exclude="['mobile', 'tablet', 'desktop']"/>
    </cher-nuxt-link>
  </div>
</template>

<style lang="scss">
.body {
  background: linear-gradient(rgba(var(--primary), .9), rgba(var(--primary-rev), .9)), url('~assets/img/background.jpeg');
  background-size: cover;
}

body {
  background-color: rgba(var(--primary-rev), .9)
}

.info-button {
  transition: transform .4s;
}
.info-button:hover {
  transform: scale(1.2);
}
</style>
