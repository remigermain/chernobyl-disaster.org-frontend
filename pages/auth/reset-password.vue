<template>
  <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.connection-account') }}
    </h1>
    <span class="text-sm text-gray-600">
      {{ $t('utils.or') }}
      <extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700"
                       :title="$t('auth.login')"
      >
        {{ $t('auth.login') }}
      </extra-nuxt-link>
    </span>
    <p class="text-sm text-gray-600">
      {{ $t('utils.or') }}
      <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700"
                       :title="$t('auth.create-account')"
      >
        {{ $t('auth.create-account') }}
      </extra-nuxt-link>
    </p>
    <form class="my-4 w-3/4 form" @submit.prevent="submit">
      <field-email :field="field.email" />
      <field-submit class="submit">
        {{ $t('auth.reset-password') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "AuthResetPassword",

  layout: "auth",
  transition: "auth",

  data () {
    return {
      errors: {
        email: [],
      },
      field: {
        email: {
          label: this.$t("auth.field.email"),
          name: "email",
          required: true,
          max_length: 50,
        },
      }
    }
  },

  methods: {
    submit (event) {
      const form = new FormData(event.target)
      this.loading = true
      this.errors = {email: []}

      this.$axios.post("auth/password/reset/", form)
        .then((response) => {
          this.redirect({ name: "auth-login" })
          this.i18nToast.info(response.data.detail).goAway(4000)
        })
        .catch((error) => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },

  head () {
    return {
      title: this.$t("auth.reset-password"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.meta.reset-password.description") },
          { property: "og:title", content: this.$t("pages.meta.reset-password.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.reset-password.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.reset-password.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.reset-password.title") },
          { name: "twitter:description", content: this.$t("pages.meta.reset-password.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.reset-password.title") }
      ]
    }
  }
}
</script>
