<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="$t('menu-name.translate')" :description="$t('description.translate')">
        <template #breadcrumbs>
          {{ $t('menu-name.translate') }}
        </template>
      </admin-utils-header>
      <div class="flex -md:flex-col -md:space-y-8 -md:items-center flex-wrap">
       <contribute-translate />
      </div>
      <div class="w-full">
        <lazy-admin-utils-table :length="object.length" :pagination="false">
          <template #thead>
              <th>{{ $t("word.language") }}</th>
              <th>{{ $t("word.ratio") }}</th>
              <th>{{ $t("word.action") }}</th>
          </template>
          <template #tbody>
            <tr v-for="(obj, idx) in object" :key="idx">
              <td>{{ toLanguage(obj.language).display_name }}</td>
              <td class="text-center">
                <span class="text-white dark:text-gray-300 rounded-lg w-full block bg-gradient-to-r" :class="{
                  'from-black via-black to-red-700': obj.ratio < 1,
                  'from-black via-red-700 to-red-700': obj.ratio >= 1 && obj.ratio <= 20,
                  'from-red-700 via-orange-700 to-orange-700': obj.ratio >  20 && obj.ratio <= 40,
                  'from-orange-700 via-yellow-700 to-yellow-700': obj.ratio >  40 && obj.ratio <= 60,
                  'from-yellow-700 via-blue-700 to-blue-700': obj.ratio >  60 && obj.ratio <= 80,
                  'from-blue-700 via-green-700 to-green-700': obj.ratio > 80 && obj.ratio <= 99,
                  'from-green-700 to-green-700': obj.ratio > 99,
                }">
                  {{ obj.ratio }}%
                </span>
              </td>
              <td class="inline-flex space-x-2">
                <lazy-admin-action-edit :to="pathEdit(obj)" />
                <lazy-admin-action-delete v-if="$auth.hasScope('staff')" @click="setDeleted(obj)" />
              </td>
            </tr>
          </template>
        </lazy-admin-utils-table>
        <admin-utils-modal v-if="acticeModalDelete" @close="acticeModalDelete = false" @delete="deleteTranslate"/>
      </div>
    </div>
  </div>
</template>

<script>
import translateMixns from "~/mixins/model/translate"
import deleteMixins from "~/mixins/admin/delete"


export default {
  name: "ContributeOverview",

  mixins: [deleteMixins, translateMixns],

  layout: "default",

  middleware: [
    "model",
    "auth",
  ],

  transition: "page",

  asyncData({app, store}) {
    return app.$axios.get("populate/translate/overview")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return {object: []}
      })
  },

  head () {
    const title = this.$t("menu-name.translate")
    return {
      title,
      meta: [
          { property: "og:title", content: title},
          { name: "twitter:title", content: title },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  data () {
    return {
      page: 1
    }
  },

  methods: {
    toLanguage(value) {
      return this.$store.getters["model/lang"](value)
    },
    haveDeletedObject() {
      this.$nuxt.refresh()
    },
    deleteTranslate () {
      this.submitDelete(`populate/translate/delete/${this.objDelete.language}/`)
    },
    pathEdit (obj) {
      return {name: `contribute-translate-edit-id`, params: {id: obj.language}}
    },
  }

}
</script>

<style lang="scss">

.card-model {
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 1fr;
  & > *:first-child {
    grid-area: 1 / 1 / 1 / 3;
  }
  & > * {
    padding: 1em;
  }
}

.dark .tulp {
  @apply bg-gray-900
}



</style>
