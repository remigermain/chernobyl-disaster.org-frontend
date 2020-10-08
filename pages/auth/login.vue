<template>
  <section class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2">
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('auth.connection-account') }}
    </h1>
    <span class="text-sm text-gray-700 dark:text-gray-200">
      {{ $t('utils.or') }}
      <nuxt-link  :to="localePath({name : 'auth-register'})" class="text-md font-semibold hover:text-indigo-500 text-indigo-600" :title="$t('auth.create-account')">
        {{ $t('auth.create-account') }}
      </nuxt-link>
    </span>
    <form class="my-4 w-3/4 min-min-w-max-content space-y-2" @submit.prevent="submit">
      <field-username v-model="data.username" :field="modelField.username" :errors="errors.username" />
      <field-password v-model="data.password" :field="modelField.password" :errors="errors.password" />
      <div class="flex justify-end mx-auto text-center imp-my-4">
        <nuxt-link  :to="localePath({name: 'auth-forgot-password'})"
                    class="font-semibold hover:text-indigo-500 text-indigo-600 font-md m-sm:w-full my-auto italic space"
                    :title="$t('auth.forget-password')"
        >
          {{ $t('auth.forget-password') }}
        </nuxt-link>
      </div>
      <field-submit class="w-full">
        {{ $t('auth.login') }}
      </field-submit>
    </form>
  </section>
</template>

<script>
import accountMixins from "~/mixins/model/account"
import {setObjectKeysValue} from "~/lib/utils"

export default {
  name: "AuthLogin",

  mixins: [accountMixins],

  layout: "auth",
  transition: "auth",

  data () {
    return {
      data: {
        username: "",
        password: "",
      },
      errors: {
        username: [],
        password: [],
      },
    }
  },

  head () {
    const title = this.$t("pages.login.title")
    const description = this.$t("pages.login.description")
    return {
      title,
      meta: [
          { hid: "description", name: "description", content: description },
          { property: "og:title", content: title},
          { property: "og:description", content: description},
          { name: "twitter:card", content: description },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

  methods: {
    submit () {
      this.loading = true

      setObjectKeysValue(this.errors, [])

      this.$auth.loginWith("local", {data: this.data})
        .then(() => {
          // redirect to contribute page
          this.$router.push(this.localePath({ name: "contribute" }))
        })
        .catch(error => {
          this.responseError(error)
            .then(data => {
              console.log(data)
              data.username && (this.errors.username = data.username)
              data.password && (this.errors.password = data.password)
            })
        })
        .finally(() => { this.loading = false })
    }
  },
}
</script>


<style lang="scss" scoped>
.imp-my-4 {
  margin-top: 1em !important;
  margin-bottom: 1em !important;
}
</style>
