<template>
  <div class="grid-login">
    <div class="login-description">
      <p class="font-bold text-gray-900 text-2xl">
        {{ $t('auth.connection-account') }}
      </p>
      <p class="text-sm text-gray-600">
        {{ $t('utils.or') }}
        <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700">
          {{ $t('auth.create-account') }}
        </extra-nuxt-link>
      </p>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-3/4 -md:w-full xl:w-3/4 form" @submit.prevent="submit">
        <field-email :field="field.email" :errors="errors.email" />
        <field-password :field="field.password" :errors="errors.password" />
        <div class="flex justify-end mx-auto text-center">
          <extra-nuxt-link :to="{name: 'auth-reset-password'}" class="text-purple-900 font-md m-sm:w-full my-auto">
            {{ $t('auth.ForgetPassword') }}
          </extra-nuxt-link>
        </div>
        <field-submit>
          {{ $t('auth.login') }}
        </field-submit>
      </form>
    </div>
    <div class="login-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="login-image-item">
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
        .then(() => { this.redirect({ name: "contribute-event" }) })
        .catch((error) => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },

}
</script>


<style lang="scss" scoped>
.grid-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.login-description {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
}

.login-image {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 4rem;
  .login-image-item {
    object-fit: cover;
  }
}

@media screen and (max-width:1200px){
  .login-description  {
    padding: 2rem;
  }
}

@media screen and (max-width:1000px){
  .login-image {
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
    .login-image-item {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  .login-description  {
    grid-area: 1 / 1 / 1 / 3;
  }
}

.form > * + * {
  margin-top: 2rem
}
</style>
