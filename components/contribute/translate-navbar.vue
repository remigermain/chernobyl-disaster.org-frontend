<template>
  <ol class="space-y-1">
    <li v-for="key in listKeys" :key="key" class="text-sm capitalize list"
        :class="{' border-l-4 border-blue-700 rounded-tl-lg rounded-bl-lg ': active === key}"
    >
      <div class="shadow-sm rounded-md border-t-4 border-gray-500 p-2 cursor-pointer flex items-center justify-between"
           :class="{'border-blue-700': active === key, 'opacity-75': active!==key}"
           @click.prevent.stop="toogleActive(key)"
      >
        <div class="relative mt-1">
          <span class="w-8 h-8 bg-gray-700 text-white leading-3 text-lg flex justify-center items-center rounded-full shadow-md"
                :class="{'bg-indigo-700': active === key}"
          >
            {{ lengthKey(key) }}
          </span>
          <transition name="opacity">
            <span v-if="list[key].empty" class="bg-red-800 w-5 h-5 missing-buble leading-3 italic text-gray-200 text-xs flex justify-center items-center rounded-full">
              {{ list[key].empty }}
            </span>
          </transition>
        </div>
        {{ list[key].label }}
        <svg-icon name="arrow-down" class="transition-transform transform duration-400" :class="{'-rotate-180': active === key}" />
      </div>
      <transition name="navbar">
        <div v-if="childActive(key)" class="ml-4 py-2">
          <translate-navbar :object="list[key].childs" @select="$emit('select', $event)" />
        </div>
      </transition>
    </li>
  </ol>
</template>

<script>
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
        const key = el.key[0]

        if (!list[key]) {
          list[key] = {
            label: key,
            empty: 0,
            childs: [],
            currents: [],
          }
        }
        if (el.empty) {
          list[key].empty += 1
        }
        if (el.key.length > 2) {
          list[key].childs.push({...el, key: el.key.slice(1)})
        } else {
          list[key].currents.push(el)
        }
      })

      return list
    },
    listKeys () {
      return Object.keys(this.list).sort((a, b) => a.localeCompare(b))
    }
  },

  watch: {
    object() {
      this.$nextTick(() => {
        if (this.active) {
          this.$emit("select", this.list[this.active].currents)
        }
      })
    }
  },

  created () {
    const id = parseInt(this.$route.query.id)
    // select the element from id params
    const obj = this.object.find(e => e.id === id)
    if (obj) {
      this.toogleActive(obj.key[0])
    }
  },

  methods: {
    lengthKey (key) {
      return this.list[key].currents.length + this.list[key].childs.length
    },

    childActive (key) {
      return this.active === key && this.list[key].childs.length > 1
    },

    toogleActive (key) {
      if (this.active === key) {
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

.navbar-enter-active,
.navbar-leave-active {
  transition: opacity .5s;
  li {
    transition: transform .5s;
  }
}
.navbar-enter,
.navbar-leave-to {
  opacity: 0;
  li {
    transform: translateX(-10px) translateY(-100%);
  }
}

.missing-buble {
  position: absolute;
  top:0;
  right:0;
  transform: translate(50%, -40%);
}

</style>
