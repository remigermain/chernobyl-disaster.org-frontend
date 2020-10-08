<template>
  <section class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.check-email') }}
    </h1>
    <span class="text-sm text-gray-700 dark:text-gray-200">
      {{ $t('utils.or') }}
      <nuxt-link  :to="localePath({name : 'auth-login'})" class="text-md font-semibold hover:text-indigo-500 text-indigo-600" :title="$t('auth.goto-login')">
        {{ $t('auth.login') }}
      </nuxt-link>
    </span>
    <p class="text-sm leading-5 text-gray-700">
      {{ $t('auth.check-email-description') }}
    </p>
    <form class="my-4 w-3/4 min-min-w-max-content form" @submit.prevent="submit">
      <field-submit class="w-full">
        {{ $t('auth.validate') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "AuthLogin",
  layout: "auth",

  validate ({query}) {
    return !!query.key
  },

  transition: "auth",

  methods: {
    submit () {
      this.loading = true
      this.$axios.post("auth/registration/verify-email/", {key: this.$route.query.key})
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        this.i18nToast.success(this.$t("auth.email-verified")).goAway(6000)
        this.$router.push(this.localePath({name: "auth-login"}))
      })
      .catch(error => { this.responseError(error) })
      .finally(() => { this.loading = false })
    }
  }
}
</script>
