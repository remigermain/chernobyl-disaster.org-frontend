<template>
  <div />
</template>

<script>
export default {
  asyncData ({ app, redirect }) {
    return redirect(app.localePath({name: "gallery-picture"}))
  }
}
</script>

<style>

</style>
