<template>
  <div class="p-2 preview-video">
    <object  width="560" height="315" >
      <param name="movie" :value="convertVideoLink(link)">
      <embed :src="convertVideoLink(link)" type="application/x-shockwave-flash" width="560" height="315">
    </object>
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
  & > object {
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
  }
}
</style>
