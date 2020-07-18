<template>
  <div class="mx-2 shadow">
    <div class="flex justify-around rounded-md rounded-b-none text-md text-gray-100 w-full flex-wrap">
      <button class="extra-items p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activePictures}" @click="enablePictures">
        <h3>
          {{ $t('components.cher-extra.pictures') }}
        </h3>
      </button>
      <button class="extra-items p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activeVideos}" @click="enableVideos">
        <h3>
          {{ $t('components.cher-extra.videos') }}
        </h3>
      </button>
      <button class="extra-items p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activeDocuments}" @click="enableDocuments">
        <h3>
          {{ $t('components.cher-extra.documents') }}
        </h3>
      </button>
      <button class="extra-items p-4 rounded-t-md w-1/4" :class="{'active bg-opacity-25 bg-cher-primary-rev': activeLinks}" @click="enableLink">
        <h3>
          {{ $t('components.cher-extra.lien') }}
        </h3>
      </button>
      <div class="bg-cher-primary-rev rounded-md rounded-t-none flex-1 text-center p-4">
        <span class="text-md italic text-gray-300">
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
        activeLinks: false
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
      },
      enableVideos () {
        this.disableAll()
        this.activeVideos = true
      },
      enableDocuments () {
        this.disableAll()
        this.activeDocuments = true
      },
      enableLink () {
        this.disableAll()
        this.activeLinks = true
      },
    }
}
</script>

<style lang="scss">
.extra-items {
  font-weight: 600;
  --size-border-extra: 2px;
  border-bottom: var(--size-border-extra) solid transparent;

  &.active {
    border-bottom: var(--size-border-extra) solid white;
  }
}
</style>
