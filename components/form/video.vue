<template>
  <div class="h-full block">
    <div class="flex items-center justify-center"
           :class="{'border-dashed border-2 border-gray-600': !value}"
    >
      <gallery-video v-if="value" :link="value" />
      <span v-else class="italic text-md text-gray-600">
        {{ $t('utils.empty') }}
      </span>
    </div>
    <form-text v-model="value" :field="field" :errors="errors" type="url" @input="$emit('input', $event)"/>
  </div>
</template>

<script>
import FieldMixins from "~/mixins/field"
export default {

  mixins: [FieldMixins],

}
</script>
