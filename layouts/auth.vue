<template>
  <layout>
    <div class="grid-common">
      <div class="common-description">
        <nuxt-child />
      </div>
      <div class="common-image">
        <picture role="img">
          <!-- <source srcset="~/assets/img/background-login-mobile.avif" media="(max-width: 550px)" type="image/avif"> -->
          <source srcset="~/assets/img/background-login-mobile.webp" media="(max-width: 550px)" type="image/webp">
          <source srcset="~/assets/img/background-login-mobile.jpeg" media="(max-width: 550px)" type="image/jpeg">
          <!-- <source srcset="~/assets/img/background-login-tablet.avif" media="(max-width: 850px)" type="image/avif"> -->
          <source srcset="~/assets/img/background-login-tablet.webp" media="(max-width: 850px)" type="image/webp">
          <source srcset="~/assets/img/background-login-tablet.jpeg" media="(max-width: 850px)" type="image/jpeg">
          <!-- <source srcset="~/assets/img/background-login.avif" media="(min-width: 850px)" type="image/avif"> -->
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
