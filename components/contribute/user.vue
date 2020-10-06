<template>
  <div class="w-full">
    <div class="flex flex-col">
      <lazy-contribute-breadcrumb />
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        {{ $t('menu.dashboard') }}
      </h1>
    </div>
    <div class="flex -md:flex-col -md:space-y-8 -md:items-center flex-wrap">
      <h2 class="title text-gray-800 p-1 text-center text-xl font-semibold w-2/4">
        {{ $t('utils.best-contributor') }}
      </h2>
      <h2 class="title text-gray-800 p-1 text-center text-xl font-semibold w-2/4 -md:order-1">
        {{ $t('utils.best-contributor-week') }}
      </h2>
      <contribute-ranking :object="object['total']" />
      <contribute-ranking :object="object['week']" class="-md:order-2" />
    </div>
    <div class="w-full">
      <lazy-admin-table :fields="fields"
                        :columns="columns"
                        :length="length"
                        model="f"
                        :object-list="listPage"
                        @pagination="setPagination"
                        @search="search"
      >
        <template v-slot:table-title>
          {{ $t('utils.last-contributing') }}
        </template>
      </lazy-admin-table>
    </div>
  </div>
</template>

<script>
import detail from "@/mixins/admin/detail"

export default {

  mixins: [detail],

  props: {
    object: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      fields: {
        creator: this.$t("tools.creator"),
        date: {
          field: "date",
          label: this.$t("tools.date"),
          display: obj => this.getDateMini(obj.date)
        },
        uuid: {
          field: "uuid",
          label: this.$t("tools.uuid"),
          display: obj => this.$t(`admin.label.${obj.uuid}`)
        },
        display: {
          field: "display",
          label: this.$t("admin.model.title"),
        }
      },
      columns: ["creator", "date", "display", "uuid"],
      pagination: 1,
      searchVal: null
    }
  },

  computed: {
    list () {
      let obj = []
      if (this.searchVal) {
        obj = this.object.results.filter(x => {
          return x.uuid.match(this.searchVal) || x.display.match(this.searchVal) || x.creator.match(this.searchVal)
        })
      } else {
        obj = this.object.results
      }
      return obj
    },
    listPage () {
      const start = (this.pagination * this.$pagination) - this.$pagination
      return this.list.slice(start, start + this.$pagination)
    },
    length () {
      return this.list.length
    }
  },

  methods: {
    getDateMini (date) {
      return date.toLocaleDateString(this.$i18n.locale, {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"})
    },
    setPagination (val) {
      this.pagination = val
    },
    search (val) {
      this.searchVal = val || null
      this.pagination = 1
    }
  }

}
</script>

