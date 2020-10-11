<template>
  <div class="flex flex-col mt-2">
    <label class="flex justify-center items-center flex-col gap-y-2">
      <span class="text-lg leading-3 italic text-gray-700 font-medium dark:text-gray-200">
        {{ field.label }}:
      </span>
      <select v-model="valueModel" class="form-select block mt-1 bg-gray-400 bg-opacity-50 text-center">
        <option v-for="obj in field.choices" :key="obj.display_name" :value="obj.value">
          {{ obj.display_name }}
        </option>
      </select>
    </label>
    <lazy-admin-utils-error :errors="errors" />
  </div>
</template>

<script>
import FieldMixins from "~/mixins/field"
export default {

  mixins: [FieldMixins],

}
</script>
