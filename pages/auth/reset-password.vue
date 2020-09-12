<template>
  <div class="grid-password">
    <div class="password-description">
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
    <div class="password-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="password-image-item">
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


<style lang="scss" scoped>
.grid-password {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.password-description {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
}

.password-image {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 4rem;
  .password-image-item {
    object-fit: cover;
  }
}

@media screen and (max-width:1200px){
  .password-description  {
    padding: 2rem;
  }
}

@media screen and (max-width:1000px){
  .password-image {
    width: 100vw;
    height: 100vh;
    justify-content: end;
    margin: 0;
    transform: translate(0, -50%);
    top: 50%;
    right: 0;
    position: absolute;
    z-index: -1;
    opacity: .3;
    .password-image-item {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  .password-description  {
    grid-area: 1 / 1 / 1 / 3;
  }
}

.form > * + * {
  margin-top: .5rem
}

.submit {
  margin-top: 2em !important;
}
</style>
