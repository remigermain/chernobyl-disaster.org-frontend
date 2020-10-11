<template>
  <div class="w-full 0">
    <div class="w-full border-gray-500 dark:bg-gray-800 border-t-4 rounded-t-md p-2 mt-2 cursor-pointer italic text-opacity-75"
          :class="{'border-indog-700': active, 'rounded-b-md': !active}"
          @click="active = !active"
    >
      <svg-icon name="arrow-down" class="transform transition-transform duration-400" :class="{'-rotate-90': !active}" />
      <span class="leading-3 p-2 font-bold rounded-full">
        {{ $t('word.admin') }}
      </span>
    </div>
    <div class="relative overflow-hidden dark:bg-gray-800 rounded-b-md">
      <div class="w-full flex space-y-1 leading-6 transform p-2 transition-all duration-400 justify-around"
            :class="{'-translate-y-full opacity-0 absolute': !active, 'translate-x-0 opacity-100 block': active}"
      >
        <div class="rounded-md border shadow-md flex flex-col p-2 w-max-content dark:bg-gray-900 dark:border-none">
          <h1 class="text-2xl font-bold capitalize italic text-gray-700">
            {{ $t('word.upload') }}
          </h1>
          <form class="flex flex-col p-3 space-y-2 gap-2" @submit.prevent="submit">
            <field-file v-model="data.file" :field="modelField.file" :errors="errors.file" />
            <field-select v-model="data.language" :field="modelField.language" :errors="errors.language" />
            <field-checkbox v-model="data.delete" :field="modelField.delete" :errors="errors.delete" />
            <field-checkbox v-model="data.merge" :field="modelField.merge" :errors="errors.merge" />
            <field-submit>{{ $t('word.submit') }}</field-submit>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import translate from "~/mixins/model/translate"

export default {

  mixins:  [
    translate,
  ],

  data () {
    return {
      active: false,
      modelField: {
        delete: {
          label: 'delete'
        },
        merge: {
          label: 'merge'
        },
        file: {
          label: 'file',
          required: true
        }
      },
      data: {
        language: this.$i18n.locale,
        file: null,
        delete: true,
        merge: false,
      },
      errors: {
        language:  [],
        file: [],
        delete: [],
        merge: []
      }
    }
  },

  methods: {
     submit () {
      this.$store.commit("ON_LOADING", true)
      const form = new FormData()
      form.append('language', this.data.language)
      form.append('file', this.data.file.obj)
      form.append('delete', this.data.delete)
      form.append('merge', this.data.merge)

      this.$axios.post("populate/translate/upload", form)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.i18nToast.info(
            `${this.$t("word.delete")}: ${response.data.removed}
              <br>
              ${this.$t("word.create")}: ${response.data.created}
              <br>
               ${this.$t("word.create")}-${this.$t("word.translate")}: ${response.data.createdLang}
              <br>
               ${this.$t("word.update")}-${this.$t("word.translate")}: ${response.data.update}
            `
          ).goAway(8000)
          this.$nuxt.refresh()
        })
        .catch(error => {
          this.responseError(error)
            .then(data => {
              data.file && (this.errors.file = data.file)
              data.language && (this.errors.language = data.language)
              data.merge && (this.errors.merge = data.merge)
              data.delete && (this.errors.delete = data.delete)
            })
        })
        .finally(() => { this.$store.commit("ON_LOADING", true) })
    }
  },
}
</script>
