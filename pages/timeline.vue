<template>
  <div class="grid-timeline">
    <lazy-timeline-list :class="{'active': active}" :object="object" @select="setCurrent" />
    <nuxt-child :current="current" />
  </div>
</template>

<script>
import { timelineElement } from "~/lib/timeline"
import { sanitizeHtml, removeHtml } from "~/lib/sanitize"
import { convertImageUrl } from "~/lib/contribute"

export default {
  name: "Timeline",
  transition: "timeline",

  asyncData({ app, route, store, redirect }) {

    if (store.getters["timeline/has_populate"] && app.$auth.loggedIn) {
        return {
          object: store.getters["timeline/events"],
          current: timelineElement(store.getters["timeline/events"], route.params.slug)
        }
    }
    return app.$axios.get("event/?no_page=true")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        // change date string to Date object
        response.data.forEach(el => {
          // convert to Date Object
          el.date.date = new Date(el.date.date)
          // sanitize html
          el.langs.forEach(obj => {
            obj.description = sanitizeHtml(obj.description)
            obj._description = removeHtml(obj.description) // for meta
          })
          // convert picture
          el.pictures.forEach(pic => { convertImageUrl(pic.picture, app.$media) })
          return el
        })
        store.commit("timeline/EVENTS", response.data)
        return {
          object: response.data,
          current: timelineElement(response.data, route.params.slug)
        }
      })
      .catch(error => {
        store.commit("ERROR_SERVER", error.message || error)
        return redirect(app.localePath({name: "index"}))
      })
  },

  data () {
    return {
      active: false,
    }
  },

  methods: {
    setCurrent (obj) {
      this.current = obj
    }
  },
}
</script>

<style lang="scss" scoped>
.grid-timeline {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 100px 1fr 200px;
  height: 100%;
  gap: .5em .5em;
}

@media screen and (max-width: 850px){
  .grid-timeline {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
  }

}
</style>
