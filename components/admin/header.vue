<template>
  <div class="flex flex-col space-y-2">
    <lazy-contribute-breadcrumb>
      <slot name="breadcrumbs" />
    </lazy-contribute-breadcrumb>
    <h1 class="text-3xl capitalize self-start w-full flex justify-between">
      <div>
        <svg-icon name="help" class="cursor-pointer transform hover:scale-110 transition-transform duration-200" @click="activeHelp = !activeHelp"/>
        {{ title }}
      </div>
      <div class="flex justify-around">
        <slot name="button" />
        <button v-if="to" class="p-2 bg-indigo-600 rounded text-gray-200 hover:bg-indigo-700 text-center text-base"
                @click="$router.push(localePath(to))"
        >
          <svg-icon name="plus" />
          {{ $t('utils.create') }}
        </button>
      </div>
    </h1>
    <transition name="opacity">
      <p v-if="activeHelp" class="p-2 rounded-md shadow-md bg-green-100 font-medium whitespace-pre-line text-gray-800 border-t-4
        rounded-t-md border-green-700 dark:bg-green-700 dark:border-green-900 dark:text-gray-300 text-md"
        >{{ description }}</p>
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
    },
    to: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      activeHelp: this.$auth.user.show_help
    }
  }

}
</script>
