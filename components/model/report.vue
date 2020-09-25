<template>
  <div class="bg-gray-800 absolute bg-opacity-75 top-0 left-0 h-screen w-screen flex justify-center items-center z-5">
    <div class="bg-white shadow rounded-md p-4 w-2/4 relative -md:w-full">
      <div class="flex justify-between flex-wrap">
        <div class="w-2/4 flex items-center">
          <h2 class="capitalize">
            {{ $t('admin.label.report') }}
          </h2>
        </div>
        <div class="w-2/4 text-right">
          <svg-icon name="x" class="cursor-pointer w-8 h-8 hover:scale-110 transform transition-transform duration-300 hover:text-purple-900" @click="$emit('close')" />
        </div>
        <div class="w-2/4">
          <span class="p-2 pl-0 text-gray-600 rounded italic">
            {{ uuid }} {{ $t('utils.identifier') }} {{ $route.params.id }}
          </span>
        </div>
        <div class="w-full mt-4 p-4 rounded bg-green-700 bg-opacity-25 italic text-sm text-opacity-50">
          {{ $t('help.report.global-description') }}
        </div>
      </div>
      <form class="mt-4" @submit.prevent="submit">
        <field-textarea v-model="message" :field="{label: 'report', required: true, help: 'erfer'}" :errors="errors.message" class="my-4 shadow-xl p-2" />
        <div class="w-full flex justify-end">
          <button type="submit" class="p-2 bg-blue-700 rounded hover:bg-blue-900 text-white">
            {{ $t('utils.send') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    uuid: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      message: "",
      errors: {
        message: []
      }
    }
  },

  methods: {
    submit () {
      this.loading = true
      this.errors.message = []

      const data = {
        object_id: this.$route.params.id,
        uuid: this.uuid,
        message: this.message
      }
      this.$axios.post("issue/", data)
        .then(response => {
          if (response.status!==201) {
            throw new Error("error-server")
          }
          this.$emit("close")
          this.message = ""
          this.i18nToast.success(this.$t("success.report"))
        })
        .catch((error) => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  }

}
</script>
