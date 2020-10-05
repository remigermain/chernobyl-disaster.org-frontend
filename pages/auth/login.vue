<template>
  <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.connection-account') }}
    </h1>
    <span class="text-sm text-gray-700">
      {{ $t('utils.or') }}
      <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700"
                       :title="$t('auth.create-account')"
      >
        {{ $t('auth.create-account') }}
      </extra-nuxt-link>
    </span>
    <form class="my-4 w-3/4 form"
          @submit.prevent="submit"
    >
      <field-username :field="field.username" :errors="errors.username" />
      <field-password :field="field.password" :errors="errors.password" />
      <div class="flex justify-end mx-auto text-center my-2">
        <extra-nuxt-link :to="{name: 'auth-reset-password'}" class="text-purple-700 font-md m-sm:w-full my-auto italic space tracking-tighter"
                         :title="$t('auth.forget-password')"
        >
          {{ $t('auth.forget-password') }}
        </extra-nuxt-link>
      </div>
      <field-submit>
        {{ $t('auth.login') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "AuthLogin",

  layout: "auth",
  transition: "auth",

  data () {
    return {
      errors: {
        username: [],
        password: [],
      },
      field: {
        username: {
          label: this.$t("auth.username"),
          name: "username",
          required: true,
        },
        password: {
          label: this.$t("auth.password"),
          name: "password",
          required: true,
        }
      }
    }
  },

  methods: {
    submit (event) {
      const form = new FormData(event.target)
      this.loading = true
      this.errors = {username: [], password: []}

      this.$auth.loginWith("local", {data: form})
        .then(() => { this.redirect({ name: "contribute" }) })
        .catch((error) => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },

  head () {
    return {
      title: this.$t("auth.login"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.login.description") },
          { property: "og:title", content: this.$t("pages.login.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.login.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.login.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.login.title") },
          { name: "twitter:description", content: this.$t("pages.login.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.login.title") }
      ]
    }
  }
}
</script>
