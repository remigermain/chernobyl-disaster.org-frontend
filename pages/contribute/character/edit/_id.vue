<template>
  <admin-form-character :create="false" :object="object" />
</template>

<script>
import { convertImageUrl } from '~/lib/contribute'

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  asyncData({ app, store, params, redirect }) {
    return app.$axios
      .get(`character/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('error-server')
        }

        // convert tag
        response.data.tags = response.data.tags.map(id =>
          store.getters['model/tag'](id)
        )
        // convert profil
        response.data.profil &&
          convertImageUrl(response.data.profil, app.$media)

        return { object: response.data }
      })
      .catch(error => {
        store.commit('ERROR_SERVER', error.message || error)
        return redirect(app.localePath({ name: 'contribute-character' }))
      })
  },

  head() {
    const title = `${this.$t('menu-name.character')} - ${this.$t(
      'word.update'
    )}`
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
