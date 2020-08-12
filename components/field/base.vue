<template>
  <div class="flex">
    <slot name="icon" />
    <label class="w-full text-gray-700 text-sm font-bold mb-2 capitalize">
      <slot name="label" />
      <slot name="input" />
    </label>
    <lazy-admin-help v-if="label && active" :field="field" />
    <lazy-admin-error :errors="errors" />
  </div>
</template>

<script>
import FieldMixins from "@/mixins/admin/field"
export default {

  mixins: [FieldMixins],

  props: {
    type: {
      type: String,
      default: "text"
    }
  }

}
</script>
