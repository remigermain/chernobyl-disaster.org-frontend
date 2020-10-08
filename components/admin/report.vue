<template>
  <utils-modal @close="$emit('close')" @delete="reportObject">
    <template #content>
      <div class="flex flex-col w-full h-full space-y-2">
        <div class="w-2/4 flex items-center">
          <h2 class="capitalize text-2xl">
            <svg-icon name="help" class="cursor-pointer" @click="showHelp = !showHelp"/>
            {{ $t('help.report') }}
          </h2>
        </div>
        <transition name="opacity">
          {{ showHelp }}
          <admin-help v-show="showHelp" :field="{help: $t('help.report.global-description')}" :detail="false" />
        </transition>
        <field-textarea v-model="message" :field="{label: 'report', required: true, help: 'erfer'}" :errors="errors.message" class="my-4 shadow-xl p-2" />
      </div>
    </template>
    <template #action>
      <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2
            bg-red-700 text-base leading-6 font-medium text-gray-300 shadow-sm
            hover:text-gray-500 focus:outline-none focus:border-red-300 focus:shadow-outline-blue
            dark:bg-red-900 dark:hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-400
              transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="submit"
          >
            {{ $t('utils.send') }}
          </button>
        </span>
    </template>
  </utils-modal>
</template>

<script>
export default {

  props: {
    uuid: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      message: "",
      errors: {
        message: []
      },
      showHelp: this.$auth.user.show_help
    }
  },

  methods: {
    submit () {
      this.$store.commit("ON_LOADING", true)
      this.errors.message = []

      const data = {
        object_id: this.id,
        uuid: this.uuid,
        message: this.message
      }
      this.$axios.post("issue/", data)
        .then(response => {
          if (response.status!==201) {
            throw new Error("error-server")
          }
          this.message = ""
          this.i18nToast.success(this.$t("success.report"))
          this.$emit("close")
        })
        .catch(error => {
          this.responseError(error)
            .then(data => {
              data.message && (this.errors.message = data.message)
            })
        })
        .finally(() => {
          this.$store.commit("ON_LOADING", false)
        })
    }
  }

}
</script>

