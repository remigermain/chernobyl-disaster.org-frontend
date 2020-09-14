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
      <admin-datetime :value="object.date" :field="fields.date" :errors="errors.date" />
    </template>
    <template v-slot:form-lang>
      <!-- actual langs -->
      <model-card-lang v-for="(lang, idx) in object.langs" :key="lang.id" :lang="langConv(lang.language)">
        <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
        <lazy-admin-text :value="lang.title"
                         class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.title"
                         :action="false"
        />
        <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'title')" />
        <lazy-admin-select :value="lang.language"
                           class="border-none"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
        />
        <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'language')" />
        <lazy-admin-textarea :value="lang.description"
                             class="border-none"
                             :prefix="prefixLang(idx)"
                             :field="fields.langs.description"
                             :action="false"
                             :inline="false"
        />
        <lazy-admin-error :errors="getErrorsIdx(errors.langs, idx, 'description')" />
      </model-card-lang>
      <model-card-lang v-for="(lang, idx) in langs" :key="lang" :lang="$t('tools.new')">
        <template v-slot:header>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </template>
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx + object.langs.length)"
                         :field="fields.langs.title"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'title')"
        />
        <lazy-admin-select class="border-none"
                           :prefix="prefixLang(idx + object.langs.length)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'language')"
        />
        <lazy-admin-textarea class="border-none"
                             :prefix="prefixLang(idx + object.langs.length)"
                             :field="fields.langs.description"
                             :action="false"
                             :inline="false"
                             :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'description')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "@/mixins/admin/update"
import Event from "@/mixins/model/event"

export default {
  name: "ContrubteEventUpdate",

  mixins: [Update, Event],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`event/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-event"}))
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
