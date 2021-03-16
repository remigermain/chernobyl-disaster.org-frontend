<template>
  <form class="flex flex-col space-y-3 p-2" @submit.prevent="submit">
    <div
      class="rounded-md flex flex-col bg-gray-200 dark:bg-gray-900 space-y-2 p-2"
    >
      <h1 class="self-start text-2xl italic dark:text-gray-200">
        {{ $t('text.preview-other-language') }}
        <select v-if="selectLocale" v-model="selectLocale" class="form-select">
          <option
            v-for="lang in localesChoices"
            :key="lang.value"
            :value="lang.value"
          >
            {{ lang.display_name }}
          </option>
        </select>
      </h1>
      <template v-if="preview">
        <blockquote
          class=" border-l-8 rounded-lg border-gray-800 bg-gray-400 dark:bg-gray-600 p-2 dark:text-gray-900"
        >
          &nbsp;&nbsp;{{ preview.value }}&nbsp;&nbsp;
        </blockquote>
      </template>
      <span
        v-else
        class=" italic p-2 text-opacity-75 text-gray-800 dark:text-gray-500"
      >
        {{ $t('message.no-example-available') }}
      </span>
    </div>
    <admin-utils-error :errors="errors.language" />
    <admin-utils-error :errors="errors.parent_key" />
    <field-textarea v-model="dataValue" :field="field" :errors="errors.value" />
    <div class="self-end flex justify-center gap-2">
      <admin-action-delete
        v-if="$auth.hasScope('staff') && current && current.id"
        @click="setDeleted(object)"
      />
      <button
        type="button"
        class="px-3 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-center text-gray-400"
      >
        <template v-if="current && current.id">
          <svg-icon name="check" />
          {{ $t('word.modify') }}
        </template>
        <template v-else>
          <svg-icon name="plus" />
          {{ $t('word.add') }}
        </template>
      </button>
    </div>
    <admin-utils-modal
      v-if="acticeModalDelete"
      @close="acticeModalDelete = false"
      @delete="submitTransDelete"
    />
  </form>
</template>

<script>
import deleteMixins from '~/mixins/admin/delete'
import { setObjectKeysValue } from '~/lib/utils'

export default {
  mixins: [deleteMixins],

  loading: false,

  props: {
    object: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      dataValue: this.setValue(),
      field: { label: this.$t('word.value'), name: 'name', required: true },
      selectLocale: null,
      errors: {
        language: [],
        value: [],
        parent_key: []
      }
    }
  },

  computed: {
    current() {
      return this.object.langs.find(x => x.language === this.$route.params.id)
    },
    preview() {
      return this.object.langs.find(x => x.language === this.selectLocale)
    },
    localesChoices() {
      const list = []
      this.object.langs.forEach(x => {
        if (x.language !== this.$route.params.id) {
          list.push(this.$store.getters['model/lang'](x.language))
        }
      })
      return list
    }
  },

  created() {
    if (this.localesChoices.length) {
      const locales = this.object.langs.filter(
        x => x.language !== this.$route.params.id
      )
      const select =
        locales.find(x => x.language === this.$i18n.locale) ||
        (this.$i18n.locale !== this.$i18n.defaultLocale &&
          locales.find(x => x.language === this.$i18n.defaultLocale)) ||
        locales[0]
      this.selectLocale = select.language
    }
  },

  methods: {
    setValue() {
      const current = this.object.langs.find(
        x => x.language === this.$route.params.id
      )
      return (current && current.value) || ''
    },
    haveDeletedObject() {
      this.$nuxt.refresh()
      this.dataValue = ''
    },
    submitTransDelete() {
      this.submitDelete(`translatelang/${this.current.id}/`)
    },

    submit() {
      this.$store.commit('ON_LOADING', true)

      setObjectKeysValue(this.errors, [])

      const data = {
        value: this.dataValue,
        language: this.$route.params.id,
        parent_key: this.object.id
      }

      if (this.current && this.current.id) {
        data.id = this.current.id
      }

      const status = this.current && this.current.id ? 200 : 201
      const axiosPromess = data.id
        ? this.$axios.patch(`translatelang/${data.id}/`, data)
        : this.$axios.post('translatelang/', data)
      axiosPromess
        .then(response => {
          if (response.status !== status) {
            throw new Error('error-server')
          }
          this.$toast.success(this.$t('success.modify'))
          this.$nuxt.refresh()
        })
        .catch(error => {
          this.responseError(error).then(data => {
            data.value && (this.errors.value = data.value)
            data.language && (this.errors.value = data.language)
            data.parent_key && (this.errors.value = data.parent_key)
          })
        })
        .finally(() => {
          this.$store.commit('ON_LOADING', false)
        })
    }
  }
}
</script>

<style>
blockquote::after {
  content: '\201E';
  font-size: 1.2em;
}

blockquote::before {
  content: '\201C';
  font-size: 1.2em;
}
</style>
