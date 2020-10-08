<template>
  <div>
    <form class="dark:bg-gray-800 rounded-md shadow-lg" @submit.prevent="$emit('submit', $event)">
      <form-text v-model="value.title" :field="modelField.title" :errors="errors.title" />
      <div class="w-full flex flex-wrap justify-around">
        <form-datetime v-model="value.date" :field="modelField.date" :errors="errors.date" />
        <form-multiselect v-model="value.tags" :field="modelField.tags" :errors="errors.tags" />
      </div>
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
                :class="{
                  'text-indigo-700 border-indigo-700 font-medium dark:text-gray-300 dark:bg-gray-700 dark:border-indigo-700': currentLang.value === lang.value,
                }"
                class="p-2 shadow-sm bg-gray-400 font-medium rounded-sm flex justify-between cursor-pointer hover:text-indigo-700 hover:bg-gray-400
                        border-t-4 border-gray-400 dark:bg-gray-900 dark:border-gray-900 transition-colors duration-300"
                @click="currentLang = lang"
            >
              <div v-if="langExist(lang.value)" class="flex justify-center items-center space-x-2">
                <svg-icon v-if="langIsNew(lang.value)" name="dots-circle-horizontal" class="text-lg font-medium text-green-600" role="img"/>
                <svg-icon v-else name="circle-check" class="text-lg font-medium text-green-600" role="img"/>
                <div v-if="haveError(lang.value)" class="inline-flex relative">
                  <svg-icon name="alert-circle" class="text-red-800 dark:text-red-600 relative text-lg font-medium" role="img" />
                  <svg-icon name="alert-circle" class="text-red-800 dark:text-red-600 absolute text-lg font-medium animate-ping" role="img" />
                </div>
              </div>
              <span>
                {{ lang.display_name }}
              </span>
              <div class="flex justify-center items-center self-end">
                <svg-icon name="arrow-left" class="transform transition-all duration-200 ml-2" role="img"
                          :class="{'rotate-180': currentLang.value == lang.value}"
                />
              </div>
            </li>
          </ol>
          <div class="p-2">
            <div v-if="currentObj">
              <button v-if="currentObj._new || $auth.hasScope('staff')" class="bg-red-200 py-1 px-3 rounded-md" @click.stop.prevent="deleteObject">
                <action-delete  />
              </button>
              <form-text v-model="currentObj.title" :field="modelField.langs.title" :errors="getErrorIdx('title')" />
              <form-text-editor v-model="currentObj.description" :field="modelField.langs.description" :errors="getErrorIdx('description')" />
            </div>
            <div v-else-if="currentLang.value" class="flex justify-center items-center flex-col h-full space-y-4">
              <span class="text-xl capitalize">{{ currentLang.display_name }}</span>
              <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-dosent-exist-create-?') }}</p>
              <button type="button" class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-md text-gray-200" @click.stop.prevent="addLang(currentLang.value)">
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
    <admin-modal v-if="activeModal" @close="activeModal = false" @delete="submitDelete"/>
  </div>
</template>

<script>
import formMixin from "~/mixins/admin/form"

export default {

  mixins: [formMixin],

  data () {
    return {
      currentLang: {},
    }
  },

  methods: {
    addLang (language) {
      /* add langs default value */
      this.value.langs.push({
        _new: true,
        title: '',
        description: '',
        language
      })
    },
    urlDeleteLang(obj) {
      return `event-lang/${obj.id}/`
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
