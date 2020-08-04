<template>
  <icon-rotate-clockwise-2 class="icon-loading" />
</template>

<script>
import iconRotateClockwise2 from "@/assets/svg/rotate-clockwise-2.svg"
export default {

  components: { iconRotateClockwise2 }

}
</script>

<style lang="scss">
.icon-loading {
  animation: rotate .7s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
