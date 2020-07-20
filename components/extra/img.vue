<template>
  <picture>
    <template v-if="notExclude('mobile')">
      <template v-if="canWebp">
        <source media="(max-width:500px)" :srcset="typePath('mobile', '?webp')" type="image/webp">
      </template>
      <source media="(max-width:500px)" :srcset="typePath('mobile')" :type="type">
    </template>
    <template v-if="notExclude('tablet')">
      <template v-if="canWebp">
        <source media="(max-width:800px)" :srcset="typePath('tablet', '?webp')" type="image/webp">
      </template>
      <source media="(max-width:800px)" :srcset="typePath('tablet')" :type="type">
    </template>
    <template v-if="notExclude('desktop')">
      <template v-if="canWebp">
        <source media="(max-width:1000px)" :srcset="typePath('desktop', '?webp')" type="image/webp">
      </template>
      <source media="(max-width:1000px)" :srcset="typePath('desktop')" :type="type">
    </template>
    <template v-if="canWebp">
      <source media="(min-width:1000px)" :srcset="typePath('default', '?webp')" type="image/webp">
    </template>
    <img :class="classNative" loading="lazy" :src="typePath('default')">
  </picture>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    suffixDefault: {
      type: Boolean,
      default: false
    },
    // exclure les type , desactiver si "default" props est a true
    // "mobile", "tablet", "desktop"
    exclude: {
      type: Array[String],
      default: () => { return [] }
    },
    // class pour l'image et non le picture
    classNative: {
      type: [String, Object],
      default: ""
    },
    // dossier ou ce trouve l'image
    folder: {
      type: String,
      default: "img"
    },
    default: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      srcSplit: this.src.split(".")
    }
  },
  computed: {
    type () {
      const extra = this.srcSplit[1] == "svg" ? "+xml" : ""
      return `image/${this.srcSplit[1]}${extra}`
    },
    thumbColor () {
      if (this.canWebp) {
        return this.typePath(this.getSuffix("default"), "?lqip-colors")[0]
      }
      return "#000000"
    },
    canWebp () {
      return false
      //return ["jpg", "png"].includes(this.srcSplit[1])
    },
  },
  methods: {
    typePath (type, query = "") {
      /* for src equal to 'exemple.png'
        the srcSplit equal to ['exemple', 'png']
        so we create the path with suffix ( default / mobile / tablet)
      */
      return require(`../../assets/${this.folder}/${this.srcSplit[0]}${this.getSuffix(type)}.${this.srcSplit[1]}${query}`)
    },
    notExclude (type) {
      if (this.default) {
        return false
      }
      return this.exclude.includes(type) == false
    },
    getSuffix (type) {
      return type != "default" || this.suffixDefault ? `_${type}` : ""
    },
  }
}
</script>
