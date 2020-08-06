<template>
  <model-form @submit="submit" @add-extra="addLang">
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
      <field-text :field="fields.title" :errors="errors.title" />
      <field-multi-select :field="fields.tags" :errors="errors.tags" />
      <field-select :field="fields.event" :errors="errors.event" />
      <field-image :field="fields.picture" :errors="errors.picture" />
      <field-select :field="fields.photographer" :errors="errors.photographer" />
    </template>
    <template v-slot:table-header>
      <th> title </th>
      <th>
        language
        <field-error :errors="errors.langs" />
      </th>
      <th>
        {{ $t('global.actions') }}
      </th>
    </template>
    <template v-slot:table-body>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <field-text class="border-none"
                      :prefix="prefixLang(idx)"
                      :label="false"
                      :field="fields.langs.child.children.title"
                      :action="false"
          />
        </td>
        <td>
          <field-select class="border-none"
                        :prefix="prefixLang(idx)"
                        :label="false"
                        :field="fields.langs.child.children.language"
                        :action="false"
          />
        </td>
        <td>
          <field-action :add="false"
                        :edit="false"
                        :deleted="true"
                        :field="fields.langs.child.children.language"
                        @delete="deleteLang(idx)"
          />
        </td>
      </tr>
    </template>
  </model-form>
</template>

<script>
import modelCreate from "@/mixins/model/create"
//import _ from "lodash"

export default {

  mixins: [modelCreate],

  async asyncData ({redirect, $axios, app}) {
    // get options information form
    const response = await $axios.options("picture/")

    // check if all request is ok
    if (response.status != 200) {
      this.$i18nToast().error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      fields: response.data.actions.POST,
    }
  },

  data () {
    return {
      model: "picture",
    }
  },

}
</script>
