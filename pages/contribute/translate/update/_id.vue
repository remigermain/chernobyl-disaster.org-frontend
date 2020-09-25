<template>
  <lazy-model-list :model="$t('utils.translation')" :create="false">
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        {{ $t('utils.translation') }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:label>
      {{ $t('utils.translation') }}
    </template>
    <template v-slot:table>
      <div class="w-full bg-gray-400 bg-opacity-25 italic text-lg p-4 rounded-md text-gray-800 text-opacity-75 whitespace-pre-line">{{ $t('help.translate.description') }}</div>
      <div class="flex mt-6">
        <div class="flex flex-col rounded-md h-max-content">
          <span class="text-lg italic leading-3 p-2 bg-blue-700 text-white rounded-md capitalize text-center">
            {{ $t('utils.category') }}
          </span>
          <lazy-contribute-translate-navbar :object="object" class="shadow-sm rounded-md  p-2 w-max-content" @select="assign" />
        </div>
        <div class=" w-full space-y-2 px-2 parent mt-6">
          <div v-for="obj in current" :key="obj.id" class="flex flex-col items">
            <div class="w-full border-gray-500 border-t-4 rounded-md p-2 mt-2 cursor-pointer italic text-opacity-75"
                 :class="{'border-blue-700': active===obj.id}"
                 @click="toogleActive(obj.id)"
            >
              <svg-icon name="arrow-down" class="transform transition-transform duration-400" :class="{'-rotate-90': active===obj.id}" />
              <transition name="opacity">
                <span v-if="obj.empty" class="bg-red-800 text-white rounded-full p-1 text-xs italic font-bold">
                  {{ $t('utils.missing') }}
                </span>
              </transition>
              <span class="leading-3 p-2 font-bold rounded-full">
                {{ obj.key[1] }}
              </span>
            </div>
            <div class="relative overflow-hidden">
              <div class="w-full flex flex-col space-y-1 leading-6 transform p-2 transition-all duration-400"
                   :class="{'-translate-y-full opacity-0 absolute': active!==obj.id, 'translate-x-0 opacity-100 block': active===obj.id}"
              >
                <contribute-translate-preview :object="obj" @refresh="refresh" />
              </div>
            </div>
          </div>
          <span v-if="object.length === 0" class=" flex justify-center text-sm text-gray-500 italic">
            {{ empty }}
          </span>
        </div>
      </div>
    </template>
  </lazy-model-list>
</template>

<script>
export default {
  validate ({ params, store }) {
    return !!store.getters["model/lang"](params.id)
  },

  asyncData({ app, params }) {
    return app.$axios.get("translate/?no_page=true")
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }
        const object = response.data.map(e => {
          e.key = e.key.split(".")
          const el = e.langs.find(l => l.language === params.id)
          e.empty = (!el || !el.value)
          return e
        })
        return {object}
      })
      .catch(() => {})
  },

  watchQuery: ["id"],

  data () {
    return {
      active: -1,
      current: null,
      field: {
        label: this.$t("admin.model.value"),
        name: "value",
        help: this.$t("help.translate.description")
      },
    }
  },

  created () {
    if (this.$route.query.id?.match(/^\d+$/)) {
      this.active = parseInt(this.$route.query.id)
    }
  },

  methods: {
    toogleActive (id) {
      if (id === this.active) {
        this.active = null
      } else {
        this.active = id
        this.$router.push({query: {id: id.toString()}})
      }
    },
    missing (obj) {
      return !!obj.langs.find(l => l.language===this.$route.params.id && l.value)
    },
    assign (ev) {
      this.current = ev.sort((a, b) => a.key[1].localeCompare(b.key[1]))
    },
    refresh () {
      this.$nuxt.refresh()
    }
  }

}
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: opacity .4s, transform .4s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
