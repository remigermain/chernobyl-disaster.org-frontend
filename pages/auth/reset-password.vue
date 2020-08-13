<template>
  <div class="grid-password">
    <div class="password-description">
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
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-3/4 -md:w-full xl:w-2/4 form" @submit.prevent="submit">
        <field-email :field="field.email" />
        <field-submit>
          {{ $t('authentification.reset-password') }}
        </field-submit>
      </form>
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
          label: this.$t("authentification.email"),
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
  margin-top: 2rem
}

</style>
