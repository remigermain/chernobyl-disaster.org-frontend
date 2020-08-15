<template>
  <lazy-model-form @submit="submit" @add-extra="addLang">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-bread-crumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </lazy-bread-crumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :value="object.name" :field="fields.name" :errors="errors.name" />
    </template>
    <template v-slot:table-header>
      <th> {{ $t('model.tag.langs.name') }} </th>
      <th>
        {{ $t('global.language') }}
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
          <lazy-admin-text :value="lang.name"
                           class="border-none"
                           :prefix="prefixLang(idx)"
                           :label="false"
                           :field="fields.langs.name"
                           :action="false"
          />
        </td>
        <td>
          <lazy-admin-select :value="lang.language"
                             class="border-none"
                             :prefix="prefixLang(idx)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
        </td>
        <td />
      </tr>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <lazy-admin-text class="border-none"
                           :prefix="prefixLang(idx + object.langs.length)"
                           :label="false"
                           :field="fields.langs.name"
                           :action="false"
          />
        </td>
        <td>
          <lazy-admin-select class="border-none"
                             :prefix="prefixLang(idx + object.langs.length)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
        </td>
        <td>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </td>
      </tr>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "@/mixins/admin/update"
import Tag from "@/mixins/model/tag"

export default {
  name: "ContrubteTagUpdate",

  mixins: [Update, Tag],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`tag/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-tag"}))
      })
  },
}
</script>
