<template>
  <div class="wrapper space-y-2">
    <div class="rounded border flex flex-col space-y-2 p-2" :class="{'italic ' : !locales.length}">
      <strong>
        {{ $t('utils.other-language') }}:
      </strong>
      <template v-if="locales.length">
        <label>
          {{ $t('utils.language') }}
          <select v-model="selectLocale" class="form-select min-select bg-gray-400 bg-opacity-75 " :disabled="!locales.length">
            <option v-for="lang in locales" :key="lang.value" :value="lang.value">
              {{ lang.display_name }}
            </option>
          </select>
        </label>
        <span class=" bg-gray-300 italic p-2 text-opacity-75 text-gray-800">
          {{ previewValue }}
        </span>
      </template>
      <span v-else class=" italic p-2 text-opacity-75 text-gray-800">
        {{ $t('utils.no-example-available') }}
      </span>
    </div>
    <form class="flex flex-col space-y-2" @submit.prevent="submit">
      <field-textarea v-model="value" :field="field" :errors="errors.value" :min="false" />
      <div class="flex justify-end p-2 space-x-2">
        <button v-if="$auth.hasScope('staff') && current && current.id" type="button"
                class="p-2 bg-red-700 text-white rounded-lg w-max-content float-right hover:bg-red-800 transition-colors duration-300"
                @click="deleted"
        >
          <svg-icon name="trash" />
        </button>
        <button type="submit" class="p-2 bg-blue-700 text-white rounded-lg w-max-content float-right hover:bg-indigo-700 transition-colors duration-300">
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
      value: "",
      selectLocale: "",
      activeModal: false,
      errors: {
        value: [],
        language: []
      },
      field: {
        name: "value",
        label: this.$t("utils.translation")
      }
    }
  },

  computed: {
    preview () {
      return this.object.langs.find(x => x.language === this.selectLocale)
    },
    previewValue () {
      return this.preview && this.preview.value || null
    },
    current () {
      return this.object.langs.find(x => x.language === this.$route.params.id)
    },
    locale () {
      return this.$store.getters["model/lang"](this.$route.params.id)
    },
    locales () {
      /* get diff locales form params id and value need to set */
      return this.$store.getters["model/langs"].filter(t => {
        return (
          t.value!==this.$route.params.id &&
          this.object.langs.find(x => x.language === t.value && x.value)
        )
      })
    }
  },

  created () {
    // if params is different form locale
    let locale
    if (this.$i18n.defaultLocale!==this.$route.params.id &&
        this.locales.find(l => l.language === this.$route.params.id)) {
      locale = this.$i18n.defaultLocale
    }
    this.selectLocale = locale || this.locales[0] && this.locales[0].value || ""

    this.value = this.current && this.current.value || ""
  },

  methods: {
    submit () {
      this.errors = {value: [], language: []}
      this.loading = true

      /* generate data */
      const data = {
        language: this.$route.params.id,
        value: this.value,
      }

      if (this.current && this.current.id) {
        this.update(data)
      } else {
        this.create(data)
      }
    },
    create (data) {
      /* generate data */
      data.parent_key = this.object.id

      this.$axios.post("translatelang/", data)
        .then(response => {
          if (response.status !== 201) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.update")).goAway(5000)
          this.$emit("refresh")
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    },
    update (data) {
      this.$axios.patch(`translatelang/${this.current.id}/`, data)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.update")).goAway(5000)
          this.$emit("refresh")
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    },
    deleted () {
      this.$axios.delete(`translatelang/${this.current.id}/`)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.deleted")).goAway(5000)
          this.$emit("refresh")
          this.value = ""
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  }

}
</script>

<style lang="scss" scoped>
.min-select {
  min-width: 120px;
}
</style>
