<template>
  <div class="gallery-toolbar">
    <div class="flex bg-gray-800 rounded text-white w-full">
      <button class="toolbar-option hidden w-1/4 text-center py-2 rounded-l-sm cursor-pointer toolbar-link"
              :class="{'bg-gray-700': option}"
              @click="showOption"
      >
        <icon-settings stroke-width="1.5" />
      </button>
      <lazy-extra-nuxt-link :to="{name: 'gallery-picture'}" class="w-1/4 text-center py-2 rounded-l-sm cursor-pointer toolbar-link">
        <icon-photo stroke-width="1.5" />
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-video'}" class="w-1/4 text-center py-2 cursor-pointer toolbar-link">
        <icon-movie stroke-width="1.5" />
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-document'}" class="w-1/4 text-center py-2 cursor-pointer toolbar-link">
        <icon-file stroke-width="1.5" />
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-article'}" class="w-1/4 text-center py-2 rounded-r-sm cursor-pointer toolbar-link">
        <icon-article stroke-width="1.5" />
      </lazy-extra-nuxt-link>
    </div>
    <div class="toolbar-item" :class="{'hide-option': !option}">
      <field-text v-model="search" :field="{label: $t('tools.search') }" class="toolbar-search">
        <template v-slot:icon>
          <icon-search />
        </template>
      </field-text>
      <div class="toolbar-order">
        <span class="text-md text-gray-600 capitalize">
          {{ $t('tools.sort-by') }}
        </span>
        <select v-model="ordering" class="p4 rounded-md shadow-xl text-center border border-gray-900 h-min w-full">
          <option v-for="choices in orderingChoices" :key="choices.value" :value="choices.value">
            {{ choices.label }}
          </option>
          <option value="" selected class="text-opacity-50 text-lg">
            {{ empty }}
          </option>
        </select>
      </div>
      <button class="px-2 py-4 rounded shaodw bg-blue-800 hover:bg-blue-700 text-white w-full text-center" @click="submit">
        {{ $t('tools.searched') }}
      </button>
    </div>
  </div>
</template>

<script>

import iconMovie from "@/assets/svg/movie.svg"
import iconPhoto from "@/assets/svg/photo.svg"
import iconFile from "@/assets/svg/file-text.svg"
import iconArticle from "@/assets/svg/news.svg"
import iconSearch from "@/assets/svg/search.svg"
import iconSettings from "@/assets/svg/settings.svg"
import has from "lodash/has"
import isNil from "lodash/isNil"

export default {

  components: {
    iconMovie,
    iconPhoto,
    iconFile,
    iconSearch,
    iconArticle,
    iconSettings
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
        ordering: this.ordering
      }
      this.$router.push({query})
      this.option = false
    }
  },

}
</script>

<style lang="scss">

.toolbar-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.toolbar-item > * {
  margin-top: .5em;
  padding: .5em;
}

.toolbar-link {
  transition: transform .2s;
  &.nuxt-link-active, &:hover {
    background-color: rgb(233, 233, 233);
    color: rgba(45, 55, 72, 1);
  }
}

@media screen and (max-width: 1300px) {
  .toolbar-item.hide-option {
    display: none;
  }
  .hide-option {
    display: block;
  }
  .toolbar-option {
    display: block;
  }
  .toolbar-search,
  .toolbar-order {
    width: 50%;
  }
}

@media screen and (max-width: 800px) {
  .toolbar-search,
  .toolbar-order {
    width: 100%;
  }
}

</style>
