<template>
  <div class="w-full shadow-lg">
    <div class="w-full rounded-md border-t-4 border-blue-700 p-2 text-center flex justify-around text-lg">
      <span v-if="header">
        {{ $t('utils.language') }}:
        <span class="text-indigo-700 font-bold">
          {{ title }}
        </span>
      </span>
      <span v-if="!$slots.header" />
      <slot name="header" />
    </div>
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    header: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    toogleShow () {
      this.show = !this.show
    }
  }

}
</script>
