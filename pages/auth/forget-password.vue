<template>
  <section
    class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2
    border-l-8 rounded-t-lg border-l-gray-800 dark:border-l-indigo-700"
  >
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('authentication.forget-password') }}
    </h1>
    <span class="text-sm text-gray-700 dark:text-gray-200">
      {{ $t('word.or') }}
      <nuxt-link
        :to="localePath({ name: 'auth-login' })"
        class="text-md font-semibold hover:text-indigo-500 text-indigo-600"
        :title="$t('authentication.login')"
      >
        {{ $t('authentication.login') }}
      </nuxt-link>
    </span>
    <div class="text-sm text-gray-700">
      {{ $t('word.or') }}
      <nuxt-link
        :to="localePath({ name: 'auth-register' })"
        class="text-md font-semibold hover:text-indigo-500 text-indigo-600"
        :title="$t('authentication.create-account')"
      >
        {{ $t('authentication.create-account') }}
      </nuxt-link>
    </div>
    <form
      class="my-4 w-3/4 min-min-w-max-content space-y-2"
      @submit.prevent="submit"
    >
      <field-email v-model="data.email" :field="modelField.email" />
      <field-submit class="w-full submit">
        {{ $t('word.update') }}
      </field-submit>
    </form>
  </section>
</template>

<script>
import accountMixins from '~/mixins/model/account'
import { setObjectKeysValue } from '~/lib/utils'

export default {
  name: 'AuthResetPassword',

  mixins: [accountMixins],

  layout: 'auth',
  transition: 'auth',

  data() {
    return {
      data: {
        email: ''
      }
    }
  },

  head() {
    const title = this.$t('authentication.forget-password')
    const description = this.$t('description.forget-password')
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:card', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  },

  methods: {
    submit() {
      this.$store.commit('ON_LOADING', true)

      this.$axios
        .post('auth/password/reset/', this.data)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('error-server')
          }
          setObjectKeysValue(this.data, '')
          this.$router.push(this.localePath({ name: 'auth-login' }))
          this.$toast.success(response.data.detail)
        })
        .catch(error => {
          this.responseError(error)
        })
        .finally(() => {
          this.$store.commit('ON_LOADING', false)
        })
    }
  }
}
</script>
