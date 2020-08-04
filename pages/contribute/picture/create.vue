<template>
  <model-form @submit="submit"
              @add-extra="addLang"
              @no-redirect="redirectToUpdate"
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
        {{ pathCreate.label }}
      </bread-crumb>
    </template>
    <template v-slot:form>
      <field-text v-model="data.title" :field="fields.title" :errors="errors.title" />
      <field-multi-select v-model="data.tags" :field="fields.tags" :errors="errors.tags" />
      <field-select v-model="data.event" :field="fields.event" :errors="errors.event" />
      <field-image :field="fields.picture" :errors="errors.picture" @change="changePicture" />
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
      <tr v-for="(obj, idx) in data.langs" :key="idx">
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
import modelCreate from "@/mixins/model/create"
export default {

  mixins: [modelCreate],

  async asyncData ({redirect, $axios, app}) {
    // get options information form
    const response = await $axios.options("picture/")

    // check if all request is ok
    if (response.status != 200) {
      this.$toat.error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      fields: response.data.actions.POST,
    }
  },

  data () {
    return {
      objectLang: {
        title: "",
        language: ""
      },
      model: "picture",
      data: {
        title: "",
        tags: [],
        event: "",
        photographer: "",
        langs: []
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
    },
    addLang () {
      this.data.langs.push({...this.objectLang})
    }
  }

}
</script>
