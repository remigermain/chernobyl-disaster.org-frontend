<template>
  <div class="flex justify-center w-full">
    <div v-if="element" class="w-2/3 flex justify-start flex-wrap">
      <h1 class="text-md text-3xl text-gray-700 mx-auto w-full mb-5">
        {{ element.title }}
      </h1>
      <p class=" overflow-y-scroll w-full">
        <nuxt-content :document="element" />
      </p>
    </div>
    <div class="md:w-1/3 flex justify-center rounded  bg-gray-600 flex-wrap">
      <div class="text-center w-full flex justify-around">
        <button class="w-1/4" @click="extraPictures">
          photo
        </button>
        <button class="w-1/4" @click="extraVideos">
          video
        </button>
        <button class="w-1/4" @click="extraDocuments">
          document
        </button>
        <button class="w-1/4" @click="extraLinks">
          lien
        </button>
      </div>
      <div class="w-full h-full p-4">
        <template v-for="(el, idx) in extra">
          <div :key="idx">
            {{ el }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        element: {
            type: [Object, null],
            default: null
        }
    },
    data () {
        return {
            extra: []
        }
    },
    methods: {
        extraPictures () {
            this.extra = []
        },
        extraVideos () {
            this.extra = []
        },
        extraDocuments () {
            this.extra = []
        },
        extraLinks () {
            this.extra = []
        },
    }
}
</script>

<style>

</style>