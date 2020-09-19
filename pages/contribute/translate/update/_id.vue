<template>
  <div class="wrapper space-y-5">
    <div class="w-full bg-blue-700 mt-3 text-white p-2 text-center rounded-sm">
      <span>
        {{ $t('utils.translation') }}
        <svg-icon name="language" />
      </span>
    </div>
    <div class="flex">
      <lazy-contribute-translate-navbar :object="object" class="shadow-sm rounded-md  p-2 w-max-content" @select="asset" />
      <div class=" w-full space-y-2 px-2 parent">
        <transition-group name="list">
          <div v-for="obj in current" :key="obj.id" class="flex flex-col items">
            <div class="w-full border-gray-500 border-t-4 rounded-md p-2 mt-2 cursor-pointer italic text-opacity-75"
                 @click="toogleActive(obj.id)"
            >
              <svg-icon name="arrow-down" class="transform transition-transform duration-400" :class="{'-rotate-90': active == obj.id}" />
              <span class="leading-3 p-2 font-bold rounded-full">
                {{ obj.key.split(".")[1] }}
              </span>
            </div>
            <div class="relative overflow-hidden">
              <div class="w-full flex flex-col space-y-1 leading-6 transform p-2 transition-all duration-400"
                   :class="{'-translate-y-full opacity-0 absolute': active != obj.id, 'translate-x-0 opacity-100 block': active == obj.id}"
              >
                <contribute-translate-preview :object="obj" @refresh="refresh" />
              </div>
            </div>
          </div>
        </transition-group>
        <span v-if="object.length === 0" class=" flex justify-center text-sm text-gray-500 italic">
          {{ empty }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  validate ({ params, store }) {
    return !!store.getters["model/lang"](params.id)
  },

  asyncData({ app }) {
    return app.$axios.get("translate/?no_page=true")
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return {
          object: response.data
        }
      })
      .catch(() => {})
  },

  data () {
    return {
      active: -1,
      current: null,
      field: {
        label: this.$t("admin.model.value"),
        name: "value",
        help: this.$t("admin.help.model.translate")
      },
    }
  },

  methods: {
    toogleActive (id) {
      if (id === this.active) {
        this.active = -1
      } else {
        this.active = id
      }
    },
    asset (ev) {
      this.current = ev
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
