<script>
export default {

  asyncData ({ app, redirect }) {
    return redirect(app.localePath({name: "home"}))
  }

}
</script>
