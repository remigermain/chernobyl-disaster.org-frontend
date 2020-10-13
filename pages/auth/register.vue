<template>
  <section class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2
    border-l-8 rounded-t-lg border-l-gray-800 dark:border-l-indigo-700"
  >
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('authentication.register-account') }}
    </h1>
    <span class="text-sm text-gray-700 dark:text-gray-200">
      {{ $t('word.or') }}
      <nuxt-link  :to="localePath({name : 'auth-login'})" class="text-md font-semibold hover:text-indigo-500 text-indigo-600" :title="$t('text.goto-login')">
        {{ $t('authentication.login') }}
      </nuxt-link>
    </span>
    <form class="my-4 w-3/4 min-min-w-max-content space-y-2" @submit.prevent="submit">
      <field-email v-model="data.email" :field="modelField.email" :errors="errors.email" />
      <field-username v-model="data.username" :field="modelField.username" :errors="errors.username" />
      <field-password v-model="data.password1" :field="field.password1" :errors="errors.password1" />
      <field-password v-model="data.password2" :field="field.password2" :errors="errors.password2" />
      <field-submit class="w-full submit">
        {{ $t('authentication.register') }}
      </field-submit>
    </form>
  </section>
</template>

<script>
import {setObjectKeysValue} from "~/lib/utils"
import accountMixins from "~/mixins/model/account"

export default {
  name: "AuthRegister",

  mixins: [accountMixins],

  layout: "auth",
  transition: "auth",

  data () {
    return {
      data: {
        email: "",
        username: "",
        password1: "",
        password2: "",
      },
      errors: {
        email: [],
        username: [],
        password1: [],
        password2: [],
      },
      field: {
        password1: {
          label: this.$t("authentication.password"),
          name: "password1",
        },
        password2: {
          label: this.$t("authentication.comfirm-password"),
          name: "password2",
        }
      }
    }
  },

  head () {
    const title = this.$t("title.register")
    const description = this.$t("description.register")
    return {
      title,
      meta: [
          { hid: "description", name: "description", content: description },
          { property: "og:title", content: title},
          { property: "og:description", content: description},
          { name: "twitter:title", content: title },
          { name: "twitter:card", content: description },
          { name: "twitter:description", content: description },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  created () {
    /* merge parent model with current */
    this.password1 = {...this.modelField.password, ...this.password1}
    this.password2 = {...this.modelField.password, ...this.password2}
  },

  methods: {
    submit () {
      this.$store.commit("ON_LOADING", true)

      setObjectKeysValue(this.errors, [])

      this.$axios.post("auth/registration/", this.data)
        .then(response => {
          if (response.status!==201) {
            throw new Error("error-server")
          }
          // reste value
          setObjectKeysValue(this.data, "")

          this.i18nToast.success(this.$t("success-message.registration")).goAway(8000)
          this.$router.push(this.localePath({ name: "auth-login" }))
        })
        .catch(error => {
          this.responseError(error)
            .then(data => {
              data.email && (this.errors.email = data.email)
              data.username && (this.errors.username = data.username)
              data.password1 && (this.errors.password1 = data.password1)
              data.password2 && (this.errors.password2 = data.password2)
            })
        })
        .finally(() => { this.$store.commit("ON_LOADING", false) })
    }
  },

}
</script>
