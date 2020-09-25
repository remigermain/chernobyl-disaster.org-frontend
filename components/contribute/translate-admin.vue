<template>
  <div>
    <div class="w-full border-gray-500 border-t-4 rounded-md p-2 mt-2 cursor-pointer italic text-opacity-75"
          :class="{'border-blue-700': active}"
          @click="active = !active"
    >
      <svg-icon name="arrow-down" class="transform transition-transform duration-400" :class="{'-rotate-90': !active}" />
      <span class="leading-3 p-2 font-bold rounded-full">
        {{ $t('utils.admin') }}
      </span>
    </div>
    <div class="relative overflow-hidden">
      <div class="w-full flex space-y-1 leading-6 transform p-2 transition-all duration-400 justify-around"
            :class="{'-translate-y-full opacity-0 absolute': !active, 'translate-x-0 opacity-100 block': active}"
      >
        <div class="rounded-md border shadow-md flex flex-col p-2 w-max-content">
          <h1 class="text-2xl font-bold capitalize italic text-gray-700">
            {{ $t('utils.upload') }}
          </h1>
          <form class="flex flex-col p-3 space-y-2" @submit.prevent="submit">
            <label class="flex flex-col">
              <span class="text-lg italic leading-3 text-gray-700">
                file
              </span>
              <input type="file" name="file" class="form-input" :required="true">
            </label>
            <admin-select :field="fields.language" :errors="errors.language" />
            <label>
              <span class="text-lg italic leading-3 text-gray-700">
                delete
              </span>
              <input type="checkbox" name="deleted" class="form-checkbox">
            </label>
            <label>
              <span class="text-lg italic leading-3 text-gray-700">
                merge
              </span>
              <input type="checkbox" name="merge" class="form-checkbox">
            </label>
            <field-submit>{{ $t('utils.submit') }}</field-submit>
          </form>
        </div>
        <div class="rounded-md border shadow-md flex flex-col p-2 w-max-content h-max-content">
          <h1 class="text-2xl font-bold capitalize italic text-gray-700">
            {{ $t('utils.download') }}
          </h1>
          <form class="flex flex-col p-3 space-y-2 h-full" @submit.prevent="submit">
            <admin-select :field="fields.language" :errors="errors.language" />
            <field-submit>{{ $t('utils.submit') }}</field-submit>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import translate from "@/mixins/model/translate"

export default {

  mixins:  [
    translate,
  ],

  data () {
    return {
      active: false
    }
  },

  methods: {
     submit (event) {
      this.loading = true
      const form = new FormData(event.target)

      this.$axios.post("populate/translate/upload", form)
        .then(response => {
          if (response.status !== 200) {
            throw Error("")
          }
          this.i18nToast.info(
            `${this.$t("utils.delete")}: ${response.data.removed}
              <br>
              ${this.$t("utils.create")}: ${response.data.created}
              <br>
               ${this.$t("utils.create")}-${this.$t("utils.translate")}: ${response.data.createdLang}
              <br>
               ${this.$t("utils.update")}-${this.$t("utils.translate")}: ${response.data.update}
            `
          ).goAway(8000)
          this.$nuxt.refresh()
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },
}
</script>
