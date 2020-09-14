<template>
  <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.register-account') }}
    </h1>
    <span class="text-sm text-gray-600">
      {{ $t('utils.or') }}
      <lazy-extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700"
                            :title="$t('auth.goto-login')"
      >
        {{ $t('auth.login') }}
      </lazy-extra-nuxt-link>
    </span>
    <form class="my-4 w-3/4 form" @submit.prevent="submit">
      <field-email :field="field.email" :errors="errors.email" />
      <field-username :field="field.username" :errors="errors.username" />
      <field-password :field="field.password1" :errors="errors.password1" />
      <field-password :field="field.password2" :errors="errors.password2" />
      <field-submit class="submit">
        {{ $t('auth.register') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "AuthRegister",

  layout: "auth",
  transition: "auth",

  data () {
    return {
      errors: {
        email: [],
        username: [],
        password1: [],
        password2: [],
      },
      field: {
        email: {
          label: this.$t("auth.field.email"),
          name: "email",
          required: true,
          max_length: 50,
        },
        username: {
          label: this.$t("auth.field.username"),
          name: "username",
          required: true,
          max_length: 50,
        },
        password1: {
          label: this.$t("auth.field.password"),
          name: "password1",
          required: true,
          max_length: 50,
        },
        password2: {
          label: this.$t("auth.field.comfirm-password"),
          name: "password2",
          required: true,
          max_length: 50,
        }
      }
    }
  },

  methods: {
    submit (event) {
      const form = new FormData(event.target)
      this.loading = true
      this.errors = {email: [], username: [], password1: [], password2: []}

      this.$axios.post("auth/registration/", form)
        .then(response => {
          if (response.status != 201) {
            throw Error("")
          }
          this.$i18nToast().success(this.$t("auth.registeration-success"))
          event.target.reset()
          this.redirect({ name: "auth-login" })
        })
        .catch((error) => {this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },

  head () {
    return {
      title: this.$t("menu.register"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.meta.register.description") },
          { property: "og:title", content: this.$t("pages.meta.register.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.register.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.register.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.register.title") },
          { name: "twitter:description", content: this.$t("pages.meta.register.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.register.title") }
      ]
    }
  }
}
</script>
