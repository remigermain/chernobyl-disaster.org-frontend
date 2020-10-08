<template>
  <div class="flex mb-4">
    <div class="w-2/4 capitalize text-2xl flex items-center">
      <span>
        <svg-icon name="list" />
        {{ title }}
      </span>
    </div>
    <div class="w-2/4">
      <field-search v-model="searchValue" @search="$emit('search')" @input="$emit('input', $event)"/>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    value: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },

  data () {
    return {searchValue: ""}
  },

  watch: {
    searchValue(newValue, oldValue) {
      if (newValue !== oldValue && !newValue) {
        this.$emit('search')
      }
    }
  }

}
</script>
