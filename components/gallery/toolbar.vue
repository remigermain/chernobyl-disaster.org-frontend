<template>
  <div class="wrapper">
    <div class="fix-mobile" />
    <div class="gallery-toolbar hide-scroolbar overflow-x-hidden" :class="{'active': active}">
      <div class="gallery-toolbar-mobile bg-gray-800" @click="toogleActive">
        <span class="ml-6 w-2/4 capitalize">
          {{ $t('menu-name.medias') }}
        </span>
        <span class="mr-6 text-right w-2/4">
          <svg-icon name="arrow-up" class="gallery-toolbar-mobile-icon" :class="{'active': active}" />
        </span>
      </div>
      <nav class="gallery-toolbar-desktop overflow-y-scroll  wrapper" :class="{'active': active}">
        <field-search v-model="search" :button="false" />
        <label :name="$t('text.change-sort-order')" class="px-2 w-full">
          <select v-model="ordering" class="form-select bg-gray-200 w-full dark:border-none mt-2 text-center" :aria-label="$t('word.sort-by')">
            <option v-for="choice in orderingChoices" :key="choice.value" :value="choice.value">
              {{ choice.label }}
            </option>
            <option selected value="">
              {{ this.$t("word.nothing") }}
            </option>
          </select>
        </label>
        <button class="p-2 mx-2 h-10 rounded-md text-md text-white bg-indigo-600 hover:bg-indigo-700 text-center" @click="submit">
          {{ $t('word.search') }}
        </button>
        <span class="border-b border-gray-500" />
        <div class="toolbar-menu">
          <nuxt-link  :to="localePath({name: 'gallery-picture'})" class="toolbar-link"
                                :title="$t('text.goto-gallery-picture')"
          >
            <svg-icon name="photo" class="w-6 h-6" role="img" :aria-label="$t('menu-name.picture')" />
            <span class="gallery-toolbar-text">
              {{ $t('menu-name.picture') }}
            </span>
          </nuxt-link>
          <nuxt-link  :to="localePath({name: 'gallery-video'})" class="toolbar-link"
                                :title="$t('text.goto-gallery-video')"
          >
            <svg-icon name="movie" class="w-6 h-6" role="img" :aria-label="$t('menu-name.video')" />
            <span class="gallery-toolbar-text">
              {{ $t('menu-name.video') }}
            </span>
          </nuxt-link>
        </div>
        <span class="border-b border-gray-500" />
        <div class="toolbar-peoples">
          <span v-for="p in $store.getters['model/peoples']" :key="p.id" class="toolbar-people-item group hover:bg-gray-300 rounded-md dark:hover:bg-gray-700"
                role="button"
                tabindex="0"
                @click="submitPeople(p.name)"
          >
            <picture>
              <source :srcset="$media(p.profil.thumbnail_webp)" type="image/webp" />
              <img :src="$media(p.profil.thumbnail_jpeg)"
                  class="w-12 rounded-full object-cover h-12"
                  :alt="p.name"
                  role="button"
                  type="image/jepg"
              >
            </picture>
            <span class=" break-words group-hover:text-indigo-700 dark:group-hover:text-gray-200">
              {{ p.name }}
            </span>
          </span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      search: "",
      ordering: "",
      active: false,
      orderingChoices: [
        {label: `${this.$t("word.added")} - ${this.$t("word.ascending")}`, value: "id"},
        {label: `${this.$t("word.added")} - ${this.$t("word.descending")}`, value: "-id"},
        {label: `${this.$t("word.date")} - ${this.$t("word.ascending")}`, value: "date"},
        {label: `${this.$t("word.date")} - ${this.$t("word.descending")}`, value: "-date"},
        {label: `${this.$t("word.name")} - ${this.$t("word.ascending")}`, value: "title"},
        {label: `${this.$t("word.name")} - ${this.$t("word.descending")}`, value: "-title"},
        {label: `${this.$t("menu-name.event")} - ${this.$t("word.ascending")}`, value: "event__date"},
        {label: `${this.$t("menu-name.event")} - ${this.$t("word.descending")}`, value: "-event__date"},
      ]
    }
  },

  beforeMount () {
    this.initQuery()
  },

  methods: {
    initQuery () {
      this.search = this.$route.query.search || ""

      // set value of order if exists in choices
      if (
          this.$route.query.ordering &&
          this.orderingChoices.some(obj => obj.value === this.$route.query.ordering)
      ){
        this.ordering = this.$route.query.ordering
      }
    },
    toogleActive () {
      this.active = !this.active
    },
    submit () {
      const query = {
        ...this.$route.query,
        search: this.search,
        ordering: this.ordering,
      }
      // this.initQuery()
      this.$router.push({query})
      this.active = false
    },
    submitPeople (name) {
      this.search = name
      this.submit()
    }
  },

}
</script>

<style lang="scss" scoped>
.gallery-toolbar {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  & > .gallery-toolbar-desktop > * + * {
    margin-top: .5rem;
  }
}

.fix-mobile {
  display: none;
  height: 50px;
  width: 100%;
}

.toolbar-menu {
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: .5rem;
  }
  .toolbar-link {
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: opacity .4s;
    font-weight: 600;
    & > svg {
      width: 2em;
    }
    & > span {
      width: 4em;
    }
    &:not(.nuxt-link-active) {
      opacity: .7;
    }
    &:hover {
      opacity: 1;
    }
  }
}

.toolbar-peoples {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  .toolbar-people-item {
    display: flex;
    justify-content: space-between;
    padding: .3em;
    cursor: pointer;
    & > span {
      width: 180px;
      display: flex;
      align-items: center;
      margin-left: .5em;
    }
  }
  & > * + * {
    margin-top: .2em;
  }
}
.gallery-toolbar-mobile {
  display: none;
  height: 60px;
  min-height: 60px;
  align-items: center;
  cursor: pointer;
  color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}


@media screen and (max-width: 840px) {
  .gallery-toolbar{
    grid-area: 2 / 1 / 2 / 2;
    padding: 0;
    height: 60px;
    transition: height .6s;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    &.active {
      height: 70vh;
    }
  }
  .gallery-toolbar-mobile {
    display: flex;
  }

  .dark {
    .toolbar-search,
    .gallery-toolbar-desktop {
      @apply bg-gray-900
    }
  }

  .gallery-toolbar-desktop {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
    z-index: 1;
    & > .gallery-toolbar-desktop > * + * {
      margin-top: .5rem;
    }
    background-color: white;
    & > .toolbar-menu {
      flex-direction: row;
    }
    & > .toolbar-peoples {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .toolbar-people-item {
    width: 33%
  }
  .toolbar-link {
    width: 50%;
    margin-top: 0;
    & > svg {
      width: 24px;
    }
  }

  .fix-mobile {
    display: block;
  }
}

.gallery-toolbar-mobile-icon {
  transition: transform .5s;
  &.active {
    transform: rotate(-180deg);
  }
}


@media screen and (max-width: 600px) {
  .toolbar-people-item {
    width: 50%
  }
}

@media screen and (max-width: 550px) {
  .toolbar-menu {
    flex-wrap: wrap;
    & > * {
      width: 50%
    }
    .toolbar-link > svg {
      width: 30px;
    }
  }
}

@media screen and (max-width: 500px) {
  .toolbar-people-item {
    width: 100%
  }
}
</style>
