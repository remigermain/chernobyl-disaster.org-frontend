<template>
  <div class="dark:bg-gray-800 rounded-md shadow-lg">
    <form-text v-model="data.title" :field="modelField.title" :errors="errors.title" />
    <form-datetime v-model="data.date" :field="modelField.date" :errors="errors.date" />
    <form-multiselect v-model="data.tags" :field="modelField.tags" :errors="errors.tags" />
    <div class="p-4 space-y-2">
      <div class="rounded-md text-center text-gray-800 bg-gray-400 text-2xl py-2">
        <svg-icon name="language" />
        {{ $t('utils.language')}}
      </div>
      <!-- <div v-for="(obj, idx) in data.langs" :key="idx" class="border-t-8 border-indigo-700 rounded-md ">
        <button v-if="obj._new || $auth.user.haScope('staff')" class="bg-red-200 py-1 px-3 rounded-md" @click="deleteObject(obj, idx)">
          <action-delete  />
        </button>
        <form-select v-model="obj.language" :field="modelField.langs.language" :errors="getErrorIdx(errors.langs, idx, 'language')" />
        <form-text v-model="obj.title" :field="modelField.langs.title" :errors="getErrorIdx(errors.langs, idx, 'title')" />
        <form-text-editor v-model="obj.description" :field="modelField.langs.description" :errors="getErrorIdx(errors.langs, idx, 'description')" />
      </div>
      <button class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-md text-gray-200" @click="addLang">
        <svg-icon name="plus" />
        {{ $t('utils.add') }}
      </button> -->

      <div class="grid-lang">
        <ol class="py-2 space-y-2">
          <li class="bg-indigo-700 text-gray-300 rounded-sm p-2">
            <svg-icon name="language" />
            {{ $t("utils.language") }}
          </li>
          <li v-for="lang in modelField.langs.language.choices" :key="lang.value"
              :class="{'text-indigo-700 font-medium': currentLang.value == lang.value}"
              class="p-2 shadow-sm bg-gray-300 rounded-sm flex justify-between cursor-pointer hover:text-indigo-700 hover:bg-gray-400"
              @click="currentLang = lang"
          >
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
            <form-select v-model="currentObj.language" :field="modelField.langs.language" :errors="getErrorIdx(errors.langs, indexOf, 'language')" />
            <form-text v-model="currentObj.title" :field="modelField.langs.title" :errors="getErrorIdx(errors.langs, indexOf, 'title')" />
            <form-text-editor v-model="currentObj.description" :field="modelField.langs.description" :errors="getErrorIdx(errors.langs, indexOf, 'description')" />
          </div>
          <div v-else-if="currentLang.value" class="flex justify-center items-center flex-col h-full space-y-4">
            <span class="text-xl capitalize">{{ currentLang.display_name }}</span>
            <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md">{{ $t('help.language-dosent-exist-create-?') }}</p>
            <button class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-md text-gray-200" @click="addLang(currentLang.value)">
              <svg-icon name="plus" />
              {{ $t('utils.add') }}
            </button>
          </div>
        </div>
        <form-submit class="col-span-2"  @submit="submit"/>
      </div>

    </div>

  </div>
</template>

<script>
import eventMixins from "~/mixins/model/event"
import formMixin from "~/mixins/admin/form"

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
    ddd () {
      return {
        title: this.data.title,
        date: this.data.date,
        tags: this.data.tags,
      }
    },
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
