<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <div class="w-full space-y-2">
      <admin-utils-header :title="model.name" :description="$t('help.tag.global-description')">
        <template #breadcrumbs>
          <nuxt-link :to="localePath(pathList)">
            {{ model.label }}
          </nuxt-link>
          {{ $t('word.update') }}
        </template>
      </admin-utils-header>
      <div class="grid-translate">
        <contribute-translate-navbar :object="object" @change="setCurrent" />
        <div class="flex flex-col px-2 space-y-2">
          <div v-for="obj in children" :key="obj.id"
               class="border-t-4 border-indigo-700 dark:border-indigo-600 rounded-lg space-y-4  dark:bg-gray-800"
               :class="{'dark:hover:bg-gray-700': currentActiveId != obj.id}"
          >
            <div class="text-2xl mt-2 leading-3 italic text-gray-700 font-medium dark:text-gray-200 p-2 cursor-pointer"
                  @click="activeCurrent(obj)"
            >
              <svg-icon name="arrow-up" class="transform duration-300 transition" :class="{'-rotate-180': currentActiveId != obj.id}" />
              <svg-icon v-if="obj.isUnCompleted" name="alert-triangle" class="text-red-700" />
              <svg-icon v-else name="circle-check" class="text-green-700" />
              {{ obj.key.join("-") }}
            </div>
            <admin-form-translate :object="obj" :class="{'hidden': currentActiveId != obj.id}" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import translateMixins from "~/mixins/model/translate"

export default {


  mixins: [translateMixins],

  validate ({ params, store }) {
    return !!store.getters["model/lang"](params.id)
  },

  loading: false,

  asyncData({ app, params, store }) {
    return app.$axios.get("translate/?no_page=true")
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }
        const object =  {}
        response.data.forEach(e => {
          const keys = e.key.split(".")
          e.key = keys.slice(1)
          if (!object[keys[0]]) {
            object[keys[0]] = {
              children: [],
              label: keys[0]
            }
          }
          e.isUnCompleted = !e.langs.find(x => x.language === params.id)
          object[keys[0]].children.push(e)
        })
        const list = []
        Object.keys(object).forEach(o => {
          const obj = {
            ...object[o],
            isUnCompleted: !!object[o].children.find(x => x.isUnCompleted)
          }
          list.push(obj)
        })
        return {object: list}
      })
      .catch (error => {
        store.commit("ERROR_SERVER", error.message || error)
        return {object: []}
      })
  },

  data () {
    return {
      current: null,
      currentActiveId: this.$route.query.id || null
    }
  },

  computed: {
    children () {
      return this.current && this.current.children || []
    }
  },

  methods: {
    activeCurrent (obj) {
      if (obj.id === this.currentActiveId) {
        this.currentActiveId = null
      } else {
        this.currentActiveId = obj.id
        this.$router.push({query: {...this.$route.query, id: obj.id}})
      }
    },
    setCurrent (current) {
      this.current = current
    }
  }

}
</script>


<style lang="scss" scoped>
.grid-translate {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
