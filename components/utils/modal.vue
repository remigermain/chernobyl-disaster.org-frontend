<template>
  <div class="modal flex justify-center items-center" @click.prevent="$emit('close')">
    <div class="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform
          transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop
    >
      <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <slot name="content" />
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <slot name="action"/>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2
            bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
            hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue
            dark:bg-gray-900 dark:hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-400
              transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="$emit('close')"
          >
            {{ $t('utils.cancel') }}
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  mounted () {
    this.$store.commit("ACTIVE_BACKGROUND", true)
  },

  beforeDestroy () {
    this.$store.commit("ACTIVE_BACKGROUND", false)
  }
}
</script>

<style lang="scss" scoped>

.modal {
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 45;
  margin: 0 !important;
  padding: 0 !important;
}

</style>
