<template>
  <div class="flex w-full justify-around">
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
  </div>
</template>

<script>
import translate from "@/mixins/model/translate"

export default {

  mixins:  [
    translate,
  ],

  methods: {
     submit (event) {
      this.loading = true
      const form = new FormData(event.target)

      this.$axios.post("populate/translate/upload", form)
        .then(response => {
          if (response.status != 200) {
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
