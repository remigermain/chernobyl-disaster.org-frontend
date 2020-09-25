<template>
  <div class="grid-common">
    <section class="common-description text-center space-y-4 description-about">
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributing') }}
        </h2>
        <a :href="$gitlab" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-500 hover:scale-125 transform transition-transform duration-150"
           :title="$t('pages.about.contribute-gitlab')"
        >
          <svg-icon name="brand-gitlab" role="img" aria-label="Gitlab" />
          Gitlab
        </a>
        <extra-nuxt-link :to="{name: 'contribute-translate'}" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-500 hover:scale-125 transform transition-transform duration-150"
                         :title="$t('pages.about.contribute-translate')"
        >
          <svg-icon name="language" role="img" :aria-label="$t('utils.translation')" />
          {{ $t('utils.translation') }}
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: 'auth-login'}" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-500 hover:scale-125 transform transition-transform duration-150"
                         :title="$t('auth.connection-account')"
        >
          <svg-icon name="user" role="img" :aria-label="$t('auth.connection-account')" />
          {{ $t('auth.connection-account') }}
        </extra-nuxt-link>
      </section>
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributors') }}
        </h2>
        <h2 class="text-gray-800 font-medium">
          {{ $t('pages.about.thanks-contributors') }}
          <div class="inline-flex relative">
            <svg-icon name="heart" class="text-red-800 relative" role="img" :aria-label="$t('utils.love')" />
            <svg-icon name="heart" class="text-red-800 absolute animate-ping" role="img" :aria-label="$t('utils.love')" />
          </div>
          <div class="inline-flex relative">
            <svg-icon name="heart" class="text-red-800 relative" role="img" :aria-label="$t('utils.love')" />
            <svg-icon name="heart" class="text-red-800 absolute animate-ping" role="img" :aria-label="$t('utils.love')" />
          </div>
          <wbr>
        </h2>
        <div class="all-contributor">
          <span v-for="user in contributors" :key="user" class="text-sm">
            {{ user }}
          </span>
        </div>
        <span v-if="contributors.length === 0" class="text-center italic text-blue-700 contributors-empty">
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
        <div class="text-gray-800 text-justify font-medium">
          <picture role="img">
            <source srcset="~/assets/img/profil/profil-tablet.webp" media="(max-width: 850px)" type="image/webp">
            <source srcset="~/assets/img/profil/profil-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
            <source srcset="~/assets/img/profil/profil.webp" media="(min-width: 850px)" type="image/webp">
            <img loading="lazy" src="~/assets/img/profil/profil.jpeg" alt="image" type="image/jpeg" class="rounded-full -sm:w-1/4 w-1/6 float-left p-2 about-profil">
          </picture>
          {{ $t('pages.about.creator-description') }}
        </div>
      </article>
      <extra-nuxt-link :to="{name: 'contact'}" class="px-3 py-3 bg-gray-900 text-white relative transition-all duration-400 font-bold
                                                      rounded-full group hover:bg-gray-800 btn-icon-show overflow-hidden"
                       :title="$t('pages.about.contact')"
      >
        {{ $t('pages.about.contact') }}
        <svg-icon name="mail" role="img" :aria-label="$t('pages.about.contact')"
                  class="transition-all duration-400 group-hover:scale-150 transform group-hover:translate-x-1 mx-2"
        />
      </extra-nuxt-link>
      <article>
        <h4 class="text-3xl text-md capitalize">
          {{ $t('pages.about.help-me') }}
        </h4>
        <p class="text-gray-800 text-md text-justify font-medium">
          {{ $t('pages.about.help-me-description') }}
        </p>
      </article>
      <a href="//TODO" class="px-3 py-3 bg-gray-900 text-white relative transition-all duration-400 font-bold rounded-full group hover:bg-gray-800 btn-icon-show overflow-hidden"
         :title="$t('pages.about.help-me')"
      >
        {{ $t('pages.about.buy-me-coffe') }}
        <svg-icon name="mug" role="img" :aria-label="$t('pages.about.buy-me-coffe')"
                  class="transition-all duration-400 group-hover:scale-150 transform group-hover:translate-x-1 mx-2"
        />
      </a>
    </section>
    <div class="common-image">
      <picture role="img">
        <!-- <source srcset="~/assets/img/background-about-mobile.avif" media="(max-width: 550px)" type="image/avif"> -->
        <source srcset="~/assets/img/background-about-mobile.webp" media="(max-width: 550px)" type="image/webp">
        <source srcset="~/assets/img/background-about-mobile.jpeg" media="(max-width: 550px)" type="image/jpeg">
        <!-- <source srcset="~/assets/img/background-about-tablet.avif" media="(max-width: 850px)" type="image/avif"> -->
        <source srcset="~/assets/img/background-about-tablet.webp" media="(max-width: 850px)" type="image/webp">
        <source srcset="~/assets/img/background-about-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
        <!-- <source srcset="~/assets/img/background-about.avif" media="(min-width: 850px)" type="image/avif"> -->
        <source srcset="~/assets/img/background-about.webp" media="(min-width: 850px)" type="image/webp">
        <img loading="lazy" src="~/assets/img/background-about.jpeg" alt="image" type="image/jpeg" class="common-img">
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",

  transition: "common",

  asyncData({app}) {
    return app.$axios.get("populate/contributors")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
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
.about-profil {
  shape-outside: circle();
}

// .description-about {
//   height: calc(100% + 80px);
// }

.all-contributor {
  height: auto;
  max-height: 200px;
  overflow-y: scroll;
}

</style>
