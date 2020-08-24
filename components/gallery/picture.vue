<template>
  <img class="picture-item"
       :alt="object.title"
       :src="object.picture.thumbnail"
       loading="lazy"
       @click="$emit('click')"
  >
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
  },

}
</script>

<style lang="scss" scoped>

.picture-item {
  width: 220px;
  height: 140px;
  //height: auto;
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: transform .4s, width 1s, height  1s;
  object-fit: cover;
  &:hover {
    transform: scale(105%);
  }
}

@media screen and (max-width: 1250px){
  .picture-item {
    width: 25%;
  }
}

@media screen and (max-width: 650px){
  .picture-item {
    width: 50%;
  }
}

@media screen and (max-width: 470px){
  .picture-item {
    width: 100%;
  }
}
</style>
