<template>
  <model-form @submit="submit"
              @add-extra="addExtra"
              @redirect-list="redirectToDetail"
              @redirect-create="redirectToCreate"
  >
    <template v-slot:label>
      {{ model }}
    </template>
    <template v-slot:breadcrumbs>
      <bread-crumb>
        <extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </extra-nuxt-link>
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </bread-crumb>
    </template>
    <template v-slot:form>
      <field-text v-model="data.title" :field="fields.title" :errors="errors.title" />
      <field-multi-select v-model="data.tags" :field="fields.tags" :errors="errors.tags" />
      <field-select v-model="data.event" :field="fields.event" :errors="errors.event" />
      <field-image :value="object.picture" :field="fields.picture" :errors="errors.picture" @change="changePicture" />
      <field-select v-model="data.photographer" :field="fields.photographer" :errors="errors.photographer" />
    </template>
    <template v-slot:table-header>
      <th> title </th>
      <th>
        language
        <field-error :errors="errors.langs" />
      </th>
    </template>
    <template v-slot:table-body>
      <tr v-for="lang in object.langs" :key="lang.id"  class="text-center">
        <td class="text-center">
          <field-text v-model="lang.title" class="border-none" :label="false" :field="fields.langs.child.children.title" :action="false" />
        </td>
        <td>
          <field-select v-model="lang.language" class="border-none" :label="false" :field="fields.langs.child.children.language" :action="false" />
        </td>
      </tr>
      <tr v-for="(obj, idx) in dataExtra.langs" :key="idx">
        <td>
          <field-text v-model="obj.title" class="border-none" :label="false" :field="fields.langs.child.children.title" :action="false" />
        </td>
        <td>
          <field-select v-model="obj.language" class="border-none" :label="false" :field="fields.langs.child.children.language" :action="false" />
        </td>
      </tr>
    </template>
  </model-form>
</template>

<script>
import modelsDetail from "@/mixins/model/update"
export default {

  mixins: [modelsDetail],

  async asyncData ({params, redirect, $axios, app}) {
    // get options information form
    const options = await $axios.options(`picture/${params.id}/`)
    // get objects
    const response = await $axios.get(`picture/${params.id}/`)

    // check if all request is ok
    if (options.status != 200 || response.status != 200) {
      this.$toat.error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      fields: options.data.actions.PUT,
      object: response.data,
      data: {
        title: response.data.title,
        tags: response.data.tags,
        event: response.data.event,
        photographer: response.data.photographer,
        langs: response.data.langs
      },
    }
  },

  data () {
    return {
      objectLang: {
        title: "",
        language: ""
      },
      model: "picture",
      dataExtra: {
        langs: [],
      },
      file: {
        picture: null
      }
    }
  },

  methods: {
    changePicture (value) {
      this.file.picture = value
    },
        assignFormExtraData (form) {
      form.append("picture", this.file.picture)
    }
  }

}
</script>
