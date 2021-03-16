<template>
  <section
    class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2
    border-l-8 rounded-t-lg border-l-gray-800 dark:border-l-indigo-700"
  >
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('authentication.login') }}
    </h1>
    <span class="text-sm text-gray-700 dark:text-gray-200">
      {{ $t('word.or') }}
      <nuxt-link
        :to="localePath({ name: 'auth-register' })"
        class="text-md font-semibold hover:text-indigo-500 text-indigo-600"
        :title="$t('authentication.create-account')"
      >
        {{ $t('authentication.create-account') }}
      </nuxt-link>
    </span>
    <form
      class="my-4 w-3/4 min-min-w-max-content space-y-2"
      @submit.prevent="submit"
    >
      <field-username
        v-model="data.username"
        :field="modelField.username"
        :errors="errors.username"
      />
      <field-password
        v-model="data.password"
        :field="modelField.password"
        :errors="errors.password"
      />
      <div class="flex justify-end mx-auto text-center imp-my-4">
        <nuxt-link
          :to="localePath({ name: 'auth-forget-password' })"
          class="font-semibold hover:text-indigo-500 text-indigo-600 font-md m-sm:w-full my-auto italic space"
          :title="$t('authentication.forget-password')"
        >
          {{ $t('authentication.forget-password') }}
        </nuxt-link>
      </div>
      <field-submit class="w-full">
        {{ $t('authentication.login') }}
      </field-submit>
    </form>
  </section>
</template>

<script>
import accountMixins from '~/mixins/model/account'
import { setObjectKeysValue } from '~/lib/utils'

export default {
  name: 'AuthLogin',

  mixins: [accountMixins],

  layout: 'auth',
  transition: 'auth',

  data() {
    return {
      data: {
        username: '',
        password: ''
      },
      errors: {
        username: [],
        password: []
      }
    }
  },

  head() {
    const title = this.$t('authentication.login')
    const description = this.$t('description.login')
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

      setObjectKeysValue(this.errors, [])

      this.$auth
        .loginWith('local', { data: this.data })
        .then(() => {
          // redirect to contribute page
          this.$router.push(this.localePath({ name: 'contribute' }))
        })
        .catch(error => {
          this.responseError(error).then(data => {
            data.username && (this.errors.username = data.username)
            data.password && (this.errors.password = data.password)
          })
        })
        .finally(() => {
          this.$store.commit('ON_LOADING', false)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.imp-my-4 {
  margin-top: 1em !important;
  margin-bottom: 1em !important;
}
</style>
