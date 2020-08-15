<template>
  <div class="grid-register">
    <div class="register-description">
      <p class="font-bold text-gray-900 text-2xl">
        {{ $t('auth.register-account') }}
      </p>
      <p class="text-sm text-gray-600">
        {{ $t('utils.or') }}
        <lazy-extra-nuxt-link :to="{name : 'auth-login'}" class="text-md text-purple-700">
          {{ $t('auth.login') }}
        </lazy-extra-nuxt-link>
      </p>
      <form class="bg-white shadow-md rounded px-8 py-6 mb-4 w-full -md:w-full xl:w-3/4 form" @submit.prevent="submit">
        <field-email :field="field.email" :errors="errors.email" />
        <field-username :field="field.username" :errors="errors.username" />
        <field-password :field="field.password1" :errors="errors.password1" />
        <field-password :field="field.password2" :errors="errors.password2" />
        <field-submit>
          {{ $t('auth.register') }}
        </field-submit>
      </form>
    </div>
    <div class="register-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="register-image-item">
      </picture>
    </div>
  </div>
</template>

<script>

export default {
  name: "AuthRegister",

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
            throw Error("") // TODO
          }
          this.$i18nToast().success(response.data).goAway(4000)
          event.target.reset()
          this.redirect({ name: "auth-login" })
        })
        .catch((error) => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },
}
</script>


<style lang="scss" scoped>
.grid-register {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.register-description {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
}

.register-image {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 4rem;
  .register-image-item {
    object-fit: cover;
  }
}

@media screen and (max-width:1200px){
  .register-description  {
    padding: 2rem;
  }
}

@media screen and (max-width:1000px){
  .register-image {
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
    .register-image-item {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  .register-description  {
    grid-area: 1 / 1 / 1 / 3;
  }
}

.form > * + * {
  margin-top: 1rem
}
</style>
