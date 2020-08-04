<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
      </h1>
      <extra-nuxt-link :to="path"
                       class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600"
      >
        {{ $t('global.update') }}
        <icon-edit class=" w-24px text-white" />
      </extra-nuxt-link>
    </div>
    <slot name="detail" />
  </div>
</template>

<script>
import iconEdit from "@/assets/svg/edit.svg"
export default {

  components: {
    iconEdit
  },

  props: {
    path: {
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>
