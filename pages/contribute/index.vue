<template>
  <div class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
    <contribute-user :object="object" />
    <div v-for="el in menus" :key="el.to.name" class="card-model shadow-lg rounded-md border-t-4 border-gray-500">
      <div class="tulp">
        <h1 class="text-2xl capitalize italic text-opacity-75">
          {{ el.name }}
        </h1>
        {{ el.help }}
      </div>
      <nuxt-link :to="localePath(el.to)" class="text-center bg-gray-800 hover:bg-gray-700 text-white rounded-bl-lg"
                        :class="{'col-span-2 rounded-br-lg': !el.toCreate, 'border-gray-900 border-r-4': el.toCreate}"
      >
        {{ $t('utils.list') }}
      </nuxt-link>
      <nuxt-link v-if="el.toCreate"  :to="localePath(el.toCreate)" class="text-center bg-gray-800 hover:bg-gray-700 text-white rounded-br-lg">
        {{ $t('utils.create') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContributeOverview",
  layout: "default",

  middleware: [
    "model",
    "auth",
  ],

  transition: "page",

  props: {
    menus: {
      type: Array,
      required: true,
    }
  },

  asyncData({app}) {
    return app.$axios.get("populate/overview")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        response.data.results.forEach(o => {
          o.date = new Date(o.date)
        })
        return {object: response.data}
      })
      .catch(() => {
        // TODO
      })
  },
}
</script>

<style lang="scss">

.card-model {
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 1fr;
  & > *:first-child {
    grid-area: 1 / 1 / 1 / 3;
  }
  & > * {
    padding: 1em;
  }
}

.dark .tulp {
  @apply bg-gray-900
}

</style>
