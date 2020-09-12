<template>
  <div class="grid-form">
    <div class="form-description">
      <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4">
        <h1 class="font-bold text-gray-900 text-2xl">
          {{ $t('auth.connection-account') }}
        </h1>
        <span class="text-sm text-gray-600">
          {{ $t('utils.or') }}
          <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700"
                           :title="$t('auth.create-account')"
          >
            {{ $t('auth.create-account') }}
          </extra-nuxt-link>
        </span>
        <form class="my-4 mx-8 w-3/4 form"
              @submit.prevent="submit"
        >
          <field-email :field="field.email" :errors="errors.email" />
          <field-password :field="field.password" :errors="errors.password" />
          <div class="flex justify-end mx-auto text-center my-2">
            <extra-nuxt-link :to="{name: 'auth-reset-password'}" class="text-purple-900 font-md m-sm:w-full my-auto italic space tracking-tighter"
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
    </div>
    <div class="form-image">
      <picture :role="$t('utils.image')">
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="form-image-item">
      </picture>
    </div>
  </div>
</template>

<script>

export default {
  name: "AuthLogin",

  data () {
    return {
      errors: {
        email: [],
        password: [],
      },
      field: {
        email: {
          label: this.$t("auth.field.email"),
          name: "email",
          required: true,
          max_length: 50,
        },
        password: {
          label: this.$t("auth.field.password"),
          name: "password",
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
      this.errors = {email: [], password: []}

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
          { hid: "description", name: "description", content: this.$t("pages.meta.login.description") },
          { property: "og:title", content: this.$t("pages.meta.login.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.login.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.login.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.login.title") },
          { name: "twitter:description", content: this.$t("pages.meta.login.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.login.title") }
      ]
    }
  }
}
</script>
