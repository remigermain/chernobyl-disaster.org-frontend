<template>
  <div class="modal flex justify-center items-center" @click.prevent="active = false">
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform
          transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg-icon name="alert-triangle" class="h-6 w-6 text-red-600" />
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ $t('tools.deleted') }}
            </h3>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border
          border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500
          focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="submitDelete"
          >
            {{ $t('utils.delete') }}
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2
            bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
            hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue
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

  props: {
    object: {
      type: [String, Number],
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },

  methods: {
    submitDelete () {
      this.loading = true
      this.$axios.delete(`${this.model}/${this.object}/`)
        .then(response => {
          if (response.status!==204) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.deleted"))
          this.redirect({name: `contribute-${this.model}`})
        })
        .catch(error => { this.requestError(error) })
        .finally(() => {
          this.loading = false
          this.$emit("close")
        })
    }
  }

}
</script>
