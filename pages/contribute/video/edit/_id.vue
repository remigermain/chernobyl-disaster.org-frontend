<template>
  <admin-form-video :create="false" :object="object" />
</template>


<script>
export default {

  validate ({params}) {
    return /^\d+$/.test(params.id)
  },

  asyncData ({app, store, params, redirect}) {
    return app.$axios.get(`video/${params.id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("error-server")
        }

        // convert tag
        response.data.tags = response.data.tags.map(id => store.getters["model/tag"](id))
        response.data.event = store.getters["model/event"](response.data.event)

        return {object: response.data}
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: 'contribute-video'}))
      })
  },
}
</script>
