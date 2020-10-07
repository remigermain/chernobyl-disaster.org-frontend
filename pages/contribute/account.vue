<template>
  <div class="flex flex-col space-y-2">
    <lazy-contribute-breadcrumb>
      {{ $t('admin.label.account') }}
    </lazy-contribute-breadcrumb>
    <h1 class="text-3xl capitalize self-start">
      {{ $t('admin.label.account') }}
    </h1>
    <div class="flex justify-around flex-wrap account shadow-md border rounded-md dark:bg-gray-800 dark:border-none">
      <div class="-sm:w-full py-4 rounded password">
        <h2 class="text-xl text-center capitalize">
          {{ $t('account.change-password') }}
        </h2>
        <form class="shadow-sm p-4 space-y-4" @submit.prevent="submitPassword">
          <field-password v-model="data.old_password" :field="field.old_password" :errors="errors.old_password" />
          <field-password v-model="data.new_password1" :field="field.new_password1" :errors="errors.new_password1" />
          <field-password v-model="data.new_password2" :field="field.new_password2" :errors="errors.new_password2" />
          <div class="flex justify-end w-full">
            <field-submit class="w-min-content">
              {{ $t('account.change-password') }}
            </field-submit>
          </div>
        </form>
      </div>
      <div class="-sm:w-full flex flex-col space-y-2">
        <div class="-sm:w-full py-4 rounded password">
          <h2 class="text-xl text-center capitalize">
            {{ $t('account.change-settings') }}
          </h2>
          <form class="p-4 rounded space-y-2" @submit.prevent="submitSettings">
            <field-checkbox v-model="data.show_help" :field="modelField.show_help" :errors="errors.show_help" />
            <field-select v-model="data.default_language"  :field="modelField.default_language" :errors="errors.default_language" />
            <div class="flex justify-end w-full">
              <field-submit class="w-min-content">
                {{ $t('utils.update') }}
              </field-submit>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="flex justify-start flex-col account shadow-md border rounded-md dark:border-none">
      <div class="rounded">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
          <div class="flex items-center">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-300
                        sm:mx-0 sm:h-10 sm:w-10 cursor-pointer group" @click="active = true">
              <svg-icon name="x" class="h-6 w-6 text-red-600 group-hover:scale-125 transform duration-300 transition-transform" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 text-opacity-75 dark:text-gray-400">
                {{ $t('auth.delete-account') }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <utils-modal v-if="active" @close="active = false">
      <template #content>
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg-icon name="alert-triangle" class="h-6 w-6 text-red-600" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900dark:text-gray-400 ">
            {{ $t('auth.delete-account-description') }}
          </h3>
        </div>
      </template>
      <template #action>
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border
          border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500
          focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  @click.prevent="submitDelete"
          >
            {{ $t('utils.delete') }}
          </button>
        </span>
      </template>
    </utils-modal>
  </div>
</template>

<script>
import accountMixins from "~/mixins/model/account"
import { setObjectKeysValue } from "~/lib/utils"

export default {
  name: "ContributeAccount",

  mixins: [accountMixins],

  layout: "page",
  transition: "page",

  data () {
    return {
      active: false,
      data: {
        old_password: "",
        new_password1: "",
        new_password2: "",
        default_language: this.$auth.user.default_language,
        show_help: this.$auth.user.show_help,
      },
      errors: {
        new_password1: [],
        new_password2: [],
        old_password: [],
        show_help: [],
        default_language: [],
      },
      field: {
        old_password: {
          label: this.$t("auth.old-password"),
          name: "old_password",
        },
        new_password1: {
          label: this.$t("auth.new-password"),
          name: "new_password1",
        },
        new_password2: {
          label: this.$t("auth.comfirm-new-password"),
          name: "new_password2",
        }
      }
    }
  },

  created () {
    this.field.old_password = {...this.modelField.password, ...this.field.old_password}
    this.field.new_password1 = {...this.modelField.password, ...this.field.new_password1}
    this.field.new_password2 = {...this.modelField.password, ...this.field.new_password2}
  },

  methods: {
    submitPassword () {
      /*
        submit for change password user
      */
      this.loading = true
      setObjectKeysValue(this.errors, [])

      const data = {
        old_password: this.data.old_password,
        new_password1: this.data.new_password1,
        new_password2: this.data.new_password2,
      }

      this.$axios.post("auth/password/change/", data)
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t('success.password-changed')).goAway(4000)
        })
        .catch(error => {
          this.responseError(error)
            .then(data => {
              data.old_password && (this.errors.old_password = data.old_password)
              data.new_password1 && (this.errors.new_password1 = data.new_password1)
              data.new_password2 && (this.errors.new_password2 = data.new_password2)
            })
        })
        .finally(() => { this.loading = false })
    },
    submitSettings () {
      /*
        submit for change settings user
      */
      this.loading = true
      setObjectKeysValue(this.errors, [])
      const data = {
        default_language: this.data.default_language,
        show_help: this.data.show_help,
      }

      this.$axios.patch("auth/user/", data)
        .then(response => {
          if (response.status !== 200 ) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t('success.update')).goAway(4000)
          // TODO redirect language ?
        })
        .catch((error) => {
          this.responseError(error)
            .then(data => {
              data.show_help && (this.errors.show_help = data.show_help)
              data.default_language && (this.errors.default_language = data.default_language)
            })
        })
        .finally(() => { this.loading = false })
    },
    submitDelete () {
      this.loading = true
      this.active = false
      setObjectKeysValue(this.errors, [])

      this.$axios.post("auth/")
        .then(response => {
          if (response.status !== 200) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success-account"))
          this.$auth.logout()
          this.$router.push(this.localePath({ name: "home" }))
        })
        .catch((error) => { this.responseError(error) })
        .finally(() => { this.loading = false })
    }
  }

}
</script>
