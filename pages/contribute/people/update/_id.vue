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
      <lazy-admin-text :value="object.name" :field="fields.name" :errors="errors.name" />
      <lazy-admin-date :value="object.born" :field="fields.born" :errors="errors.born" />
      <lazy-admin-date :value="object.death" :field="fields.death" :errors="errors.death" />
      <lazy-admin-image :value="object.profil" :field="fields.profil" :errors="errors.profil" />
      <lazy-admin-url :value="object.wikipedia" :field="fields.wikipedia" :errors="errors.wikipedia" />
      <lazy-admin-multi-select :value="object.tags" :field="fields.tags" :errors="errors.tags" />
    </template>
    <template v-slot:form-lang>
      <model-card-lang v-for="(lang, idx) in object.langs" :key="lang.id" :title="langConv(lang.language)">
        <template v-slot:header>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </template>
        <lazy-admin-select class="border-none"
                           :value="lang.biography"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx, 'language')"
        />
        <lazy-admin-text class="border-none"
                         :value="lang.language"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.biography"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'biography')"
        />
      </model-card-lang>

      <model-card-lang v-for="(lang, idx) in langs" :key="lang" :title="$t('tools.new')">
        <template v-slot:header>
          <lazy-admin-action :add="false"
                             :edit="false"
                             :deleted="true"
                             :field="fields.langs.language"
                             @delete="deleteLang(idx)"
          />
        </template>
        <lazy-admin-select class="border-none"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'language')"
        />
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.biography"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'biography')"
        />
      </model-card-lang>
    </template>
  </lazy-model-form>
</template>

<script>
import Update from "@/mixins/admin/update"
import Document from "@/mixins/model/people"

export default {
  name: "ContrubteDocumentUpdate",

  mixins: [Update, Document],

  asyncData ({params, redirect, $axios, app}) {
    return $axios.get(`people/${params.id}/`)
      .then(response => {
        if (response.status != 200) {
          throw Error("")
        }
        return { object: response.data }
      })
      .catch(() => {
        return redirect(app.localePath({name: "contribute-people"}))
      })
  },

  methods: {
    assignFormData (form) {
      if (form.get("death") === "") {
        form.delete("death")
      }
      if (form.get("born") === "") {
        form.delete("born")
      }
      if (form.get("profil") === "") {
        form.delete("profil")
      }
    },
  }

}
</script>
