<template>
  <div class="h-inherit">
    <div class="shadow flex justify-around">
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
    </div>
    <div class="overflow-y-scroll h-inherit scrollbar">
      <template v-if="activePictures">
        <div class="grid-extra-img">
          <extra-img v-for="el in element[currentKey]" :key="el" :src="el" folder="timeline" :exclude="['mobile', 'tablet', 'desktop']" />
        </div>
      </template>
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
        currentKey: "pictures",
        currentExtra: null
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
    }
}
</script>

<style lang="scss">

.extra-items {
  height: inherit;
}
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

.horizontal {
    grid-column: span 2;
}

.vertical {
    grid-row: span 2;
}

.grid-extra-img {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(5, auto);
  gap: 5px;
  width: 100%;
  padding: 10px;
  picture, img {
    object-fit: cover;
    object-position: center;
    width: inherit;
    height: 100px;
    transition: transform .4s;
    cursor: pointer;
    &:hover {
      display: inline-block;
      transform: scale(1.05);
    }
    &.active {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  :nth-child(3n + 4)  {
    picture, img {
      &:hover {
        transform: translateX(10px) scale(1.05);
      }
    }
  }
}

.extra-img-active {
  position: absolute;
  top: 0;
  left: 0;
}

</style>
