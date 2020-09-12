<template>
  <div class="grid-index">
    <article class="index-description">
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
    <div class="index-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="index-image-item">
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

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
