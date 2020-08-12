<template>
  <div class="flex justify-around flex-wrap">
    <div class="-sm:w-full -md:w-1/3 w-2/4">
      <h2 class="text-3xl">
        {{ $t('account.change-password') }}
      </h2>
      <form @submit.prevent="submitPassword">
        <field-password :field="field.oldpassword" :errors="errors.old_password" />
        <field-password :field="field.password1" :errors="errors.new_password1" />
        <field-password :field="field.password2" :errors="errors.new_password2" />
        <field-submit>
          {{ $t('account.submit') }}
        </field-submit>
      </form>
    </div>
  </div>
</template>

<script>

export default {


  data () {
    return {
      errors: {
        new_password1: [],
        new_password2: [],
        old_password: []
      },
      field: {
        oldpassword: {
          label: this.$t("authentification.old-password"),
          name: "old_password",
          required: true,
          max_length: 50,
        },
        password1: {
          label: this.$t("authentification.new-password"),
          name: "new_password1",
          required: true,
          max_length: 50,
        },
        password2: {
          label: this.$t("authentification.new-comfirm-password"),
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
