<template>
  <span>
    <span class="detail-item-title">
      {{ $t("admin.field.tags") }} :
    </span>
    <span v-if="tags.length" class="flex flex-wrap mt-2">
      <span v-for="id in tags" :key="id" class="rounded-l-full rounded-r-full bg-blue-700 text-gray-400 text-sm py-1 px-3">
        {{ getTag(id).display_name }}
      </span>
    </span>
    <span v-else class="text-sm text-gray-500 italic">
      {{ empty }}
    </span>
  </span>
</template>

<script>
export default {

  props: {
    tags: {
      type: Array,
      required: true,
    }
  },

  methods: {
    getTag (idx) {
      return this.$store.getters["model/tags"].find(t => t.value === idx)
    }
  }

}
</script>
