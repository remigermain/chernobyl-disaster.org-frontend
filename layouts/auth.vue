<template>
  <layout>
    <div class="grid-common">
      <div class="common-description">
        <nuxt-child />
      </div>
      <div class="common-image">
        <picture>
          <source srcset="~/assets/img/background-login-tablet.webp" media="(max-width: 850px)" type="image/webp">
          <source srcset="~/assets/img/background-login-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
          <source srcset="~/assets/img/background-login.webp" media="(min-width: 850px)" type="image/webp">
          <img loading="lazy" src="~/assets/img/background-login.jpeg" alt="image" type="image/jpeg" class="common-img">
        </picture>
      </div>
    </div>
  </layout>
</template>

<script>
import layout from "~/layouts/default"
export default {
  components: {
    layout
  }
}
</script>

<style lang="scss">

.dark .section-form {
  @apply border-t-0;
  @apply border-b-0;
  @apply border-r-0;
  @apply bg-gray-800;
  h1 {
    @apply text-gray-400
  }
}
</style>
