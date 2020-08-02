<template>
  <div class="p-3 flex justify-between items-center border-b border-gray-700 border-opacity-50">
    <label class="text-xl capitalize italic w2/4 text-gray-700">
      {{ field.label }} :
    </label>
    <div class="w-2/4 flex items-center">
      <template v-if="isFieldImage">
        <input type="file" accept="image/*" :required="field.required">
      </template>
      <template v-else-if="isFieldFile">
        <input type="file" :required="field.required">
      </template>
      <template v-else-if="isFieldBool">
        <input type="checkbox" :required="field.required">
      </template>
      <template v-else-if="isFieldSelect">
        <select :multiple="isManyField" :class="{'field-select-multiple': isManyField}" :required="field.required">
          <option v-for="obj in field.choices" :key="obj.id" :value="obj.value">
            {{ obj.value }}
          </option>
          <option>
            <span v-if="!field.choices" class="text-md italic text-gray-500">
              -- {{ $t('global.empty') }} --
            </span>
          </option>
        </select>
        <!--
        <extra-nuxt-link :to="{name: `contribute-${field.model}-create`}" class="ml-2">
          <icon-plus class=" text-green-700" />
        </extra-nuxt-link>
        <extra-nuxt-link :to="{name: `contribute-${field.model}-update`}" class="ml-2">
          <icon-edit class=" text-yellow-700" />
        </extra-nuxt-link>
        <button>
          <icon-trash class=" text-red-700" />
        </button>
        -->
      </template>
      <template v-else>
        <input type="text"
               class="bg-gray-200 rounded p-2 block placeholder-opacity-50"
               placeholder="title"
               :maxlength="field.max_length"
               :required="field.required"
        >
      </template>
    </div>
  </div>
</template>

<script>
//import iconPlus from "@/assets/svg/plus.svg"
//import iconEdit from "@/assets/svg/edit.svg"
//import iconTrash from "@/assets/svg/trash.svg"
export default {
  components: {
    //iconPlus,
    //iconEdit,
    //iconTrash
  },
  props: {
    field: {
      type: Object,
      required: true
    }
  },
    data () {
      return {
        object: {},
        serializers: {
          Field: "field",
          ManyField: "many field",
          BooleanField: "boolean",
          NullBooleanField: "boolean",
          CharField: "string",
          UUIDField: "string",
          URLField: "url",
          EmailField: "email",
          RegexField: "regex",
          SlugField: "slug",
          IntegerField: "integer",
          FloatField: "float",
          DecimalField: "decimal",
          DateField: "date",
          DateTimeField: "datetime",
          TimeField: "time",
          ChoiceField: "choice",
          MultipleChoiceField: "multiple choice",
          FileField: "file upload",
          ImageField: "image upload",
          ListField: "list",
          DictField: "nested object",
          Serializer: "nested object",
        }
      }
  },

  computed: {
    isFieldBool () {
      return this.field.type === this.serializers.BooleanField
    },
    isFieldFile () {
      return this.field.type === this.serializers.FileField
    },
    isFieldImage () {
      return this.field.type === this.serializers.ImageField
    },
    isFieldMultiChoice () {
      return this.field.type === this.serializers.MultipleChoiceField
    },
    isFieldChoice () {
      return this.field.type === this.serializers.ChoiceField
    },
    isFieldSelect () {
      return this.isFieldChoice || this.isFieldMultiChoice || this.isFieldForeinKey || this.isManyField
    },
    isFieldUrl () {
      return this.field.type === this.serializers.URLField
    },
    isFieldForeinKey  () {
      return this.field.type === this.serializers.Field
    },
    isManyField  () {
      return this.field.type === this.serializers.ManyField
    }
  }

}
</script>

<style>
.field-select-multiple {
  height: auto;
  min-height: 200px;
}
</style>
