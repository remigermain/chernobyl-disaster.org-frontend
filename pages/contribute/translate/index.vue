<template>
  <div class="wrapper">
    <lazy-model-list :model="model.name" :create="false">
      <template v-slot:breadcrumbs>
        <lazy-contribute-breadcrumb>
          {{ pathList.label }}
        </lazy-contribute-breadcrumb>
      </template>
      <template v-slot:label>
        {{ model.label }}
      </template>
      <template v-slot:table>
        <div v-if="$auth.hasScope('staff')" class="rounded-md border shadow-md flex flex-col p-2 w-max-content">
          <h1 class="text-2xl font-bold capitalize italic text-gray-700">
            {{ $t('utils.upload') }}
          </h1>
          <form class="flex flex-col p-3 space-y-2" @submit.prevent="submit">
            <label class="flex flex-col">
              <span class="text-lg italic leading-3 text-gray-700">
                {{ fields.file.label }}
              </span>
              <input type="file" name="file" class="form-input" :required="true">
            </label>
            <admin-select :field="fields.language" :errors="errors.language" />
            <label>
              <span class="text-lg italic leading-3 text-gray-700">
                {{ fields.deleted.label }}
              </span>
              <input type="checkbox" name="deleted" class="form-checkbox">
            </label>
            <field-submit>
              {{ $t('utils.submit') }}
            </field-submit>
          </form>
        </div>
        <lazy-admin-table :fields="fields"
                          :columns="columns"
                          :length="length"
                          :model="model.name"
                          :object-list="list"
                          :deleted="false"
                          :detail="false"
                          @pagination="setPagination"
                          @search="search"
        >
          <template v-slot:table-title>
            {{ $t('admin.tools.list') }}
          </template>
          <template v-slot:delete="{obj}">
            <button @click="setDeleted(obj.language)">
              <svg-icon name="trash" class="cursor-pointer text-red-700 action-btn" />
            </button>
          </template>
        </lazy-admin-table>
      </template>
    </lazy-model-list>
    <admin-modal v-if="deletedId" :object="deletedId" model="populate/translate/delete" @close="close" />
  </div>
</template>

<script>
import translate from "@/mixins/model/translate"
import base from "@/mixins/admin/base"

export default {
  name: "ContrubteTranslateList",

  mixins:  [
    base,
    translate,
  ],

  asyncData ({app}) {
    return app.$axios.get("populate/translate/overview")
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {})
  },

  data () {
    return {
      columns: ["language", "ratio"],
      deletedId: null,
      pagination: 1,
      searchVal: null
    }
  },

  computed: {
    list () {
      if (this.searchVal) {
        return this.object.filter(x => x.language.match(this.searchVal))
      }
      return this.object
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
    setPagination (val) {
      this.pagination = val
    },
    search (val) {
      this.searchVal = val || null
      this.pagination = 1
    },
    close () {
      this.deletedId = null
      this.$nuxt.refresh()
    },
    setDeleted (id) {
      this.deletedId = id
    },
    submit (event) {
      // this.loading = true
      const form = new FormData(event.target)
      this.$axios.post("populate/translate/upload", form)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          this.i18nToast.info(
            `${this.$t("utils.delete")}: ${response.data.removed}
              <br>
              ${this.$t("utils.create")}: ${response.data.created}
              <br>
               ${this.$t("utils.create")}-${this.$t("utils.translate")}: ${response.data.createdLang}
            `
          ).goAway(8000)
          this.$nuxt.refresh()
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  }

}
</script>

<style>

</style>
