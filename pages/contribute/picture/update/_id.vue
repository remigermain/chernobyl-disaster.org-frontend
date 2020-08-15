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
      <lazy-admin-text :value="object.title" :field="fields.title" :errors="errors.title" />
      <lazy-admin-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
      <lazy-admin-select :value="object.event" :field="fields.event" :errors="errors.event" />
      <lazy-admin-image :value="object.picture" :field="fields.picture" :errors="errors.picture" />
      <admin-datetime :value="object.date" :field="fields.date" :errors="errors.date" />
      <lazy-admin-select :value="object.photographer" :field="fields.photographer" :errors="errors.photographer" />
    </template>
    <template v-slot:table-header>
      <th> {{ fields.langs.title.label }} </th>
      <th> {{ $t('admin.model.language') }} </th>
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
        </td>
      </tr>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "@/mixins/admin/update"
import Picture from "@/mixins/model/picture"

export default {
  name: "ContrubtePictureUpdate",

  mixins: [Update, Picture],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`picture/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error("") // TODO
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
      // remove date key if is empty
      if (form.get("date") === "") {
        form.delete("date")
      }
    },
  }

}
</script>
