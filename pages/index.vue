<template>
  <div class="grid-common">
    <article class="common-description description-home">
      <h1 class="text-2xl uppercase extra-auto transition-opacity duration-300 z-1 italic text-opacity-50 tracking-tighter font-bold">
        {{ $t('word.presentation') }}
      </h1>
      <p class="mb-16 text-lg leading-7 break-words inline-block mt-2 font-medium">
        {{ $t('description.home') }}
      </p>
      <nuxt-link  :to="localePath({name: 'timeline'})" class="dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-400
        group px-4 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800"
                            :title="$t('text.goto-timeline')"
      >
        {{ $t('menu-name.timeline') }}
        <svg-icon name="caret-right" role="img" aria-label="arrow" class="transition-all duration-400 group-hover:scale-150 transform group-hover:translate-x-2" />
      </nuxt-link>
    </article>
    <div class="common-image">
      <picture role="img">
        <source srcset="~/assets/img/background-home-tablet.webp" media="(max-width: 850px)" type="image/webp">
        <source srcset="~/assets/img/background-home-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
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
    const title = this.$t("menu-name.home")
    const description = this.$t("description.home").slice(0, 159)
    return {
      title,
      meta: [
          { hid: "description", name: "description", content: description },
          { property: "og:title", content: title},
          { property: "og:description", content: description},
          { name: "twitter:card", content: description },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
          { name: "twitter:image:alt", content: title }
      ]
    }
  }

}
</script>
