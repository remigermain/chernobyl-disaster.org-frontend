<template>
  <div class="picture-active">
    <icon-circle-x class="absolute right-0 top-0 mt-10 mr-10 text-white w-8 block z-20 cursor-pointer hover:text-gray-400 close-btn"
                   @click="$emit('close')"
    />
    <img :alt="object.title"
         :src="object.picture"
         class="picture-item-active"
         loading="lazy"
    >
  </div>
</template>

<script>
import iconCircleX from "@/assets/svg/circle-x.svg"

export default {

  components: {
    iconCircleX
  },

  props: {
    object: {
      type: Object,
      required: true
    }
  },

}
</script>

<style lang="scss">

.picture-active {
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
  .picture-item-active {
    width: 90vw;
    max-height: 90vh;
    margin-top: 5vh;
    height: auto;
    object-fit: contain;
    &:hover {
      transform: unset;
    }
  }
}

.close-btn {
  transition: transform .2s;
  &:hover {
    transform: scale(1.2);
  }
}

</style>
