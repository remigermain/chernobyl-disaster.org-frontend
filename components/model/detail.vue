<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
      </h1>
      <div class="flex justify-end detail-btn">
        <button class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600" @click="toogleReport">
          {{ $t('global.report') }}
          <icon-send class=" w-24px text-white" />
        </button>
        <lazy-extra-nuxt-link :to="path"
                              class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600"
        >
          {{ $t('global.update') }}
          <icon-edit class=" w-24px text-white" />
        </lazy-extra-nuxt-link>
      </div>
    </div>
    <model-report :class="{'hidden': !showReport}" :uuid="model" @close="toogleReport" />
    <slot name="detail" />
  </div>
</template>

<script>
import iconEdit from "@/assets/svg/edit.svg"
import iconSend from "@/assets/svg/send.svg"

export default {

  components: {
    iconEdit,
    iconSend,
  },

  props: {
    path: {
      type: Object,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      showReport: false
    }
  },

  methods: {
    toogleReport () {
      this.showReport = !this.showReport
    },
  }

}
</script>

<style>
.detail-btn > * + * {
  margin-left: .5em;
}
</style>
