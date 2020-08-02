export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async fetch () {
    const response = await this.$axios.get(`${this.model}/${this.$route.params.id}`)
    if (response.status == 200) {
      return {
        object: response.data
      }
    }
    this.$toat.error(this.$t("global.error"))
    console.log(this.$parent.$route)
    //return redirect(this.localePath({name: }))
  }
}
