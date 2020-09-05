<template>
  <lazy-model-list :model="$t('admin.label.account')" :create="false">
    <template v-slot:breadcrumbs>
      <lazy-bread-crumb>
        {{ $t('admin.label.account') }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:label>
      {{ $t('admin.label.account') }}
    </template>
    <template v-slot:table>
      <div class="flex justify-center flex-col items-center">
        <div class="-sm:w-full -md:w-1/3 w-2/4">
          <h2 class="text-xl">
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
        <div class="-sm:w-full -md:w-1/3 w-2/4">
          <h2 class="text-xl">
            {{ $t('auth.delete-account') }}
          </h2>
          <form class="account-form shadow-sm p-4" @submit.prevent="submitPassword">
            <button type="submit" class="px-2 py-2 bg-red-800 rounded text-gray-200 hover:bg-red-900 w-full mt-4 text-center">
              {{ $t('utils.delete') }}
            </button>
          </form>
        </div>
      </div>
    </template>
  </lazy-model-list>
</template>

<script>

export default {
  name: "ContributeAccount",

  data () {
    return {
      errors: {
        new_password1: [],
        new_password2: [],
        old_password: []
      },
      field: {
        oldpassword: {
          label: this.$t("admin.model.old-password"),
          name: "old_password",
          required: true,
          max_length: 50,
        },
        password1: {
          label: this.$t("admin.model.new-password"),
          name: "new_password1",
          required: true,
          max_length: 50,
        },
        password2: {
          label: this.$t("admin.model.new-comfirm-password"),
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
      this.errors = {
        new_password1: [],
        new_password2: [],
        old_password: []
      },

      this.$axios.post("auth/password/change/", form)
        .then(response => {
          if (response.status != 200) {
            throw Error("")
          }
          this.$i18nToast().success(response.data.detail).goAway(4000)
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  }

}
</script>

<style lang="scss" scoped>
.account-form > * {
  margin-top: 1.5rem
}
</style>
