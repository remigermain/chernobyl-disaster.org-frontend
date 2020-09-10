<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
      </h1>
      <div class="flex justify-end detail-btn">
        <button class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600" @click="toogleReport">
          {{ $t('admin.label.report') }}
          <svg-icon name="send" class=" w-24px text-white" />
        </button>
        <extra-nuxt-link :to="path"
                         class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600"
                         :title="$t('tools.update')"
        >
          {{ $t('tools.update') }}
          <svg-icon name="edit" class=" w-24px text-white" />
        </extra-nuxt-link>
      </div>
    </div>
    <lazy-model-report :class="{'hidden': !showReport}" :uuid="model" @close="toogleReport" />
    <slot name="detail" />
  </div>
</template>

<script>
export default {

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

<style lang="scss">
.piture-detail {
  width: 600px;
}
.detail-items > * {
  margin-top: 1rem;
}
.detail-item-title {
  color: rgba(77, 77, 77, 0.5);
  font-style: italic;
  text-transform: capitalize;
}

.detail-item-content {
  font-style: italic
}

</style>
