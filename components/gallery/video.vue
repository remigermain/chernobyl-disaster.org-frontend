<template>
  <div class="p-2 preview-video">
    <iframe width="560" height="315" :src="convertVideoLink(link)" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
    />
  </div>
</template>

<script>
import { convertVideoLink } from "~/lib/contribute"

export default {

  props: {
    link: {
      type: String,
      default: "",
    }
  },

  methods: {
    convertVideoLink,
  }

}
</script>

<style lang="scss" scoped>
.preview-video {
  overflow:hidden;
  padding-bottom:56.25%;
  position:relative;
  height:0;
  max-height: 750px;
  & > iframe {
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
  }
}
</style>
