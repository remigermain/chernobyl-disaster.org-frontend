<template>
  <div class="w-full">
    <div class="w-full border-gray-500 dark:bg-gray-800 border-t-4 rounded-t-md p-2 mt-2 cursor-pointer italic text-opacity-75"
          :class="{'border-indog-700': active, 'rounded-b-md': !active}"
          @click="active = !active"
    >
      <svg-icon name="arrow-down" class="transform transition-transform duration-400" :class="{'-rotate-90': !active}" />
      <span class="leading-3 p-2 font-bold rounded-full">
        admin
      </span>
    </div>
    <div class="relative overflow-hidden dark:bg-gray-800 rounded-b-md">
      <div class="w-full flex space-y-1 leading-6 transform p-2 transition-all duration-400 justify-around"
            :class="{'scale-y-0 absolute opacity-0': !active, 'scale-y-100 opacity-100 block': active}"
      >
        <div class="rounded-md border shadow-md p-2 dark:bg-gray-900 dark:border-none">
          <h1 class="text-2xl font-bold capitalize italic text-gray-700">
            {{ $t('word.upload') }}
          </h1>
          <form class="flex flex-wrap p-3 " @submit.prevent="submit">
            <div class="flex flex-col">
              <field-select v-model="data.language" :field="modelField.language" :errors="errors.language"/>
              <field-checkbox v-model="data.delete" :field="modelField.delete" :errors="errors.delete"/>
              <field-checkbox v-model="data.nolang" :field="modelField.nolang" :errors="errors.nolang"/>
              <field-checkbox v-model="data.merge" :field="modelField.merge" :errors="errors.merge"/>
              <field-checkbox v-model="data.parent" :field="modelField.parent" :errors="errors.parent"/>
            </div>
            <field-file v-model="data.file" :field="modelField.file" :errors="errors.file" class="w-2/4"/>
            <field-submit class="w-full">
              {{ $t('word.submit') }}
            </field-submit>
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
      active: this.$auth.user.show_admin,
      modelField: {
        language: {
          label: 'language',
          required: false
        },
        delete: {
          label: 'delete'
        },
        nolang: {
          label: 'no language'
        },
        merge: {
          label: 'merge'
        },
        file: {
          label: 'file',
          required: true
        },
        parent: {
          label: 'parent',
        }
      },
      data: {
        language: this.$i18n.locale,
        file: null,
        delete: true,
        merge: false,
        parent: true,
        nolang: true,
      },
      errors: {
        language:  [],
        file: [],
        delete: [],
        merge: [],
        parent: []
      }
    }
  },

  methods: {
     submit () {
      this.$store.commit("ON_LOADING", true)
      const form = new FormData()
      if (this.data.nolang) {
        form.append('language', this.data.language)
      }
      form.append('file', this.data.file.obj)
      // convert to boolean
      form.append('delete', !!this.data.delete)
      form.append('merge', !!this.data.merge)
      form.append('parent', !!this.data.parent)

      this.$axios.post("populate/translate/upload", form)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.i18nToast.info(
            `removed: ${response.data.removed}
            <br>
             create: ${response.data.created}
            <br>
            create parent key: ${response.data.createParentKeys}
            <br>
             create translate: ${response.data.createdLang}
            <br>
             update translate ${response.data.update}
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
              data.parent && (this.errors.parent = data.parent)
            })
        })
        .finally(() => { this.$store.commit("ON_LOADING", true) })
    }
  },
}
</script>
