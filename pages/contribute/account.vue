<template>
  <lazy-model-list :model="$t('admin.label.account')" :create="false" :description="false">
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        {{ $t('admin.label.account') }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:label>
      {{ $t('admin.label.account') }}
    </template>
    <template v-slot:table>
      <div class="flex justify-around flex-wrap items-center account">
        <div class="-sm:w-full shadow-md border pt-4 rounded password">
          <h2 class="text-xl text-center capitalize">
            {{ $t('auth.change-password') }}
          </h2>
          <form class="account-form shadow-sm p-4" @submit.prevent="submitPassword">
            <field-password :field="field.oldpassword" :errors="errors.old_password" />
            <field-password :field="field.password1" :errors="errors.new_password1" />
            <field-password :field="field.password2" :errors="errors.new_password2" />
            <field-submit>
              {{ $t('utils.update') }}
            </field-submit>
          </form>
        </div>
        <div class="-sm:w-full shadow-md border p-4 rounded delete">
          <h2 class="text-xl text-center capitalize">
            {{ $t('auth.delete-account') }}
          </h2>
          <form class="account-form p-4" @submit.prevent="active = true">
            <button type="submit" class="px-2 py-2 bg-red-800 rounded text-gray-200 hover:bg-red-900 w-full mt-4 text-center">
              {{ $t('utils.delete') }}
            </button>
          </form>
          <div v-if="active" class="modal flex justify-center items-center" @click.prevent="active = false">
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform
                  transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" @click.stop
            >
              <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg-icon name="alert-triangle" class="h-6 w-6 text-red-600" />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      {{ $t('auth.confirme-delete-account') }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm leading-5 text-gray-500">
                        {{ $t('auth.delete-account-description') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button type="button" class="inline-flex justify-center w-full rounded-md border
                  border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500
                  focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          @click.prevent="submitDelete"
                  >
                    {{ $t('utils.delete') }}
                  </button>
                </span>
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2
                    bg-white text-base leading-6 font-medium text-gray-700 shadow-sm
                    hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue
                      transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          @click.prevent="active = false"
                  >
                    {{ $t('utils.cancel') }}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </lazy-model-list>
</template>

<script>

export default {
  name: "ContributeAccount",

  layout: "page",
  transition: "page",

  data () {
    return {
      active: false,
      errors: {
        new_password1: [],
        new_password2: [],
        old_password: []
      },
      field: {
        oldpassword: {
          label: this.$t("auth.old-password"),
          name: "old_password",
          required: true,
          max_length: 50,
        },
        password1: {
          label: this.$t("auth.new-password"),
          name: "new_password1",
          required: true,
          max_length: 50,
        },
        password2: {
          label: this.$t("auth.comfirm-new-password"),
          name: "new_password2",
          required: true,
          max_length: 50,
        }
      }
    }
  },

  methods: {
    submitPassword (event) {
      const form = new FormData(event.target)
      this.loading = true
      this.errors = { new_password1: [], new_password2: [], old_password: []}

      this.$axios.post("auth/password/change/", form)
        .then(response => {
          if (response.status!==200) {
            throw new Error("error-server")
          }
          this.i18nToast.success(response.data.detail).goAway(4000)
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    },
    submitDelete () {
      this.loading = true

      this.$axios.post("auth/delete/")
        .then(response => {
          if (response.status!==200) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.delete-account"))
          this.$auth.logout()
          this.$router.push(this.localePath({ name: "home" }))
        })
        .catch((error) => { this.requestError(error) })
        .finally(() => {
          this.loading = false
          this.active = false
        })
    }
  }

}
</script>

<style lang="scss" scoped>
.account-form > * {
  margin-top: 1.5rem
}

.dark-mode .account > {
  .password {
    @apply bg-gray-700 border-none
  }
  .delete {
    @apply bg-gray-700 border-none
  }
}
</style>
