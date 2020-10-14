<template>
  <section class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2
    border-l-8 rounded-t-lg border-l-gray-800 dark:border-l-indigo-700"
  >
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('authentication.check-email') }}
    </h1>
    <span class="text-sm text-gray-700 dark:text-gray-200">
      {{ $t('word.or') }}
      <nuxt-link  :to="localePath({name : 'auth-login'})" class="text-md font-semibold hover:text-indigo-500 text-indigo-600" :title="$t('text.goto-login')">
        {{ $t('authentication.login') }}
      </nuxt-link>
    </span>
    <form class="my-4 w-3/4 min-min-w-max-content form" @submit.prevent="submit">
      <field-submit class="w-full">
        {{ $t('word.validate') }}
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

  head () {
    const title = this.$t("authentication.check-email")
    return {
      title,
      meta: [
          { property: "og:title", content: title},
          { name: "twitter:title", content: title },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  methods: {
    submit () {
      this.$store.commit("ON_LOADING", true)
      this.$axios.post("auth/registration/verify-email/", {key: this.$route.query.key})
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        this.i18nToast.success(this.$t("success-message.email-verified")).goAway(6000)
        this.$router.push(this.localePath({name: "auth-login"}))
      })
      .catch(error => { this.responseError(error) })
      .finally(() => { this.$store.commit("ON_LOADING", false) })
    }
  }
}
</script>
