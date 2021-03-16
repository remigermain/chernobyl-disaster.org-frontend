<template>
  <section
    class="bg-white shadow-md border py-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4 section-form space-y-2
    border-l-8 rounded-t-lg border-l-gray-800 dark:border-l-indigo-700"
  >
    <h1 class="font-bold text-gray-900 text-2xl capitalize">
      {{ $t('word.contact') }}
    </h1>
    <p
      class="text-base text-gray-900 w-9/12 p-2 italic text-opacity-50 leading-5 bg-gray-300 dark:bg-gray-700 dark:text-gray-300 rounded-lg -lg:w-1/3 -md:w-3/4"
    >
      {{ $t('description.contact') }}
    </p>
    <form class="my-4 mx-8 w-3/4 form space-y-2" @submit.prevent="submit">
      <field-email v-model="data.email" :field="email" :errors="errors.email" />
      <field-textarea
        v-model="data.message"
        :field="message"
        :errors="errors.message"
        :min="true"
      />
      <field-submit class="w-full mt-2">
        {{ $t('word.send') }}
      </field-submit>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Contact',

  layout: 'auth',
  transition: 'auth',

  data() {
    return {
      message: {
        label: this.$t('text.your-message'),
        name: 'message',
        required: true
      },
      email: {
        label: this.$t('authentication.email'),
        name: 'email',
        required: true
      },
      data: {
        email: this.$auth.loggedIn ? this.$auth.user.email : '',
        message: ''
      },
      errors: {
        message: [],
        email: []
      }
    }
  },

  head() {
    const title = this.$t('menu-name.contact')
    const description = this.$t('description.contact')
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
      this.errors = {
        message: [],
        email: []
      }

      this.$axios
        .post('contact/', this.data)
        .then(response => {
          if (response.status !== 201) {
            throw new Error('error-server')
          }
          this.$toast.success(this.$t('success-message.contact'))
          this.data = {
            email: '',
            message: ''
          }
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
