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
    <login-form :credential="credential" :loading="loading" :errors="errors" @submit="login" />
  </div>
</template>

<script>
const LoginForm = () => import("@/components/cher-login")
export default {
  components: { LoginForm },
  data () {
    return {
      credential: {
        email: "",
        password1: ""
      },
      loading: false,
      errors: {
        email: [],
        password1: [],
      },
    }
  },
  methods: {
    login () {
      this.loading = true
      this.errors = {
        email: [],
        password1: [],
      }

      this.$auth
        .loginWith("local", {
          data: {
            email: this.credential.email,
            password: this.credential.password1,
          }
        })
        .then(() => {
          this.redirect({ name: "contribute" })
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$toast.error(this.$t("pages.auth.login.serverError")).goAway(4000)
          } else if (
            Object.prototype.hasOwnProperty.call(error.response.data, "non_field_errors")
          ) {
            this.$toast.error(error.response.data.non_field_errors)
          } else {
            error.response.data.forEach((element, key) => {
              if (Object.prototype.hasOwnProperty.call(this.errors, key)) {
                this.messages[key] = element
              }
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
      }
    },

}
</script>
