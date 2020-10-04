<template>
  <div class="wrapper">
    <div class="fix-mobile" />
    <div class="gallery-toolbar hide-scroolbar" :class="{'active': active}">
      <div class="gallery-toolbar-mobile bg-gray-800" @click="toogleActive">
        <span class="ml-6 w-2/4 capitalize">
          {{ $t('utils.menu-media') }}
        </span>
        <span class="mr-6 text-right w-2/4">
          <svg-icon name="arrow-up" class="gallery-toolbar-mobile-icon" :class="{'active': active}" />
        </span>
      </div>
      <nav class="gallery-toolbar-desktop  wrapper" :class="{'active': active}">
        <field-text v-model="search" :field="{label: $t('utils.search') }" class="toolbar-search" role="search">
          <template v-slot:icon>
            <svg-icon name="search" />
          </template>
        </field-text>
        <label :name="$t('utils.change-sort-order')" class="wrapper">
          <select v-model="ordering" class="form-select bg-gray-200 mt-2" :aria-label="$t('utils.sort-by')">
            <option v-for="choice in orderingChoices" :key="choice.value" :value="choice.value">
              {{ choice.label }}
            </option>
            <option selected value="">
              {{ empty }}
            </option>
          </select>
        </label>
        <button class="p-2 mx-2 h-12 bg-gray-800 rounded-md text-white hover:bg-gray-700 text-center" @click="submit">
          {{ $t('utils.search') }}
        </button>
        <span class="border-b border-gray-500" />
        <div class="toolbar-menu">
          <lazy-extra-nuxt-link :to="{name: 'gallery-picture'}" class="toolbar-link"
                                :title="$t('utils.goto-gallery-picture')"
          >
            <svg-icon name="photo" class="w-6 h-6" role="img" :aria-label="$t('utils.picture')" />
            <span class="gallery-toolbar-text">
              {{ $t('menu.picture') }}
            </span>
          </lazy-extra-nuxt-link>
          <lazy-extra-nuxt-link :to="{name: 'gallery-video'}" class="toolbar-link"
                                :title="$t('utils.goto-gallery-video')"
          >
            <svg-icon name="movie" class="w-6 h-6" role="img" :aria-label="$t('utils.video')" />
            <span class="gallery-toolbar-text">
              {{ $t('menu.video') }}
            </span>
          </lazy-extra-nuxt-link>
        </div>
        <span class="border-b border-gray-500" />
        <div class="toolbar-peoples">
          <span v-for="p in $store.getters['model/peoples']" :key="p.id" class="toolbar-people-item hover:bg-gray-300 rounded-md"
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
            <span class=" break-words hover:text-indigo-700">
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
        {label: `${this.$t("utils.create")} - ${this.$t("tools.ascending")}`, value: "id"},
        {label: `${this.$t("utils.create")} - ${this.$t("tools.descending")}`, value: "-id"},
        {label: `${this.$t("tools.date")} - ${this.$t("tools.ascending")}`, value: "date"},
        {label: `${this.$t("tools.date")} - ${this.$t("tools.descending")}`, value: "-date"},
        {label: `${this.$t("tools.name")} - ${this.$t("tools.ascending")}`, value: "title"},
        {label: `${this.$t("tools.name")} - ${this.$t("tools.descending")}`, value: "-title"},
        {label: `${this.$t("admin.label.event")} - ${this.$t("tools.ascending")}`, value: "event__date"},
        {label: `${this.$t("admin.label.event")} - ${this.$t("tools.descending")}`, value: "-event__date"},
      ]
    }
  },

  beforeMount () {
    if (this.$route.query) {
      // set the value of search
      this.search = this.$route.query.search || ""

      // set value of order if exists in choices
      if (
          this.$route.query.ordering &&
          this.orderingChoices.some(obj => obj.value === this.$route.query.ordering)
          ){
          this.ordering = this.$route.query.ordering
      }
    }
  },

  methods: {
    toogleActive () {
      this.active = !this.active
    },
    submit () {
      const query = {
        ...this.$route.query,
        search: this.search,
        ordering: this.ordering,
      }
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
    & > svg {
      width: 12%;
    }
    & > span {
      width: 50%;
    }
    &:not(.nuxt-link-active) {
      opacity: .4;
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
    background-color: white;
    bottom: 0;
    left: 0;
    z-index: 1;
    &.active {
      height: 70vh;
    }
  }
  .gallery-toolbar-mobile {
    display: flex;
  }
  .gallery-toolbar-desktop {
    select  {
      margin-left: .5rem;
      margin-right: .5rem;
    }
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
