<template>
  <div class="text-gray-800 font-bold flex flex-col">
    <div class="font-digital tracking-tighter">
      <span class="text-6xl -sm:text-2xl">
        {{ date.getHours() }}
        <span class="">
          :
        </span>
        {{ date.getMinutes() }}
      </span>
      <span class="text-2xl -sm:text-sm">
        {{ date.getSeconds() }}
      </span>
    </div>
    <div class="font-mulshock text-lg -sm:text-sm">
      {{ date.toLocaleString('default', { weekday: 'long' }) }}
      {{ date.getDay() }}
      {{ date.toLocaleString('default', { month: 'long' }) }}
      {{ date.getFullYear() }}
    </div>
  </div>
</template>

<script>
export default {
    props: {
        element: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            date: new Date(this.element.date + "Z")
        }
    }
}
</script>

<style>

</style>
