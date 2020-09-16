<template>
  <div class="grid-common">
    <article class="common-description">
      <h1 class="text-2xl uppercase extra-auto transition-opacity duration-400 z-1 italic text-opacity-50 tracking-tighter font-bold">
        {{ $t('pages.home.presentation') }}
      </h1>
      <p class="mb-16 text-lg leading-7 break-words inline-block mt-2">
        {{ $t('pages.home.description') }}
        {{ $t('pages.about.description') }}
      </p>
      <lazy-extra-nuxt-link :to="{name: 'timeline'}" class="group px-4 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800"
                            :title="$t('utils.goto-timeline')"
      >
        {{ $t('menu.timeline') }}
        <svg-icon name="caret-right" role="img" aria-label="arrow" class="transition-all duration-400 group-hover:scale-150 transform group-hover:translate-x-2" />
      </lazy-extra-nuxt-link>
    </article>
    <div class="common-image">
      <picture role="img">
        <!-- <source srcset="~/assets/img/background-home-mobile.avif" media="(max-width: 550px)" type="image/avif"> -->
        <source srcset="~/assets/img/background-home-mobile.webp" media="(max-width: 550px)" type="image/webp">
        <source srcset="~/assets/img/background-home-mobile.jpeg" media="(max-width: 550px)" type="image/jpeg">
        <!-- <source srcset="~/assets/img/background-home-tablet.avif" media="(max-width: 850px)" type="image/avif"> -->
        <source srcset="~/assets/img/background-home-tablet.webp" media="(max-width: 850px)" type="image/webp">
        <source srcset="~/assets/img/background-home-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
        <!-- <source srcset="~/assets/img/background-home.avif" media="(min-width: 850px)" type="image/avif"> -->
        <source srcset="~/assets/img/background-home.webp" media="(min-width: 850px)" type="image/webp">
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="image" type="image/jpeg" class="common-img">
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  transition: "common",

  head () {
    return {
      title: this.$t("menu.home"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.home.description") },
          { property: "og:title", content: this.$t("pages.meta.home.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.home.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.home.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.home.title") },
          { name: "twitter:description", content: this.$t("pages.home.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.home.title") }
      ]
    }
  }

}
</script>
