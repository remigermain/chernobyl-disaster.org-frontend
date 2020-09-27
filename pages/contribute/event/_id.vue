<template>
  <lazy-model-detail :path="pathUpdate.path" :model="model.name" :object-id="object.id">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:detail>
      <model-field :field="fields.title" :value="object.title" />
      <model-field :field="fields.date" :value="object.date" />
      <model-tags :tags="object.tags" />
      <model-langs :object="object.langs">
        <template slot-scope="{obj}">
          <div class="flex flex-col">
            <h2 class="timeline-title text-4xl -sm:text-lg capitalize italic text-center">
              {{ obj.title }}
            </h2>
            <p class="timeline-text p-4 leading-6 whitespace-pre-line" v-html="$sanitizeHtml(obj.description)"/>
          </div>
        </template>
      </model-langs>
      <div class="extra">
        <timeline-extra :object="object" />
      </div>
    </template>
  </lazy-model-detail>
</template>

<script>
import detail from "@/mixins/admin/detail"
import event from "@/mixins/model/event"

export default {
  name: "ContrubteEventDetail",

  mixins: [
    detail,
    event
  ],

  asyncData ({ params, $axios, app, redirect }) {
    return $axios.get(`event/${params.id}/?contribute=true`)
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        return {
          object: response.data,
        }
      })
      .catch(() => {
        return redirect(app.i18n.localePath({name: "contribute-event"}))
      })
  },

}
</script>


<style lang="scss" scoped>
.event-detail {
  width: 100%;
  min-height: 300px;
}

@media screen and (min-width: 850px){
  .extra {
    width: 100%;
    height: 200px;
  }
}
</style>
