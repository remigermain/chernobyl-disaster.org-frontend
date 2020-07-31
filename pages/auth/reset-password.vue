<template>
  <div class="wrapper">
    <div class="text-center mb-4">
      <p class="font-bold text-gray-900 text-2xl">
        {{ $t('global.connection-account') }}
      </p>
      <p class="text-sm text-gray-600">
        {{ $t('global.or') }}
        <extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700">
          {{ $t('global.login') }}
        </extra-nuxt-link>
      </p>
      <p class="text-sm text-gray-600">
        {{ $t('global.or') }}
        <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700">
          {{ $t('global.create-account') }}
        </extra-nuxt-link>
      </p>
    </div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-3/4 -md:w-full xl:w-2/4 from-login" @submit.prevent="submit">
      <utils-field v-model="credential.email" input-type="email" :errors="errors.email" required autocomplete>
        <template v-slot:label>
          {{ $t('global.email') }}
        </template>
        <template v-slot:icon>
          <icon-email class="inline text-gray-600" />
        </template>
      </utils-field>
      <button type="submit" class="px-2 py-2 bg-blue-600 rounded-lg text-gray-200 hover:scale-110 w-full mt-4">
        <template v-if="loading">
          <utils-loading />
        </template>
        <template v-else>
          {{ $t("global.reset") }}
        </template>
      </button>
    </form>
  </div>
</template>

<script>
import iconEmail from "@/assets/svg/mail.svg"
export default {
  components: {
    iconEmail
  },
  data () {
    return {
      credential: {
        email: "",
      },
      loading: false,
      errors: {
        email: [],
      },
    }
  },
  methods: {
    submit () {
      this.loading = true
      this.errors = {
        email: [],
        password1: [],
      }

      this.$axios
        .post("auth/password-reset/", {
          data: {
            email: this.credential.email,
          }
        })
        .then(() => {
          this.redirect({ name: "login" })
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            this.$toast.error(this.$t("global.serverError")).goAway(4000)
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
