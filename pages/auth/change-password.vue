<template>
  <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.new-password') }}
    </h1>
    <span class="text-sm text-gray-700">
      {{ $t('utils.or') }}
      <nuxt-link  :to="localePath({name : 'auth-login'})" class="text-md text-purple-700"
                       :title="$t('auth.login')"
      >
        {{ $t('auth.login') }}
      </nuxt-link>
    </span>
    <form class="my-4 w-3/4 form" @submit.prevent="submit">
      <field-password :field="field.new_password1" :errors="errors.new_password1" />
      <field-password :field="field.new_password2" :errors="errors.new_password2" />
      <field-submit class="submit">
        {{ $t('auth.change-password') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "AuthResetPassword",

  validate ({query}) {
    return !!query.uid && !!query.token
  },

  layout: "auth",
  transition: "auth",

  data () {
    return {
      errors: {
        new_password1: [],
        new_password2: [],
      },
      field: {
        new_password1: {
          label: this.$t("auth.password"),
          name: "new_password1",
          required: true,
        },
        new_password2: {
          label: this.$t("auth.comfirm-password"),
          name: "new_password2",
          required: true,
        }
      }
    }
  },

  methods: {
    submit (event) {
      const form = new FormData(event.target)
      this.loading = true

      const data = {
        new_password1: form.get("new_password1"),
        new_password2: form.get("new_password2"),
        uid: this.$route.query.uid,
        token: this.$route.query.token
      }
      this.$axios.post("auth/password/reset/confirm/", data)
        .then(response => {
          if (response.status!==200) {
            throw new Error("error-server")
          }
          this.i18nToast.success(this.$t("success.password-changed")).goAway(6000)
          this.$router.push(this.localePath({name: "auth-login"}))
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },
}
</script>
