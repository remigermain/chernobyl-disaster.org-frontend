<template>
  <div class="text-gray-100 font-bold flex flex-col">
    <div class="font-digital tracking-tighter">
      <span class="text-6xl">
        {{ date.getHours() }}
        <span class="">
          :
        </span>
        {{ date.getMinutes() }}
      </span>
      <span class="text-2xl">
        {{ date.getSeconds() }}
      </span>
    </div>
    <div class="font-mulshock text-md">
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
            date: new Date()
        }
    }
}
</script>

<style>

</style>
