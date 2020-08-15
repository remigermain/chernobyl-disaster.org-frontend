<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
      </h1>
      <lazy-extra-nuxt-link :to="{name: `contribute-${model}-create`}"
                            class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600"
      >
        {{ $t('tools.create') }}
        <icon-plus class=" w-24px text-white" />
      </lazy-extra-nuxt-link>
    </div>
    <slot name="table" />
    <slot name="table-lang" />
  </div>
</template>

<script>
import iconPlus from "@/assets/svg/plus.svg"
export default {

  components: {
    iconPlus
  },

  props: {
    lang: {
      type: Boolean,
      default: true
    },
    model: {
      type: String,
      required: true
    }
  }

}
</script>
