<template>
  <div class="flex flex-col space-y-2 mb-6">
    <lazy-contribute-breadcrumb>
      <slot name="breadcrumbs" />
    </lazy-contribute-breadcrumb>
    <h1
      class="text-3xl capitalize self-start w-full flex justify-between flex-wrap"
    >
      <div>
        <svg-icon
          name="help"
          class="cursor-pointer transform hover:scale-110 transition-transform duration-200"
          @click="activeHelp = !activeHelp"
        />
        {{ title }}
      </div>
      <div class="flex justify-around gap-x-3">
        <slot name="button" />
      </div>
    </h1>
    <transition name="opacity">
      <p
        v-if="activeHelp"
        class="p-2 rounded-md shadow-md bg-green-100 font-medium whitespace-pre-line text-gray-800 border-t-4
        rounded-t-md border-green-700 dark:bg-green-700 dark:border-green-900 dark:text-gray-300 text-md"
      >
        {{ description }}
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      activeHelp: this.$auth.user.show_helpers
    }
  }
}
</script>
