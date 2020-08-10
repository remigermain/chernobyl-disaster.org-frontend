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
      <admin-text :value="object.title" :field="fields.title" :errors="errors.title" />
      <admin-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
      <admin-select :value="object.event" :field="fields.event" :errors="errors.event" />
      <admin-image :value="object.picture" :field="fields.picture" :errors="errors.picture" />
      <admin-date :value="object.date" :field="fields.date" :errors="errors.date" />
      <admin-select :value="object.photographer" :field="fields.photographer" :errors="errors.photographer" />
    </template>
    <template v-slot:table-header>
      <th> title </th>
      <th>
        language
        <admin-error :errors="errors.langs" />
      </th>
      <th>
        {{ $t('global.actions') }}
      </th>
    </template>
    <template v-slot:table-body>
      <!-- actual langs -->
      <tr v-for="(lang, idx) in object.langs" :key="lang.id" class="text-center rounded-b-lg">
        <td class="text-center">
          <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
          <admin-text :value="lang.title"
                      class="border-none"
                      :prefix="prefixLang(idx)"
                      :label="false"
                      :field="fields.langs.title"
                      :action="false"
          />
        </td>
        <td>
          <admin-select :value="lang.language"
                        class="border-none"
                        :prefix="prefixLang(idx)"
                        :label="false"
                        :field="fields.langs.language"
                        :action="false"
          />
        </td>
        <td />
      </tr>
      <!-- end actual langs -->
      <!-- extra langs -->
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <admin-text class="border-none"
                      :prefix="prefixLang(idx + object.langs.length)"
                      :label="false"
                      :field="fields.langs.title"
                      :action="false"
          />
        </td>
        <td>
          <admin-select class="border-none"
                        :prefix="prefixLang(idx + object.langs.length)"
                        :label="false"
                        :field="fields.langs.language"
                        :action="false"
          />
        </td>
        <td>
          <admin-action :add="false"
                        :edit="false"
                        :deleted="true"
                        :field="fields.langs.language"
                        @delete="deleteLang(idx)"
          />
        </td>
        <!-- end extra langs -->
      </tr>
    </template>
  </model-form>
</template>

<script>
import Update from "@/mixins/model-view/update"
import Picture from "@/mixins/model/picture"
//import _ from "lodash"

export default {

  mixins: [Update, Picture],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error(app.i18n.t("global.server-error"))
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-picture"}))
      })
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
