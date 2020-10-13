<template>
  <div class="flex mb-4 flex-wrap -md:space-y-3">
    <span class="w-2/4 capitalize text-2xl -md:w-full">
      <svg-icon name="list" />
      {{ title }}
    </span>
    <field-search v-model="searchValue" role="search" @search="$emit('search')" @input="$emit('input', $event)" class="w-2/4 -md:w-full"/>
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
