<template>
  <div class="wrapper">
    <div class="flex flex-col justify-center items-center grid-about-intro z-10">
      <div class="text-center mb-4">
        <p class="font-bold text-gray-900 text-2xl">
          {{ $t('pages.auth.register.register-account') }}
        </p>
        <p class="text-sm text-gray-600">
          {{ $t('global.or') }}
          <extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700">
            {{ $t('global.login') }}
          </extra-nuxt-link>
        </p>
      </div>
      <login-form :loading="loading" :errors="errors" :register="true" />
    </div>
    <div class="overflow-hidden m-10 ml-0 flex justify-center items-center grid-home-image">
      <extra-img src="background-about.jpeg" :default="true" class-native="object-cover" />
    </div>
  </div>
</template>

<script>
const LoginForm = () => import("@/components/cher-login")
export default {
  components: { LoginForm },
  data () {
    return {
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
    login (credential) {
      this.loading = true
      this.errors = {
        email: [],
        password1: [],
      }

      this.$axios
        .post("auth/registration/", {data: credential})
        .then(response => {
          if (response.status === 201) {
            this.$toast
              .success(response.data)
              .goAway(4000)
            this.redirect({ name: "contribute" })
          }
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
