<template>
  <admin-form-tag :create="false" :object="object" />
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  asyncData({ app, store, params, redirect }) {
    return app.$axios
      .get(`tag/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('error-server')
        }
        return { object: response.data }
      })
      .catch(error => {
        store.commit('ERROR_SERVER', error.message || error)
        return redirect(app.localePath({ name: 'contribute-tag' }))
      })
  },

  head() {
    const title = `${this.$t('menu-name.tag')} - ${this.$t('word.update')}`
    return {
      title,
      meta: [
        { property: 'og:title', content: title },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  }
}
</script>
