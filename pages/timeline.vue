<template>
  <div class="grid-timeline">
    <timeline-list :class="{'active': active}" :object="object" @select="setCurrent" />
    <nuxt-child :current="current" />
  </div>
</template>

<script>
import timelineMixins from "@/mixins/page/timeline"
import { timelineElement } from "@/lib/timeline"

export default {
  name: "Timeline",

  mixins: [timelineMixins],

  async asyncData({ app, route }) {
    return app.$axios.get("event/?no_page=true")
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        // change date string to Date object
        const result = response.data.map(el => {
          el.date = new Date(el.date)
          return el
        })

        return {
          object: result,
          current: timelineElement(result, route.params.slug)
        }
      })
  },

  data () {
    return {
      active: false
    }
  },

  methods: {
    setCurrent (obj) {
      this.current = obj
      //this.redirect({name: "timeline-id", params: {id: this.i18nAttr(this.current, "title").replace(" ", "_")}})
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
