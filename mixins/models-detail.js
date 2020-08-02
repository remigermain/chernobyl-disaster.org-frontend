export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  middleware() {
    console.log("iciciic", this)
  },
  async asyncData () {
    console.log("lalalal")
    //const response2 = await this.$axios.options(`${this.model}/${this.$route.params.id}/`)
    //const response = await this.$axios.get(`${this.model}/${this.$route.params.id}/`)
    //console.log(response, response2)
    //if (response2.status === 200) {
    //  this.fields = response2.data.actions.PUT
    //}
    //if (response.status == 200) {
    //  this.object = response.data
    //} else {
    //  this.$toat.error(this.$t("global.error"))
    //  //return redirect(this.localePath({name: }))
    //}
  },
  data () {
    return {
      object: {},
      fields: {},
    }
  },
  computed: {
    paths () {
      return [
        {
          name: "Contribute",
          path: this.localePath({name: "contribute"})
        },
        {
          name: this.model,
          path: this.localePath({name: `contribute-${this.model}`})
        },
        {
          name: `detail-${this.$route.params.id}`,
          path: this.$route.fullPath
        }
      ]
    }
  }
}
