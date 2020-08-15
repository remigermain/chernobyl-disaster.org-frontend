<template>
  <div class="wrapper">
    <div class="w-full">
      <span class="text-4xl capitalize">
        {{ $t('global.translate') }}
      </span>
    </div>
    <div class="w-full flex flex-wrap">
      <div v-for="obj in object" :key="obj.language" class="flex flex-col p-2 shadow m-1">
        <slot :obj="obj" />
        <div>
          <span class="detail-item-title">
            {{ $t("model.global.language") }} :
          </span>
          <span class="detail-item-content">
            {{ getLang(obj.language) }}
          </span>
        </div>
      </div>
      <span v-if="object.length === 0" class="text-sm text-gray-500 italic">
        {{ empty }}
      </span>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    object: {
      type: Array,
      required: true
    }
  },


  methods: {
    getLang (value) {
      const v = this.$store.getters["model/langs"].find(t => t.value === value)
      return (v ? v.display_name : value)
    }
  }

}
</script>
