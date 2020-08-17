<template>
  <div class="gallery-toolbar">
    <field-text v-model="search" :field="{label: $t('tools.search') }" class="toolbar-search">
      <template v-slot:icon>
        <icon-search />
      </template>
      <template v-slot:icon-right>
        <button class="p-2 bg-gray-700 rounded-md text-white hover:bg-gray-800" @click="submit">
          {{ $t('utils.search') }}
        </button>
      </template>
    </field-text>
    <div class="toolbar-menu">
      <lazy-extra-nuxt-link :to="{name: 'gallery-picture'}" class="toolbar-link">
        <icon-photo stroke-width="1.5" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.picture') }}
        </span>
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-video'}" class="toolbar-link">
        <icon-movie stroke-width="1.5" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.video') }}
        </span>
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-document'}" class="toolbar-link">
        <icon-file stroke-width="1.5" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.document') }}
        </span>
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery-article'}" class="toolbar-link">
        <icon-article stroke-width="1.5" />
        <span class="gallery-toolbar-text">
          {{ $t('menu.article') }}
        </span>
      </lazy-extra-nuxt-link>
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
    iconSearch,
    iconArticle,
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
.gallery-toolbar {
  display: flex;
  flex-direction: row;
  padding: .5rem;
}
.toolbar-search, .toolbar-menu {
  width: 50%;
  padding: .5rem;
}

.toolbar-menu, .toolbar-search {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.toolbar-menu > * + * {
  margin-left: 1rem
}

@media screen and (max-width: 800px) {
  .gallery-toolbar {
    flex-direction: column;
  }
  .toolbar-menu, .toolbar-search {
    width: 100%
  }
  .gallery-toolbar-text {
    display: none;
  }
}



.toolbar-link {
  &::after {
    transition: width .4s, opacity .5s;
    content: '';
    width: 0;
    height: 3px;
    background-color: black;
    display: block;
    border-radius: 3px;
    opacity: 0;
  }
  &.nuxt-link-active {
    opacity: 1;
    &::after, &::after {
      width: 100%;
      opacity: 1;
    }
  }
  &:not(.nuxt-link-active)
  {
    opacity: .5;
    &:hover {
      opacity: 1;
      &::after {
        width: 100%;
        opacity: 1;
      }
    }
  }
}
</style>
