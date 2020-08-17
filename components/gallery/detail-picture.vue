<template>
  <div class="picture-active">
    <div class="toolbar-container">
      <div class="toolbar-left">
        {{ idx }} / {{ length }}
      </div>
      <div class="toolbar-right">
        <icon-close class="toolbar-item" @click="$emit('close')" />
      </div>
    </div>
    <icon-prev v-show="hasPrev" class="absolute top-50 left-0 text-white z-50 toolbar-item" @click="$emit('prev')" />
    <icon-next v-show="hasNext" class="absolute top-50 right-0 text-white z-50 toolbar-item" @click="$emit('next')" />
    <div class="picture-item-container select-none">
      <img :alt="object.title"
           :src="object.picture"
           class="picture-item-active mx-auto"
           :class="{'hidden': translate}"
           loading="lazy"
      >
      <div v-if="translate" class="absolute top-0 left-0 w-full h-full">
        <img :alt="object.title"
             :src="object.picture"
             class="picture-item-active absolute top-0 left-0 w-full h-full"
             :class="{
               'translate-left': translateLeft,
               'translate-right': translateRight
             }"
             loading="lazy"
        >
        <img :alt="objectCopy.title"
             :src="objectCopy.picture"
             class="picture-item-active absolute top-0 left-0 w-full h-full"
             :class="{
               'picture-main': translate,
               'translate-main-left': translateLeft,
               'translate-main-right': translateRight
             }"
             loading="lazy"
        >
      </div>
    </div>
  </div>
</template>

<script>
import iconClose from "@/assets/svg/x.svg"
import iconPrev from "@/assets/svg/arrow-left.svg"
import iconNext from "@/assets/svg/arrow-right.svg"

export default {

  components: {
    iconClose,
    iconPrev,
    iconNext,
  },

  props: {
    object: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      objectNew: this.object,
      objectCopy: null,
      translateLeft: false,
      translateRight: false,
      timeout: 0,
    }
  },

  computed: {
    hasPrev () {
      return this.idx > 0
    },
    hasNext () {
      return this.length - 1 > this.idx
    },
    translate () {
      return this.translateLeft || this.translateRight
    }
  },

  watch: {
    idx (oldValue, newValue) {
      if (oldValue > newValue) {
        this.translateRight = true
      } else {
        this.translateLeft = true
      }
    },
    object (newValue, oldValue) {
      this.objectCopy = oldValue
      this.objectNew = newValue
      this.timeout = setTimeout(() => {
        this.translateRight = false
        this.translateLeft = false
      }, 500)
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeout)
  },

  methods: {
    maiximize () {

    },
    zoomIn () {

    },
    zoomOut () {

    },
  }

}
</script>

<style lang="scss">

.picture-active {
  --timing: .5s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.651);
  display: flex;
  justify-content: center;
  align-content: center;
  .picture-item-container {
    overflow: hidden;
    position: relative;
    height: 90vh;
    width: 90vw;
    margin: 5vw 5vh;
  }
}

.picture-item-active {
  height: inherit;
  object-fit: contain;
}

.close-btn {
  transition: transform .2s;
  &:hover {
    transform: scale(1.2);
  }
}

.translate-right,
.translate-left {
  z-index: 50;
}

.translate-right {
  animation-duration: var(--timing);
  animation-name: translate-right;
}

@keyframes translate-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}

.translate-left {
  animation-duration: var(--timing);
  animation-name: translate-left;
}

@keyframes translate-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}




.translate-main-left {
  animation-duration: var(--timing);
  animation-name: translate-main-left;
}

@keyframes translate-main-left {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100vw);
  }
}

.translate-main-right {
  animation-duration: var(--timing);
  animation-name: translate-main-right;
}

@keyframes translate-main-right {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100vw);
  }
}

.toolbar-container {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 20;
  color: white;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .toolbar-right {
    padding-right: 10px;
    justify-content: end;
  }
  & > .toolbar-left {
    padding-left: 10px;
    justify-content: start;
  }
  & > .toolbar-right, & > .toolbar-left {
    width: 50%;
    display: flex;
    align-items: center;
  }
}

.toolbar-item {
  height: inherit;
  margin-right: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: rgb(185, 185, 185);
  }
}

</style>
