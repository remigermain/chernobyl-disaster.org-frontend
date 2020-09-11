<template>
  <lazy-model-form @submit="submit" @add-extra="addLang">
    <template v-slot:label>
      {{ model.label }}
    </template>
    <template v-slot:breadcrumbs>
      <lazy-contribute-breadcrumb>
        <lazy-extra-nuxt-link :to="pathList.path">
          {{ pathList.label }}
        </lazy-extra-nuxt-link>
        {{ pathUpdate.label }}
        {{ $route.params.id }}
      </lazy-contribute-breadcrumb>
    </template>
    <template v-slot:form>
      <lazy-admin-text :value="object.title" :field="fields.title" :errors="errors.title" />
      <lazy-admin-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
      <lazy-admin-select :value="object.event" :field="fields.event" :errors="errors.event" />
      <lazy-admin-url :value="object.video" :field="fields.video" :errors="errors.video" />
      <admin-datetime :value="object.date" :field="fields.date" :errors="errors.date" />
    </template>
    <template v-slot:table-header>
      <th> {{ fields.langs.title.label }} </th>
      <th> {{ $t('utils.language') }} </th>
      <th> {{ $t('utils.actions') }} </th>
    </template>
    <template v-slot:table-body>
      <!-- actual langs -->
      <tr v-for="(lang, idx) in object.langs" :key="lang.id" class="text-center rounded-b-lg">
        <td class="text-center">
          <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
          <lazy-admin-text :value="lang.title"
                           class="border-none"
                           :prefix="prefixLang(idx)"
                           :label="false"
                           :field="fields.langs.title"
                           :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'title')" />
        </td>
        <td>
          <lazy-admin-select :value="lang.language"
                             class="border-none"
                             :prefix="prefixLang(idx)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        </td>
        <td />
      </tr>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <lazy-admin-text class="border-none"
                           :prefix="prefixLang(idx + object.langs.length)"
                           :label="false"
                           :field="fields.langs.title"
                           :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'title')" />
        </td>
        <td>
          <lazy-admin-select class="border-none"
                             :prefix="prefixLang(idx + object.langs.length)"
                             :label="false"
                             :field="fields.langs.language"
                             :action="false"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        </td>
        <td>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
          <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        </td>
      </tr>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "@/mixins/admin/update"
import Video from "@/mixins/model/video"

export default {
  name: "ContrubteVideoUpdate",

  mixins: [Update, Video],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`video/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-video"}))
      })
  },

  methods: {
    assignFormData (form) {
      // remove date key if is empty
      if (form.get("date") === "") {
        form.delete("date")
      }
    },
  }

}
</script>
