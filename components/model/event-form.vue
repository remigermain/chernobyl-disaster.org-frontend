<template>
  <form class="dark:bg-gray-800 rounded-md shadow-lg" @submit.prevent="submit">
    <form-text v-model="data.title" :field="modelField.title" :errors="errors.title" />
    <form-datetime v-model="data.date" :field="modelField.date" :errors="errors.date" />
    {{ data.tags }}
    <form-multiselect v-model="data.tags" :field="modelField.tags" :errors="errors.tags" />
    <div class="p-4 space-y-2">
      <div class="rounded-md text-center text-gray-800 bg-gray-400 text-2xl py-2 dark:bg-indigo-700 dark:text-gray-300">
        <svg-icon name="language" />
        {{ $t('utils.language')}}
      </div>
      <div class="grid-lang">
        <ol class="py-2 space-y-2">
          <li class="bg-indigo-700 text-gray-300 rounded-sm p-2">
            <svg-icon name="language" />
            {{ $t("utils.language") }}
          </li>
          <li v-for="lang in modelField.langs.language.choices" :key="lang.value"
              :class="{'text-indigo-700 font-medium dark:text-indigo-600': currentLang.value == lang.value}"
              class="p-2 shadow-sm bg-gray-300 rounded-sm flex justify-between cursor-pointer hover:text-indigo-700 hover:bg-gray-400
                    dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              @click="currentLang = lang"
          >
            <template v-if="langExist(lang.value)">
              <svg-icon name="circle-check" class="text-lg font-medium text-green-600" role="img"/>
              <div v-if="haveError(lang.value)" class="inline-flex relative">
                <svg-icon name="alert-circle" class="text-red-800 dark:text-red-600 relative text-lg font-medium" role="img" />
                <svg-icon name="alert-circle" class="text-red-800 dark:text-red-600 absolute text-lg font-medium animate-ping" role="img" />
              </div>
            </template>
            {{ lang.display_name }}
            <svg-icon name="arrow-left" class="self-end transform transition-all duration-200 ml-2"
                      :class="{'rotate-180': currentLang.value == lang.value}"
            />
          </li>
        </ol>
        <div class="p-2">
          <div v-if="currentObj">
            <button v-if="currentObj._new || $auth.hasScope('staff')" class="bg-red-200 py-1 px-3 rounded-md" @click="deleteObject(currentObj, idx)">
              <action-delete  />
            </button>
            <form-text v-model="currentObj.title" :field="modelField.langs.title" :errors="getErrorIdx(errors.langs, indexOf, 'title')" />
            <form-text-editor v-model="currentObj.description" :field="modelField.langs.description" :errors="getErrorIdx(errors.langs, indexOf, 'description')" />
          </div>
          <div v-else-if="currentLang.value" class="flex justify-center items-center flex-col h-full space-y-4">
            <span class="text-xl capitalize">{{ currentLang.display_name }}</span>
            <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-dosent-exist-create-?') }}</p>
            <button class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-md text-gray-200" @click="addLang(currentLang.value)">
              <svg-icon name="plus" />
              {{ $t('utils.add') }}
            </button>
          </div>
          <div v-else class="flex justify-center items-center flex-col h-full space-y-4">
            <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-no-selected') }}</p>
          </div>
        </div>
        <form-submit class="col-span-2"/>
      </div>
    </div>
  </form>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import formMixin from "~/mixins/admin/form"
import { setObjectKeysValue } from '~/lib/utils'

export default {

  mixins: [eventMixins, formMixin],

  props: {
    object: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      currentLang: {},
      data: {
        title: this.object.title || "",
        date: this.object.date || {},
        tags: this.object.tags || [],
        langs: this.object.langs || [],
      },
      errors: {
        title: [],
        date: [],
        tags: [],
        langs: []
      }
    }
  },

  computed: {
    currentObj () {
      return this.data.langs.find(x => x.language === this.currentLang.value)
    },
    indexOf () {
      return this.data.langs.indexOf(this.currentObj)
    }
  },

  methods: {
    addLang (language) {
      this.data.langs.push({
        _new: true,
        title: '',
        description: '',
        language
      })
    },

    langExist (language) {
      return this.data.langs.find(x => x.language === language)
    },
    haveError (language) {
      const idx = this.data.langs.indexOf(this.langExist(language))
      if (this.errors.langs[idx]) {
        return !this.errors.langs[idx].length
      }
      return false
    },

    submit (event) {
      this.loading = true

      const tags = this.data.tags.map(o => {
          const obj =  {name: o.display_name}
          if (o.value !== -1) {
            obj.id = o.value
          }
          return obj
      })

      const data = {
        ...this.data,
        ...this.data.date,
        tags,
      }

      setObjectKeysValue(this.errors, [])
      this.$axios.post(`${this.model.name}/`, data)
        .then(response => {
          if (response.status !== 201 ) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.create")).goAway(4000)

          if (event.submitter.dataset.type === "new") {
            this.$router.push(this.localePath({...this.pathCreate.path}))
          } else if (event.submitter.dataset.type === "detail") {
            this.$router.push(this.localePath({...this.pathDetail.path, params: {id: response.data.id}}))
          } else {
            this.$nuxt.refresh()
          }

        })
        .catch(error => {
          this.responseError(error)
            .then(data => {
              data.title && (this.errors.title = data.title)
              data.date && (this.errors.date = data.date)
              data.tags && (this.errors.tags = data.tags)
              data.langs && (this.errors.langs = data.langs)
            })
        })
        .finally(() => { this.loading = false })
    },

    submitDelete(url) {
      this.loading = true
      this.$axios.delete(url)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("errer-server")
          }
          this.i18nToast.success(this.$t('sucess.delete'))
        })
        .catch(error => { this.responseError(error) })
        .finally(() => { this.loading = false })
    },

    deleteObject (obj, idx) {
      if (obj._new) {
        // remove directly in array if is a new elements
        this.$delete(this.data.langs, idx)
      } else {
        this.submitDelete(`eventlang/${obj.id}`)
        // user is staff so, you can delete this from api

      }
    }
  }

}
</script>

<style lang="scss" scoped>
.grid-lang {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
