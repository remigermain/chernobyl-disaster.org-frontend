<template>
  <ol class="space-y-1">
    <li v-for="key in Object.keys(list)" :key="key" class="text-sm capitalize list">
      <div class="shadow-sm rounded-md border-t-4 border-gray-500 p-2 cursor-pointer flex items-center justify-between"
           :class="{'border-blue-700': active == key, 'opacity-75': active != key}"
           @click.prevent.stop="toogleActive(key)"
      >
        <span class="w-8 h-8 bg-gray-700 text-white leading-3 text-lg flex justify-center items-center rounded-full shadow-md"
              :class="{'bg-indigo-700': active == key}"
        >
          {{ list[key].currents.length + list[key].childs.length }}
        </span>
        {{ list[key].label }}
        <svg-icon name="arrow-down" class="transition-transform transform duration-400" :class="{'-rotate-180': active == key}" />
      </div>
      <div v-if="list[key].childs.length > 1 && active == key" class="ml-4 py-2" :depth="depth + 1">
        <translate-navbar :object="list[key].childs" @select="submit" />
      </div>
    </li>
  </ol>
</template>

<script>
// import TranslateMenu from "@/components/contribute/translate"
export default {
  name: "TranslateNavbar",

  components: {
    translateNavbar: () => import("@/components/contribute/translate-navbar"),
  },

  props: {
    object: {
      type: Array,
      required: true
    },
    depth: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      active: null,
    }
  },

  computed: {
    list () {
      const list = {}
      this.object.forEach(el => {
        const sp = el.key.split(".")
        if (!list[sp[0]]) {
          list[sp[0]] = {
            label: sp[0],
            childs: [],
            currents: [],
          }
        }
        if (sp.length > 2) {
          list[sp[0]].childs.push({...el, key: sp.slice(1).join(".")})
        } else {
          list[sp[0]].currents.push(el)
        }
      })
      return list
    },
  },

  methods: {
    submit (ev) {
      this.$emit("select", ev)
    },
    toogleActive (key) {
      if (this.active == key) {
        this.active = null
      } else {
        this.active = key
        this.$emit("select", this.list[key].currents)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.list {
  min-width: 170px;
}
</style>
