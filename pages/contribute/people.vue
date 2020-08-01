<template>
  <div class="wrapper">
    <h1 class="text-3xl capitalize">
      {{ $t('pages.contribute.people.people-models') }}
    </h1>
    <button class="px-2 py-2 bg-blue-800 text-white rounded-md">
      {{ $t('global.create') }}
      <icon-plus />
    </button>

    <div class="flex flex-col justify-center items-center h-inherit">
      <table-models :datas="listData"
                    :fields="fields"
                    @change="change"
      />
    </div>
  </div>
</template>

<script>
import iconPlus from "@/assets/svg/plus.svg"
export default {
  components: {
    iconPlus
  },
  async asyncData({ app }) {
    const response = await app.$axios.get("people/")
    return {
      datas: (response ? response.data : [])
    }
  },
  data () {
    return {
      listData: [],
      fields: [
        {field: "id", label: "id", type: Number},
        {field: "name", label: "name", type: String},
        {field: "born", label: "born", type: Date},
        {field: "death", label: "death", type: Date},
        {field: "available_languages", label: "language available", type: String},
      ]
    }
  },
  beforeMount () {
    this.change(0)
  },
  methods: {
    change (val) {
      console.log(val)
    }
  }
}
</script>

<style>

</style>
