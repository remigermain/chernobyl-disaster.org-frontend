<template>
  <div class="grid-form">
    <div class="form-description">
      <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4">
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
        <form class="my-4 mx-8 w-3/4 form" @submit.prevent="submit">
          <field-email :field="field.email" />
          <field-submit class="submit">
            {{ $t('auth.reset-password') }}
          </field-submit>
        </form>
      </section>
    </div>
    <div class="form-image">
      <picture role="img">
        <!-- <source srcset="~/assets/img/background-login-mobile.avif" media="(max-width: 550px)" format="image/avif"> -->
        <source srcset="~/assets/img/background-login-mobile.webp" media="(max-width: 550px)" format="image/webp">
        <source srcset="~/assets/img/background-login-mobile.jpeg" media="(max-width: 550px)" format="image/jpeg">
        <!-- <source srcset="~/assets/img/background-login-tablet.avif" media="(max-width: 850px)" format="image/avif"> -->
        <source srcset="~/assets/img/background-login-tablet.webp" media="(max-width: 850px)" format="image/webp">
        <source srcset="~/assets/img/background-login-tablet.jpeg" media="(max-width: 850px)" format="image/jpeg">
        <!-- <source srcset="~/assets/img/background-login.avif" media="(min-width: 850px)" format="image/avif"> -->
        <source srcset="~/assets/img/background-login.webp" media="(min-width: 850px)" format="image/webp">
        <img loading="lazy" src="~/assets/img/background-login.jpeg" alt="image" format="image/jpeg" class="form-image-item">
      </picture>
    </div>
  </div>
</template>

<script>

export default {
  name: "AuthResetPassword",

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
          this.$i18nToast().info(response.data.detail).goAway(4000)
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
