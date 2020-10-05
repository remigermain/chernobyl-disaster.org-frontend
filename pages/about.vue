<template>
  <div class="grid-common">
    <section class="common-description text-center space-y-4 z-0">
      <section>
        <h1 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributing') }}
        </h1>
        <a href="https://gitlab.com/chernobyl.org" target="_blank" rel="noopener,noreferrer"
           class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-700 hover:scale-105 transform transition-transform duration-300"
           :title="$t('pages.about.contribute-gitlab')"
        >
          <svg-icon name="brand-gitlab" role="img" aria-label="Gitlab" />
          Gitlab
        </a>
        <extra-nuxt-link :to="{name: 'contribute-translate'}" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-700 hover:scale-105 transform transition-transform duration-300"
                         :title="$t('pages.about.contribute-translate')"
        >
          <svg-icon name="language" role="img" :aria-label="$t('utils.translation')" />
          {{ $t('utils.translation') }}
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: 'auth-login'}" class="inline-block px-4 py-4 font-bold rounded-sm hover:text-gray-700 hover:scale-105 transform transition-transform duration-300"
                         :title="$t('auth.connection-account')"
        >
          <svg-icon name="user" role="img" :aria-label="$t('auth.connection-account')" />
          {{ $t('auth.connection-account') }}
        </extra-nuxt-link>
      </section>
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.donators') }}
        </h2>
        <h2 class="text-gray-800 font-medium italic text-opacity-75 leading-3">
          <div class="inline-flex relative">
            <svg-icon name="heart" class="text-red-800 relative" role="img" :aria-label="$t('utils.love')" />
            <svg-icon name="heart" class="text-red-800 absolute animate-ping" role="img" :aria-label="$t('utils.love')" />
          </div>
          {{ $t('pages.about.thanks-donators') }}
          <div class="inline-flex relative">
            <svg-icon name="heart" class="text-red-800 relative" role="img" :aria-label="$t('utils.love')" />
            <svg-icon name="heart" class="text-red-800 absolute animate-ping" role="img" :aria-label="$t('utils.love')" />
          </div>
          <wbr>
        </h2>
        <div class="all-contributor bg-white rounded-lg mt-2 shadow-md p-4 overflow-y-scroll leading-3 font-medium italic text-opacity-75 text-gray-800 space-y-4 space-x-3">
          <span v-for="user in donators" :key="user" class="text-sm inline-block">
            {{ user }}
          </span>
          <span v-if="donators.length === 0" class="text-center italic text-blue-700 contributors-empty">
            {{ $t('pages.about.no-donators') }}
            <svg-icon name="mood-sad" role="img" :aria-label="$t('utils.mood-sad')" />
          </span>
        </div>
      </section>
      <section>
        <h2 class="text-3xl text-md capitalize">
          {{ $t('pages.about.contributors') }}
        </h2>
        <h2 class="text-gray-800 font-medium">
          <div class="inline-flex relative">
            <svg-icon name="heart" class="text-red-800 relative" role="img" :aria-label="$t('utils.love')" />
            <svg-icon name="heart" class="text-red-800 absolute animate-ping" role="img" :aria-label="$t('utils.love')" />
          </div>
          {{ $t('pages.about.thanks-contributors') }}
          <div class="inline-flex relative">
            <svg-icon name="heart" class="text-red-800 relative" role="img" :aria-label="$t('utils.love')" />
            <svg-icon name="heart" class="text-red-800 absolute animate-ping" role="img" :aria-label="$t('utils.love')" />
          </div>
          <wbr>
        </h2>
        <div class="all-contributor bg-white rounded-lg mt-2 shadow-md p-4 overflow-y-scroll leading-3 font-medium italic text-opacity-75 text-gray-800 space-y-4 space-x-3">
          <span v-for="user in contributors" :key="user" class="text-sm inline-block">
            {{ user }}
          </span>
          <span v-if="contributors.length === 0" class="text-center italic text-blue-700 contributors-empty">
            {{ $t('pages.about.no-contributors') }}
            <svg-icon name="mood-sad" role="img" :aria-label="$t('utils.mood-sad')" />
          </span>
        </div>
      </section>
    </section>
    <div class="bg-img-about">
      <picture role="img">
        <source srcset="~/assets/img/background-about-mobile.webp" media="(max-width: 550px)" type="image/webp">
        <source srcset="~/assets/img/background-about-mobile.jpeg" media="(max-width: 550px)" type="image/jpeg">
        <source srcset="~/assets/img/background-about-tablet.webp" media="(max-width: 850px)" type="image/webp">
        <source srcset="~/assets/img/background-about-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
        <source srcset="~/assets/img/background-about.webp" media="(min-width: 850px)" type="image/webp">
        <img loading="lazy" src="~/assets/img/background-about.jpeg" alt="image" type="image/jpeg" class="h-full w-full object-cover">
      </picture>
    </div>
    <div class="common-about space-y-4 z-0">
      <article class="w-full inline-grid">
        <a href="https://germainremi.fr" target="_blank" rel="noopener,noreferrer"
           class="text-center text-2xl font-medium leading-3 italic text-opacity-75 py-2 hover:scale-105 transform transition-transform duration-300"
           :title="$t('pages.about.creator-website')">
          <h1>
            <svg-icon name="link" />
            GERMAIN Rémi
          </h1>
        </a>
        <div class="text-gray-800 text-justify font-medium mb-6 description">
          <picture role="img">
            <source srcset="~/assets/img/profil/profil-tablet.webp" media="(max-width: 850px)" type="image/webp">
            <source srcset="~/assets/img/profil/profil-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
            <source srcset="~/assets/img/profil/profil.webp" media="(min-width: 850px)" type="image/webp">
            <img loading="lazy" src="~/assets/img/profil/profil.jpeg" alt="image" type="image/jpeg" class="gray-filter rounded-full -sm:w-1/4 w-1/6 float-left p-2 about-profil">
          </picture>
          {{ $t('pages.about.creator-description') }}
        </div>
      </article>
      <article class="text-center">
        <h2 class="text-center text-2xl font-medium leading-3 italic text-opacity-75 py-2 rounded-md inline-grid">
          {{ $t('pages.about.help-us') }}
        </h2>
        <p class="text-gray-800 text-md text-justify font-medium description-help">
          {{ $t('pages.about.help-us-description') }}
        </p>
      </article>
      <div class=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex justify-around flex-wrap items-center gap-4">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" rel="noopener,noreferrer">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="JKC2WU8HYUNVA" />
          <button type="submit"  class="flex flex-col items-center space-y-2 group">
            <div class=" h-12 w-12 flex justify-center items-center bg-blue-700 rounded-full shadow-sm">
              <svg-icon name="brand-paypal" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-2xl" />
            </div>
            <span class="font-bold uppercase text-base">Paypal</span>
            </button>
        </form>
        <a href="https://www.buymeacoffee.com/rgermain" target="_blank" rel="noopener,noreferrer" class="flex flex-col items-center space-y-2 group">
          <div class=" h-12 w-12 flex justify-center items-center bg-green-700 rounded-full shadow-sm">
            <svg-icon name="mug" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-2xl" />
          </div>
          <span class="font-bold uppercase text-base">buy me a coffee</span>
        </a>
        <a href="https://liberapay.com/rgermain/donate" target="_blank" rel="noopener,noreferrer" class="flex flex-col items-center space-y-2 group">
          <div class=" h-12 w-12 flex justify-center items-center bg-yellow-600 rounded-full shadow-sm">
            <svg-icon name="liberapay" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-2xl" />
          </div>
          <span class="font-bold uppercase text-base">liberapay</span>
        </a>
      </div>
      <extra-nuxt-link :to="{name: 'contact'}" class="flex flex-col items-center space-y-2 group" :title="$t('pages.about.contact')">
        <div class=" h-12 w-12 flex justify-center items-center bg-gray-800 rounded-full shadow-sm">
          <svg-icon name="mail" :aria-label="$t('pages.about.contact')" class="group-hover:scale-110 transform transition-transform duration-300 text-white text-2xl" />
        </div>
        <span class="font-bold uppercase text-base">{{ $t('pages.about.contact') }}</span>
      </extra-nuxt-link>
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
        return {
          contributors: response.data.contributors,
          donators: response.data.donators
        }
      })
      .catch(() => {
        return {contributors: [], donators: [] }
      })
  },

  data () {
    return {
      activeDonation: false
    }
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

.all-contributor {
  height: auto;
  max-height: 200px;
}
.dark-mode .all-contributor {
  @apply bg-gray-800
}

.sub-mt {
  margin-top: -1em !important;
}
.common-about {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.bg-img-about {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  opacity: 0.1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.gray-filter {
  filter: grayscale(1);
}

@media screen and (max-width: 1000px) {
  .common-about {
    width: 200%;
    margin-top: 2em;
    grid-area: unset;
  }
}

.dark-mode {
  .description, .description-help {
    @apply text-gray-600
  }
}

</style>
