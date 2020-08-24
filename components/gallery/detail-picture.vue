<template>
  <div class="picture-detail" :class="{
    'detail-transition' : transition === true || object === null,
    'detail-active': object != null
  }"
  >
    <div v-if="object" class="wrapper">
      <div class="toolbar-container">
        <div class="toolbar-left">
          {{ position }}
        </div>
        <div class="toolbar-right">
          <icon-close class="toolbar-item" @click="$emit('close')" />
        </div>
      </div>
      <icon-prev v-show="hasPrev" class="toolbar-item toolbar-slide-prev" @click="$emit('prev')" />
      <icon-next v-show="hasNext" class="toolbar-item toolbar-slide-next" @click="$emit('next')" />
      <div class="picture-item-container">
        <img :alt="object.title"
             :src="object.picture.full"
             class="picture-item mx-auto shadow-md"
             loading="lazy"
        >
      </div>
      <div class="picture-title">
        {{ i18nAttr(object, 'title') }}
      </div>
    </div>
  </div>
</template>

<script>
import iconClose from "@/assets/svg/x.svg"
import iconPrev from "@/assets/svg/arrow-left.svg"
import iconNext from "@/assets/svg/arrow-right.svg"
import isNil from "lodash/isNil"

export default {

  components: {
    iconClose,
    iconPrev,
    iconNext,
  },

  props: {
    object: {
      type: Object,
      default: null
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
      transition: false,
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
    },
    position () {
      return `${this.idx + 1} / ${this.length}`
    }
  },

  watch: {
    object (newValue, oldValue) {
      this.transition = isNil(oldValue)
    }
  },
}
</script>

<style lang="scss" scoped>

.picture-detail {
  --timing: .5s;
  position: absolute;
  user-select: none;
  opacity: 0;
  transition: opacity .2s;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .85);
  display: flex;
  justify-content: center;
  align-content: center;
  &.detail-transition {
    opacity: 0;
    z-index: -30;
  }
  &.detail-active {
    opacity: 1;
    z-index: 30;
  }
  .picture-item-container {
    overflow: hidden;
    position: relative;
    height: 90vh;
    width: 90vw;
    margin: 5vh 5vw;
  }
  .picture-item {
    height: inherit;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
  }
  .picture-title {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 5vh;
    color: white;
    text-align: center;
    font-size: 1.5rem;
  }
}
/*
  toolbar icon
*/
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

.toolbar-slide-prev,
.toolbar-slide-next {
  --margin-slider: 10px;
  position: absolute;
  top: 50%;
  color: white;
  z-index: 50;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 5px;
}

.toolbar-slide-prev {
  margin-left: var(--margin-slider);
  left: 0;
}
.toolbar-slide-next {
  margin-right: var(--margin-slider);
  right: 0;
}

</style>
