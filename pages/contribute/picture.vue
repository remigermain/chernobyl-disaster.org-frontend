<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <h1 class="text-3xl capitalize self-start">
        Picture
      </h1>
      <button class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600">
        {{ $t('global.create') }}
        <icon-plus class=" w-24px text-white" />
      </button>
    </div>
    <h2 class="capitalize text-xl italic">
      List off all objects :
    </h2>
    <table-models url="picture"
                  :fields="fields"
    />
    <h2 class="capitalize text-xl italic mt-6">
      Need traduction:
    </h2>
    <table-models url="picture"
                  query="langs"
                  :fields="fields"
    />
  </div>
</template>

<script>
import iconPlus from "@/assets/svg/plus.svg"
export default {
  components: {
    iconPlus
  },
  data () {
    return {
      fields: [
        {field: "id", label: "id", type: Number},
        {field: "title", label: "title", type: String},
        {field: "event", label: "event", type: Date},
        {field: "available_languages", label: "language available", type: String},
      ]
    }
  },
}
</script>

<style lang="scss">
.btn-create {
  position: relative;
}

</style>
