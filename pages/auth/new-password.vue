<template>
  <section
    class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2
    border-l-8 rounded-t-lg border-l-gray-800 dark:border-l-indigo-700"
  >
    <h1 class="font-bold text-gray-900 text-2xl">
      {{ $t('authentication.new-password') }}
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
    <form
      class="my-4 w-3/4 min-min-w-max-content space-y-2"
      @submit.prevent="submit"
    >
      <field-password
        v-model="data.new_password1"
        :field="field.new_password1"
        :errors="errors.new_password1"
      />
      <field-password
        v-model="data.new_password2"
        :field="field.new_password2"
        :errors="errors.new_password2"
      />
      <field-submit class="w-full">
        {{ $t('authentication.change-password') }}
      </field-submit>
    </form>
  </section>
</template>

<script>
import { setObjectKeysValue } from '~/lib/utils'
import accountMixins from '~/mixins/model/account'

export default {
  name: 'AuthResetPassword',

  mixins: [accountMixins],

  layout: 'auth',

  validate({ query }) {
    return !!query.uid && !!query.token
  },

  transition: 'auth',

  data() {
    return {
      data: {
        new_password1: '',
        new_password2: ''
      },
      errors: {
        new_password1: [],
        new_password2: []
      },
      field: {
        new_password1: {
          label: this.$t('authentication.new-password'),
          name: 'new_password1',
          required: true
        },
        new_password2: {
          label: this.$t('authentication.comfirm-password'),
          name: 'new_password2',
          required: true
        }
      }
    }
  },

  head() {
    const title = this.$t('authentication.new-password')
    return {
      title,
      meta: [
        { property: 'og:title', content: title },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  },

  created() {
    /* merge parent model with current */
    this.new_password1 = { ...this.modelField.password, ...this.new_password1 }
    this.new_password2 = { ...this.modelField.password, ...this.new_password2 }
  },

  methods: {
    submit() {
      this.$store.commit('ON_LOADING', true)

      const data = {
        // add current data
        ...this.data,
        // add the uid key
        uid: this.$route.query.uid,
        // add the token keys
        token: this.$route.query.token
      }

      // reset error
      setObjectKeysValue(this.errors, [])

      this.$axios
        .post('auth/password/reset/confirm/', data)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('error-server')
          }
          // reset value
          setObjectKeysValue(this.data, '')
          this.$toast.success(this.$t('success-message.password-changed'))

          this.$router.push(this.localePath({ name: 'auth-login' }))
        })
        .catch(error => {
          this.responseError(error).then(data => {
            data.new_password1 &&
              (this.errors.new_password1 = data.new_password2)
            data.new_password2 &&
              (this.errors.new_password2 = data.new_password2)
            if (data.uid || data.token) {
              this.$toast.error(
                this.$t('error-message.cant-set-the-new-password')
              )
            }
          })
        })
        .finally(() => {
          this.$store.commit('ON_LOADING', false)
        })
    }
  }
}
</script>
