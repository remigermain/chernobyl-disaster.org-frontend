<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <h1 class="text-3xl capitalize self-start">
        {{ model }}
      </h1>
      <button class="px-2 py-2 bg-blue-800 text-white rounded-md self-end capitalize hover:bg-blue-600">
        {{ $t('global.create') }}
        <icon-plus class=" w-24px text-white" />
      </button>
    </div>
    <h2 class="capitalize text-xl italic">
      List off all objects :
    </h2>
    <table-models :object-list="objectList"
                  :length="length"
                  :field-list="fieldList"
                  :model="model"
                  @change="$emit('change', $event)"
    />
    <h2 class="capitalize text-xl italic mt-6">
      Need traduction:
    </h2>
    <table-models :object-list="objectListLang"
                  :length="lengthLang"
                  :field-list="fieldListLang"
                  :model="model"
                  @change="$emit('changelang', $event)"
    />
  </div>
</template>

<script>
import iconPlus from "@/assets/svg/plus.svg"
export default {
  components: {
    iconPlus
  },
  props: {
    model: {
      type: String,
      required: true
    },
    objectList: {
      type: Array[Object],
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    fieldList: {
      type: Array[Object],
      required: true
    },
    objectListLang: {
      type: Array[Object],
      required: true
    },
    lengthLang: {
      type: Number,
      required: true
    },
    fieldListLang: {
      type: Array[Object],
      required: true
    },
  }

}
</script>

<style>

</style>
