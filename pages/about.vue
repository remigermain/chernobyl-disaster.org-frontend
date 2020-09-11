<template>
  <div class="grid-about">
    <section class="about-description text-center">
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributing') }}
        </h2>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500" :title="$t('pages.about.contribute-gitlab')">
          <svg-icon name="brand-gitlab" role="img" aria-label="Gitlab" />
          Gitlab
        </a>
        <a href="//TODO" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500" :title="$t('pages.about.contribute-translate')">
          <svg-icon name="language" role="img" :aria-label="$t('pages.about.translation')" />
          {{ $t('pages.about.translation') }}
        </a>
        <extra-nuxt-link :to="{name: 'contact'}" class="px-4 py-4 font-bold rounded-sm hover:text-gray-500"
                         :title="$t('pages.about.contact')"
        >
          <svg-icon name="mail" role="img" :aria-label="$t('pages.about.contact')" />
          {{ $t('pages.about.contact') }}
        </extra-nuxt-link>
      </section>
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributors') }}
          <div class="wrapper text-red-800">
            <svg-icon name="heart" class="text-red-800" role="img" :aria-label="$t('utils.love')" />
          </div>
        </h2>
        <p class="text-gray-800">
          {{ $t('pages.about.thanks-contributors') }}
          <svg-icon name="heart" class="text-red-800" role="img" :aria-label="$t('utils.love')" />
          <svg-icon name="heart" class="text-red-800" role="img" :aria-label="$t('utils.love')" />
        </p>
      </section>
      <section class="floa-left contributors">
        <template v-for="user in contributors">
          <span :key="user" class="text-sm">
            {{ user }}
          </span>
        </template>
        <span v-if="contributors.length == 0" class="text-center italic text-blue-700 contributors-empty">
          {{ $t('pages.about.no-contributors') }}
          <svg-icon name="mood-sad" role="img" :aria-label="$t('utils.mood-sad')" />
        </span>
      </section>
      <article>
        <h2 class="text-3xl italic text-gray-800 pr-4">
          <a href="https://germainremi.fr" class="text-purple-800 hover:text-purple-500" :title="$t('pages.about.creator-website')">
            @GERMAIN remi
          </a>
        </h2>
        <p class="text-gray-800">
          <picture>
            <img loading="lazy" alt="germain remi" src="~/assets/img/profil/profil.jpg" class="rounded-full -sm:w-1/4 w-1/6 float-left p-2 about-profil">
          </picture>
          {{ $t('pages.about.creator-description') }}
        </p>
      </article>
      <article>
        <h4 class="text-3xl text-md capitalize">
          {{ $t('pages.about.help-me') }}
        </h4>
        <p class="text-center text-gray-800 text-md">
          {{ $t('pages.about.help-me-description') }}
        </p>
      </article>
      <a href="//TODO" class="px-3 py-3 bg-gray-900 text-white relative transition-all duration-400 font-bold rounded-sm group hover:bg-gray-800 btn-icon-show overflow-hidden"
         :title="$t('pages.about.help-me')"
      >
        {{ $t('pages.about.buy-me-coffe') }}
        <svg-icon name="mug" role="img" :aria-label="$t('pages.about.buy-me-coffe')"
                  class="transition-all duration-400 group-hover:scale-150 transform group-hover:translate-x-1 ml-2"
        />
      </a>
    </section>
    <div class="about-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-about.jpeg" alt="home-img" class="about-image-item">
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",

  asyncData({app}) {
    return app.$axios.get("populate/contributors")
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return {contributors: response.data.results }
      })
      .catch(() => {
        return {contributors: [] }
      })
  },

  head () {
    return {
      title: this.$t("menu.about"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.about.description") },
          { property: "og:title", content: this.$t("menu.about")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.about.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.about.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("menu.about") },
          { name: "twitter:description", content: this.$t("pages.about.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("menu.about") }
      ]
    }
  }

}
</script>


<style lang="scss" scoped>
.grid-about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.about-description {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
  & > * + * {
    margin-top: 1rem
  }
}

.about-image {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 4rem;
  .about-image-item {
    object-fit: cover;
  }
}

@media screen and (max-width:1200px){
  .about-description  {
    padding: 2rem;
  }
}

@media screen and (max-width:1000px){
  .about-image {
    width: 100vw;
    height: 100vh;
    margin: 0;
    justify-content: end;
    transform: translate(0, -50%);
    top: 50%;
    right: 0;
    position: absolute;
    z-index: -1;
    opacity: .3;
    .about-image-item {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  .about-description  {
    grid-area: 1 / 1 / 1 / 3;
  }
}

.about-profil {
  shape-outside: circle();
}
</style>
