<template>
  <div class="wrapper space-y-5">
    <div class="w-full bg-blue-700 mt-3 text-white p-2 text-center rounded-sm">
      <span>
        {{ $t('utils.translation') }}
        <svg-icon name="language" />
      </span>
    </div>
    <div v-for="obj in object" :key="obj.language" class="flex flex-col">
      <div class="w-full border-blue-700 border-t-4 rounded-md font-bold text-lg p-2 text-center cursor-pointer"
           @click="toogleActive(obj.id)"
      >
        {{ $store.getters["model/lang"](obj.language).display_name }}
        <svg-icon name="arrow-down" class="transform transition-transform duration-400" :class="{'-rotate-180': active===obj.id}" />
      </div>
      <div class="w-full flex flex-col space-y-1 leading-6" :class="{'hidden': active!==obj.id}">
        <slot :obj="obj" />
      </div>
    </div>
    <span v-if="object.length === 0" class=" flex justify-center text-sm text-gray-500 italic">
      {{ empty }}
    </span>
  </div>
</template>

<script>
export default {

  props: {
    object: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      active: -1
    }
  },

  methods: {
    toogleActive (id) {
      if (id === this.active) {
        this.active = -1
      } else {
        this.active = id
      }
    }
  }
}
</script>
