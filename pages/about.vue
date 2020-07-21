<template>
  <div class="wrapper">
    <div class="flex flex-col justify-center items-center grid-about-intro z-10">
      <h2 class="text-3xl text-md capitalize">
        {{ $t('pages.about.contributing') }}
      </h2>
      <div>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500">
          <fa :icon="['fab', 'gitlab']" size="lg" />
          Gitlab
        </a>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500">
          <fa icon="language" size="lg" />
          {{ $t('pages.about.traduction') }}
        </a>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500">
          <fa icon="envelope" size="lg" />
          {{ $t('pages.about.contact') }}
        </a>
      </div>
      <h3 class="text-3xl text-md capitalize">
        {{ $t('pages.about.contributors') }}
        <div class="wrapper text-red-800">
          <fa icon="heart" size="lg" />
        </div>
      </h3>
      <p class="text-gray-800">
        {{ $t('pages.about.thanks-contributors') }}
        <fa icon="heart" size="lg" class="text-red-800" />
        <fa icon="heart" size="lg" class="text-red-800" />
      </p>
      <div class="floa-left contributors">
        <template v-for="user in contributors">
          <template v-if="user.link">
            <a :key="user.name" :href="user.link" class="text-sm text-purple-800">
              @{{ user.name }}
            </a>
          </template>
          <template v-else>
            <span :key="user.name" class="text-sm">
              {{ user.name }}
            </span>
          </template>
        </template>
        <span v-if="contributors.length == 0" class="text-center italic text-blue-700 contributors-empty">
          {{ $t('pages.about.no-contributors') }}
          <fa :icon="['far', 'sad-tear']" size="lg"/>
        </span>
      </div>
      <h1 class="text-2xl italic text-gray-800 pr-4">
        <a href="https://germainremi.fr" class="text-purple-800 hover:text-purple-500">
          @GERMAIN remi
        </a>
      </h1>
      <p class="text-gray-800">
        <extra-img src="profil/profil.jpg" :exclude="['desktop']" class-native="rounded-full -sm:w-1/4 w-1/6 float-left p-2" />
        {{ $t('pages.about.creator-description') }}
      </p>
      <h4 class="text-xl text-md capitalize">
        {{ $t('pages.about.help-me') }}
      </h4>
      <p class="text-center text-gray-800 text-sm">
        {{ $t('pages.about.help-me-description') }}
      </p>
      <a href="//TODO" class="px-3 py-3 bg-gray-900 text-white font-bold rounded-sm hover:bg-gray-800 btn-icon-show">
        {{ $t('pages.about.buy-me-coffe') }}
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
  async asyncData({ $content }) {
    return {contributors: await $content("contributors")
      .sortBy("name")
      .fetch()
      }
  }
}
</script>

<style lang="scss">

@media screen and (max-width:900px){
  .grid-about-intro {
    grid-column: span 2;
  }
}
.grid-about-intro > * {
  margin-top: 1em
}

@screen -md {
  .grid-about-intro > * {
    margin-top: 1em
  }
}

.contributors > * + * {
  padding: .4em;
}

.contributors > :not(:last-child) {
  &::after {
    content: '/';
    color: black;
  }
}
</style>
