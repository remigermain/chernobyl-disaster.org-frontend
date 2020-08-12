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
      <admin-text :field="fields.title" :errors="errors.title" />
      <admin-multi-select :field="fields.tags" :errors="errors.tags" />
      <admin-select :field="fields.event" :errors="errors.event" />
      <admin-image :field="fields.picture" :errors="errors.picture" />
      <admin-date :field="fields.date" :errors="errors.date" />
      <admin-select :field="fields.photographer" :errors="errors.photographer" />
    </template>
    <template v-slot:table-header>
      <th> {{ $t('model.picture.langs.title') }} </th>
      <th>
        {{ $t('global.language') }}
        <admin-error :errors="errors.langs" />
      </th>
      <th>
        {{ $t('model.actions') }}
      </th>
    </template>
    <template v-slot:table-body>
      <tr v-for="(val, idx) in langs" :key="val">
        <td>
          <admin-text class="border-none"
                      :prefix="prefixLang(idx)"
                      :label="false"
                      :field="fields.langs.title"
                      :action="false"
          />
        </td>
        <td>
          <admin-select class="border-none"
                        :prefix="prefixLang(idx)"
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
      </tr>
    </template>
  </model-form>
</template>

<script>
import picture from "@/mixins/model/picture"
import create from "@/mixins/admin/create"

export default {

  mixins: [
    create,
    picture
  ],

}
</script>
