<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
      </h1>
      <div class="flex justify-end detail-btn">
        <button class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600" @click="activeReport">
          {{ $t('global.report') }}
          <icon-send class=" w-24px text-white" />
        </button>
        <extra-nuxt-link :to="path"
                         class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600"
        >
          {{ $t('global.update') }}
          <icon-edit class=" w-24px text-white" />
        </extra-nuxt-link>
      </div>
      <div class="bg-gray-800 absolute bg-opacity-75 top-0 left-0 h-screen w-screen flex justify-center items-center"
           :class="{'hidden': !showReport}"
      >
        <div class="bg-white shadow rounded-md p-4 w-2/4 relative">
          <icon-circle-x class="absolute top-0 right-0 m-4 cursor-pointer w-8 hover:text-purple-900" @click="showReport = false" />
          <form @submit.prevent="submit">
            <admin-textarea v-model="message" :inline="false" :field="{label: 'report', required: true, help: 'erfer'}"/>
            <button type="submit" class="p-2 bg-blue-700 rounded hover:bg-blue-900 w-full text-white">
              {{ $t('global.send') }}
            </button>
          </form>
        </div>
      </div>
    </div>
    <slot name="detail" />
  </div>
</template>

<script>
import iconEdit from "@/assets/svg/edit.svg"
import iconSend from "@/assets/svg/send.svg"
import iconCircleX from "@/assets/svg/circle-x.svg"

export default {

  components: {
    iconEdit,
    iconSend,
    iconCircleX
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
      message: "",
      showReport: false
    }
  },

  methods: {
    activeReport () {
      this.showReport = !this.showReport
    },
    submit () {
      this.loading = true

      const data = {
        object_id: this.$route.params.id,
        uuid: this.model,
        message: this.message
      }
      this.$axios.post("issue/", data)
        .then(response => {
          if (response.status != 201) {
            throw Error("") //TODO
          }
          this.showReport = false
          this.message = ""
          this.$i18nToast().success(this.$t("global.report-ok"))
        })
        .catch(() => {
          this.$i18nToast().error(this.$t("global.report-ko"))
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

}
</script>

<style>
.detail-btn > * + * {
  margin-left: .5em;
}
</style>
