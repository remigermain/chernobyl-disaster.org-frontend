<template>
  <div class="grid-common">
    <section class="common-description text-center space-y-4 description-about">
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributing') }}
        </h2>
        <a href="//TODO" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-500 hover:scale-125 transform transition-transform duration-150"
           :title="$t('pages.about.contribute-gitlab')"
        >
          <svg-icon name="brand-gitlab" role="img" aria-label="Gitlab" />
          Gitlab
        </a>
        <a href="//TODO" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-500 hover:scale-125 transform transition-transform duration-150"
           :title="$t('pages.about.contribute-translate')"
        >
          <svg-icon name="language" role="img" :aria-label="$t('utils.translation')" />
          {{ $t('utils.translation') }}
        </a>
        <extra-nuxt-link :to="{name: 'contact'}" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-500 hover:scale-125 transform transition-transform duration-150"
                         :title="$t('pages.about.contact')"
        >
          <svg-icon name="mail" role="img" :aria-label="$t('pages.about.contact')" />
          {{ $t('pages.about.contact') }}
        </extra-nuxt-link>
      </section>
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributors') }}
        </h2>
        <p class="text-gray-800">
          {{ $t('pages.about.thanks-contributors') }}
          <wbr>
          <svg-icon name="heart" class="text-red-800" role="img" :aria-label="$t('utils.love')" />
          <svg-icon name="heart" class="text-red-800" role="img" :aria-label="$t('utils.love')" />
          <wbr>
        </p>
        <span v-for="user in contributors" :key="user" class="text-sm">
          {{ user }}
        </span>
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
        <p class="text-gray-800 text-justify">
          <picture role="img">
            <source srcset="~/assets/img/profil/profil-tablet.webp" media="(max-width: 850px)" type="image/webp">
            <source srcset="~/assets/img/profil/profil-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
            <source srcset="~/assets/img/profil/profil.webp" media="(min-width: 850px)" type="image/webp">
            <img loading="lazy" src="~/assets/img/profil/profil.jpeg" alt="image" type="image/jpeg" class="rounded-full -sm:w-1/4 w-1/6 float-left p-2 about-profil">
          </picture>
          {{ $t('pages.about.creator-description') }}
        </p>
      </article>
      <article>
        <h4 class="text-3xl text-md capitalize">
          {{ $t('pages.about.help-me') }}
        </h4>
        <p class="text-center text-gray-800 text-md text-justify">
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
.about-profil {
  shape-outside: circle();
}
.description-about {
  height: calc(100% + 80px);
}

</style>
