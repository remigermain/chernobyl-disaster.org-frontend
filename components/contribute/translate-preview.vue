<template>
  <div class="wrapper space-y-2">
    <div class="rounded border flex flex-col space-y-2 p-2">
      <label>
        {{ $t('utils.language') }}
        <select v-model="langValue" class="form-select bg-gray-400 bg-opacity-75">
          <option v-for="lang in locales" :key="lang.value" :value="lang.value"
                  :selected="lang.value === $i18n.defaultLocale"
          >
            {{ lang.display_name }}
          </option>
        </select>
      </label>
      <span class="form-textarea bg-gray-200 italic p-2 text-opacity-75 text-gray-800">
        {{ preview }}
      </span>
    </div>
    <form class="flex flex-col space-y-2" @submit.prevent="submit">
      <textarea v-model="value"
                class="form-textarea bg-gray-200"
                name="value"
                :action="false"
                :inline="false"
      />
      <admin-error :errors="errors.langs[0].value" />
      <div class="flex justify-end p-2">
        <button class="p-2 bg-blue-700 text-white rounded-lg w-max-content float-right">
          {{ $t('utils.submit') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {

  props: {
    object: {
      type: Object,
      required: true
    },
  },

  data () {
    return {
      value: this.getValue(this.$route.params.id),
      langValue: "",
      errors: {langs: [{value: []}]},
      locales: this.$store.getters["model/langs"].filter(t => t.value != this.$route.params.id),
      obj: this.object,
      model: {
        label: this.object.key
      }
    }
  },

  computed: {
    preview () {
      return this.getValue(this.langValue)
    },
    currentObj () {
      return  this.obj.langs.find(x => x.language == this.$route.params.id) || null
    }
  },

  created () {
    this.langValue = this.locales[0].value
  },

  methods: {
    getValue (lang) {
      return this.object.langs.find(x => x.language == lang)?.value || ""
    },
    submit () {
      this.errors = {langs: [{value: []}]}
      this.loading = true
      const data = {
        langs: [{
          language: this.$route.params.id,
          value: this.value,
          parent_key: this.obj.id
        }]
      }
      if (this.currentObj?.id >= 0) {
        data.langs[0].id = this.currentObj.id
      }
      this.$axios.patch(`translate/${this.obj.id}/`, data)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          this.i18nToast.success(this.$t("success.update")).goAway(5000)
          this.$emit("refresh")
          this.obj = response.data
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })

    }
  }

}
</script>
