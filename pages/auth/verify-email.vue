<template>
  <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.check-email') }}
    </h1>
    <span class="text-sm text-gray-700">
      {{ $t('utils.or') }}
      <lazy-extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700"
                            :title="$t('auth.goto-login')"
      >
        {{ $t('auth.login') }}
      </lazy-extra-nuxt-link>
    </span>
    <p class="text-sm leading-5 text-gray-700">
      {{ $t('auth.check-email-description') }}
    </p>
    <form class="my-4 w-3/4 form"
          @submit.prevent="submit"
    >
      <field-submit>
        {{ $t('auth.validate') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "AuthLogin",

  layout: "auth",
  transition: "auth",

  validate ({query}) {
    return !!query.key
  },

  methods: {
    submit () {
      this.loading = true
      this.$axios.post("auth/registration/verify-email/", {key: this.$route.query.key})
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        this.i18nToast.success(this.$t("auth.email-verified")).goAway(6000)
        this.redirect({name: "auth-login"})
      })
      .catch(error => { this.requestError(error) })
      .finally(() => { this.loading = false })
    }
  }
}
</script>
