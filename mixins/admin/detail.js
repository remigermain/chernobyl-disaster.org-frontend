import deleteMixins from '~/mixins/admin/delete'

export default {
  mixins: [deleteMixins],

  data() {
    return {
      activeModalReport: false
    }
  },

  methods: {
    haveDeletedObject() {
      this.$router.push(this.localePath(this.pathList))
    }
  }
}
