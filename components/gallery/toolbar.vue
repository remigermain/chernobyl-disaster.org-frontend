<template>
  <div class="gallery-toolbar">
    <field-text v-model="search" :field="{label: $t('tools.search') }" class="toolbar-search">
      <template v-slot:icon>
        <icon-search />
      </template>
    </field-text>
    <select v-model="ordering" class="form-select bg-gray-200">
      <option v-for="choice in orderingChoices" :key="choice.value" :value="choice.value">
        {{ choice.label }}
      </option>
      <option selected value="">
        {{ empty }}
      </option>
    </select>
    <button class="p-2 bg-gray-700 rounded-md text-white hover:bg-gray-800 text-center" @click="submit">
      {{ $t('utils.search') }}
    </button>
    <span class="border-b border-gray-500" />
    <div class="toolbar-menu">
      <lazy-extra-nuxt-link :to="{name: 'gallery-picture'}" class="toolbar-link">
        <icon-photo stroke-width="2" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.picture') }}
        </span>
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-video'}" class="toolbar-link">
        <icon-movie stroke-width="2" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.video') }}
        </span>
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-document'}" class="toolbar-link">
        <icon-file stroke-width="2" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.document') }}
        </span>
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-article'}" class="toolbar-link">
        <icon-article stroke-width="2" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.article') }}
        </span>
      </lazy-extra-nuxt-link>
    </div>
    <span class="border-b border-gray-500" />
    <div class="toolbar-peoples">
      <span v-for="p in $store.getters['model/peoples']" :key="p.id" class="toolbar-people-item hover:bg-gray-300 rounded-md" @click="submitPeople(p.name)">
        <img :src="p.profil" class="w-12 rounded-full object-cover h-12">
        <span class=" break-words hover:text-indigo-700">
          {{ p.name }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>

import iconMovie from "@/assets/svg/movie.svg"
import iconPhoto from "@/assets/svg/photo.svg"
import iconFile from "@/assets/svg/file-text.svg"
import iconArticle from "@/assets/svg/news.svg"
import iconSearch from "@/assets/svg/search.svg"
import has from "lodash/has"
import isNil from "lodash/isNil"

export default {

  components: {
    iconMovie,
    iconPhoto,
    iconFile,
    iconArticle,
    iconSearch,
  },

  data () {
    return {
      search: "",
      ordering: "",
      option: false,
      orderingChoices: [
        {label: `${this.$t("tools.create")} - ${this.$t("tools.ascending")}`, value: "id"},
        {label: `${this.$t("tools.create")} - ${this.$t("tools.descending")}`, value: "-id"},
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
    if (!isNil(this.$route.query)) {
      // set the value of search
      this.search = this.$route.query.search || ""

      // set value of order if exists in choices
      if (has(this.$route.query, "ordering")) {
        if (this.orderingChoices.some(obj => obj.value === this.$route.query.ordering)) {
          this.ordering = this.$route.query.ordering
        }
      }
    }
  },

  methods: {
    showOption () {
      this.option = !this.option
    },
    submit () {
      const query = {
        ...this.$route.query,
        search: this.search,
        ordering: this.ordering,
      }
      this.$router.push({query})
      this.option = false
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
  padding: .5em;
  & > * + * {
    margin-top: .5rem;
  }
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

</style>
