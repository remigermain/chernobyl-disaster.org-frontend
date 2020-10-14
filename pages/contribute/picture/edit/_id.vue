<template>
  <admin-form-picture :create="false" :object="object" />
</template>


<script>
import { convertImageUrl } from "~/lib/contribute"

export default {

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => store.getters["model/tag"](id))
        // convert profil
        response.data.picture && convertImageUrl(response.data.picture, app.$media)
        response.data.event = store.getters["model/event"](response.data.event)

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-picture'}))
      })
  },

  head () {
    const title = `${this.$t("menu-name.picture")} - ${this.$t("word.update")}`
    return {
      title,
      meta: [
          { property: "og:title", content: title},
          { name: "twitter:title", content: title },
          { name: "twitter:image:alt", content: title }
      ]
    }
  },

}
</script>
