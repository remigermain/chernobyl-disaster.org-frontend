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
      <lazy-admin-image :value="object.picture" :field="fields.picture" :errors="errors.picture" />
      <admin-datetime :value="object.date" :field="fields.date" :errors="errors.date" />
      <lazy-admin-select :value="object.photographer" :field="fields.photographer" :errors="errors.photographer" />
    </template>
    <template v-slot:form-lang>
      <model-card-lang v-for="(lang, idx) in object.langs" :key="lang.id" :title="langConv(lang.language)">
        <input class="hidden" :name="`${prefixLang(idx)}[id]`" :value="lang.id">
        <lazy-admin-text class="border-none"
                         :value="lang.title"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.title"
                         :action="false"
                         :errors="getErrorsIdx(errors.langs, idx, 'title')"
        />
        <lazy-admin-select class="border-none"
                           :value="lang.language"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx, 'language')"
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
        <lazy-admin-text class="border-none"
                         :prefix="prefixLang(idx)"
                         :field="fields.langs.title"
                         :action="false"
                         :inline="false"
                         :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'title')"
        />
        <lazy-admin-select class="border-none"
                           :prefix="prefixLang(idx)"
                           :field="fields.langs.language"
                           :action="false"
                           :errors="getErrorsIdx(errors.langs, idx + object.langs.length, 'language')"
        />
      </model-card-lang>
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
          throw Error("")
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
