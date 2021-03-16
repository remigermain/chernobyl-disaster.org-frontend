<template>
  <admin-form-event :create="false" :object="object" />
</template>

<script>
import { convertFromDate } from '~/lib/contribute'

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  asyncData({ app, store, params, redirect }) {
    return app.$axios
      .get(`event/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('error-server')
        }
        // convert tag
        response.data.tags = response.data.tags.map(id => {
          return store.getters['model/tag'](id)
        })
        response.data.date = convertFromDate(response.data.date)
        return { object: response.data }
      })
      .catch(error => {
        store.commit('ERROR_SERVER', error.message || error)
        return redirect(app.localePath({ name: 'contribute-event' }))
      })
  },

  head() {
    const title = `${this.$t('menu-name.event')} - ${this.$t('word.update')}`
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
