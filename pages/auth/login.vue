<template>
  <div class="wrapper">
    <div class="text-center mb-4">
      <p class="font-bold text-gray-900 text-2xl">
        {{ $t('global.connection-account') }}
      </p>
      <p class="text-sm text-gray-600">
        {{ $t('global.or') }}
        <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700">
          {{ $t('global.create-account') }}
        </extra-nuxt-link>
      </p>
    </div>
    <login-form :credential="credential" :errors="errors" @submit="submit" />
  </div>
</template>

<script>
import auth from "~/mixins/auth"

export default {

  mixins: [
    auth
  ],

  methods: {
    formData () {
      return {
        email: this.credential.email,
        password: this.credential.password1,
      }
    },
    submit () {
      this.loading = true
      this.resetError()

      this.$auth.loginWith("local", {data: this.formData()})
        .then(() => {
          this.redirect({ name: "contribute" })
        })
        .catch(() => {
          this.$i18nToast().error(this.$t("pages.auth.login.serverError")).goAway(4000)
        })
        .finally(() => {
          this.loading = false
        })
      }
    },

}
</script>
