<template>
  <div class="h-full block">
    <div :class="{'border-dashed border-2 border-gray-600 dashed-video': true}">
      <gallery-video-preview v-if="valueModel" :link="valueModel" :title="title" />
      <span v-else class="italic text-md text-gray-600 empty">
        {{ $t('word.empty') }}
      </span>
    </div>
    <admin-field-text v-model="valueModel" :field="field" :errors="errors" type="url" @input="$emit('input', $event)"/>
  </div>
</template>

<script>
import FieldMixins from "~/mixins/field"
export default {

  mixins: [FieldMixins],

  props: {
    title: {
      type: String,
      default: "title"
    }
  }

}
</script>

<style lang="scss" scoped>
.dashed-video > .empty {
  left:50%;
  top:50%;
  height:100%;
  width:100%;
  transform: translate(-50%, 50%);
  position:absolute;
}
</style>
