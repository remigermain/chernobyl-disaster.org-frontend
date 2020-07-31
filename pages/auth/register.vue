<template>
  <div class="wrapper">
    <div class="text-center mb-4">
      <p class="font-bold text-gray-900 text-2xl">
        {{ $t('global.register-account') }}
      </p>
      <p class="text-sm text-gray-600">
        {{ $t('global.or') }}
        <extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700">
          {{ $t('global.login') }}
        </extra-nuxt-link>
      </p>
    </div>
    <login-form :credential="credential" :loading="loading" :errors="errors" :register="true" @submit="register" />
  </div>
</template>

<script>
const LoginForm = () => import("@/components/cher-login")
export default {
  components: { LoginForm },
  data () {
    return {
      credential: {
        username: "",
        email: "",
        password1: "",
        password2: ""
      },
      loading: false,
      errors: {
        username: [],
        email: [],
        password1: [],
        password2: [],
      },
    }
  },
  methods: {
    register () {
      this.loading = true
      this.errors = {
        username: [],
        email: [],
        password1: [],
        password2: [],
      }

      this.$axios
        .post("auth/registration/", this.credential)
        .then(response => {
          if (response.status === 201) {
            this.$toast
              .success(response.data)
              .goAway(4000)
            this.credential = {
              username: "",
              email: "",
              password1: "",
              password2: "",
            }
            this.redirect({ name: "auth-login" })
          }
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$toast.error(this.$t("global.server-error")).goAway(4000)
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
