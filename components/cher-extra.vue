<template>
  <div class="shadow">
    <div class="flex justify-around rounded-md rounded-b-none text-md text-gray-100 flex-wrap w-full">
      <button class="extra-link p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activePictures}" @click="enablePictures">
        <h3>
          {{ $t('components.cher-extra.pictures') }}
        </h3>
      </button>
      <button class="extra-link p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activeVideos}" @click="enableVideos">
        <h3>
          {{ $t('components.cher-extra.videos') }}
        </h3>
      </button>
      <button class="extra-link p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activeDocuments}" @click="enableDocuments">
        <h3>
          {{ $t('components.cher-extra.documents') }}
        </h3>
      </button>
      <button class="extra-link p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activeLinks}" @click="enableLink">
        <h3>
          {{ $t('components.cher-extra.lien') }}
        </h3>
      </button>
      <div class="bg-cher-primary-rev rounded-md rounded-t-none text-center flex-1">
        <div class="flex flex-wrap">
          <div v-for="el in element[currentKey]" :key="el" class="w-1/3 p-2" @click="viewPicture">
            <cher-img :src="el" :exclude="['mobile', 'tablet', 'desktop']" folder="timeline" classNative="extra-picture" />
          </div>
        </div>
        <span v-if="element[currentKey].length" class="text-md italic text-gray-300">
          {{ $t('components.cher-extra.empty') }} ...
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        element: {
            type: Object,
            default: null
        }
    },
    data () {
      return {
        activePictures: true,
        activeVideos: false,
        activeDocuments: false,
        activeLinks: false,
        currentKey: "pictures"
      }
    },
    methods: {
      disableAll() {
        this.activePictures = false
        this.activeVideos = false
        this.activeDocuments = false
        this.activeLinks = false
      },
      enablePictures () {
        this.disableAll()
        this.activePictures = true
        this.currentKey = "pictures"
      },
      enableVideos () {
        this.disableAll()
        this.activeVideos = true
        this.currentKey = "videos"
      },
      enableDocuments () {
        this.disableAll()
        this.activeDocuments = true
        this.currentKey = "documents"
      },
      enableLink () {
        this.disableAll()
        this.activeLinks = true
        this.currentKey = "links"
      },
      viewPicture () {

      },
    }
}
</script>

<style lang="scss">
.extra-link {
  font-weight: 600;
  --size-border-extra: 2px;
  border-bottom: var(--size-border-extra) solid transparent;

  &.active {
    border-bottom: var(--size-border-extra) solid white;
  }
}

.extra-picture {
  transition: transform .2s;
  cursor: pointer;
  //&:hover {
  //  transform: scale(1.1);
  //}
}

</style>
