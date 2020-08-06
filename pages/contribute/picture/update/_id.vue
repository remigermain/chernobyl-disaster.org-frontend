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
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </bread-crumb>
    </template>
    <template v-slot:form>
      <!-- all field -->
      <field-text :value="object.title" :field="fields.title" :errors="errors.title" />
      <field-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
      <field-select :value="object.event" :field="fields.event" :errors="errors.event" />
      <field-image :value="object.picture" :field="fields.picture" :errors="errors.picture" />
      <field-select :value="object.photographer" :field="fields.photographer" :errors="errors.photographer" />
      <!-- end field -->
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
      <!-- actual langs -->
      <tr v-for="(lang, idx) in object.langs" :key="lang.id" class="text-center">
        <td class="text-center">
          <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
          <field-text :value="lang.title"
                      class="border-none"
                      :prefix="prefixLang(idx)"
                      :label="false"
                      :field="fields.langs.child.children.title"
                      :action="false"
          />
        </td>
        <td>
          <field-select :value="lang.language"
                        class="border-none"
                        :prefix="prefixLang(idx)"
                        :label="false"
                        :field="fields.langs.child.children.language"
                        :action="false"
          />
        </td>
        <td />
      </tr>
      <!-- end actual langs -->
      <!-- extra langs -->
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <field-text class="border-none"
                      :prefix="prefixLang(idx + object.langs.length)"
                      :label="false"
                      :field="fields.langs.child.children.title"
                      :action="false"
          />
        </td>
        <td>
          <field-select class="border-none"
                        :prefix="prefixLang(idx + object.langs.length)"
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
        <!-- end extra langs -->
      </tr>
    </template>
  </model-form>
</template>

<script>
import modelsDetail from "@/mixins/model/update"
//import _ from "lodash"

export default {

  mixins: [modelsDetail],

  async asyncData ({params, redirect, $axios, app}) {
    // get options information form
    const options = await $axios.options(`picture/${params.id}/`)
    // get objects
    const response = await $axios.get(`picture/${params.id}/`)

    // check if all request is ok
    if (options.status != 200 || response.status != 200) {
      this.$i18nToast().error(this.$t("global.error"))
      // redirect to parent objects
      return redirect(app.$i18n.localePath({name: "contribute-picture"}))
    }
    return {
      fields: options.data.actions.PUT,
      object: response.data,
    }
  },

  data () {
    return {
      model: "picture",
    }
  },

  methods: {
    assignFormData (form) {
      // remove picture key if is empty
      if (form.get("picture") === "") {
        form.delete("picture")
      }
    },
  }

}
</script>
