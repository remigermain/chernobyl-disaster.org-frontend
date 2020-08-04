<template>
  <div class="wrapper">
    <div class="flex flex-col justify-center items-center grid-about-intro z-2">
      <h2 class="text-3xl text-md capitalize">
        {{ $t('pages.about.contributing') }}
      </h2>
      <div>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500">
          <icon-brand-gitlab />
          Gitlab
        </a>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500">
          <icon-tipography />
          {{ $t('pages.about.traduction') }}
        </a>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500">
          <icon-mail />
          {{ $t('pages.about.contact') }}
        </a>
      </div>
      <h3 class="text-3xl text-md capitalize">
        {{ $t('pages.about.contributors') }}
        <div class="wrapper text-red-800">
          <icon-heart class="text-red-800" />
        </div>
      </h3>
      <p class="text-gray-800">
        {{ $t('pages.about.thanks-contributors') }}
        <icon-heart class="text-red-800" />
        <icon-heart class="text-red-800" />
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
          <icon-mood-sad />
        </span>
      </div>
      <h1 class="text-2xl italic text-gray-800 pr-4">
        <a href="https://germainremi.fr" class="text-purple-800 hover:text-purple-500">
          @GERMAIN remi
        </a>
      </h1>
      <p class="text-gray-800">
        <extra-img src="profil/profil.jpg" :exclude="['desktop']" class-native="rounded-full -sm:w-1/4 w-1/6 float-left p-2 img-profil" />
        {{ $t('pages.about.creator-description') }}
      </p>
      <h4 class="text-xl text-md capitalize">
        {{ $t('pages.about.help-me') }}
      </h4>
      <p class="text-center text-gray-800 text-sm">
        {{ $t('pages.about.help-me-description') }}
      </p>
      <a href="//TODO" class="px-3 py-3 bg-gray-900 text-white font-bold rounded-sm hover:bg-gray-800 btn-icon-show overflow-hidden">
        {{ $t('pages.about.buy-me-coffe') }}
        <icon-mood-smile />
      </a>
    </div>
    <div class="overflow-hidden m-10 flex justify-center items-center grid-home-image">
      <extra-img src="background-about.jpeg" :default="true" class-native="object-cover" />
    </div>
  </div>
</template>

<script>
import iconBrandGitlab from "@/assets/svg/brand-gitlab.svg"
import iconHeart from "@/assets/svg/heart.svg"
import iconMoodSad from "@/assets/svg/mood-sad.svg"
import iconMoodSmile from "@/assets/svg/mood-smile.svg"
import iconMail from "@/assets/svg/mail.svg"
import iconTipography from "@/assets/svg/typography.svg"
export default {

  components: {
    iconBrandGitlab,
    iconHeart,
    iconMoodSmile,
    iconMoodSad,
    iconMail,
    iconTipography
  },

  async asyncData() {
    return {contributors: [] }
  }

}
</script>

<style lang="scss">

.grid-home-image {
  grid-area: 2 / 4 / 6 / 6;
}

.grid-about-intro {
  grid-area: 2 / 1 / 6 / 4;
}

@media screen and (max-width:900px){
  .grid-about-intro {
    grid-area: 2 / 1 / 6 / 6;
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

.img-profil {
  shape-outside: circle();
}

</style>
