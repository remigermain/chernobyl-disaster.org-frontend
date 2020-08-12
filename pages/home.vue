<template>
  <div class="grid-index">
    <div class="index-description">
      <h1 class="text-4xl uppercase extra-auto font-russia transition-opacity duration-400 z-1 italic text-opacity-50">
        {{ $t('global.presentation') }}
      </h1>
      <p class="mb-16 text-lg leading-7 break-words inline-block mt-2">
        {{ $t('global.description') }}
      </p>
      <extra-nuxt-link :to="{name: 'timeline'}" class="px-4 py-4 bg-gray-900 text-white font-bold rounded-sm hover:bg-gray-800">
        {{ $t('global.timeline') }}
        <icon-arrow-right />
      </extra-nuxt-link>
    </div>
    <div class="index-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="index-image-item">
      </picture>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-index {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.index-description {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
}

.index-image {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 4rem;
  .index-image-item {
    object-fit: cover;
  }
}

@media screen and (max-width:1200px){
  .index-description  {
    padding: 2rem;
  }
}

@media screen and (max-width:1000px){
  .index-image {
    width: 100vw;
    height: 100vh;
    justify-content: end;
    margin: 0;
    transform: translate(0, -50%);
    top: 50%;
    right: 0;
    position: absolute;
    z-index: -1;
    opacity: .3;
    .index-image-item {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  .index-description  {
    grid-area: 1 / 1 / 1 / 3;
  }
}
</style>
