<template>
  <div class="px-10 py-3 flex justify-center items-center h-inherit w-inherit">
    <utils-field v-model="search" class="" @input="$emit('search', search)">
      <template v-slot:label>
        {{ $t('global.search') }}
      </template>
      <template v-slot:icon>
        <icon-search class="text-gray-700" />
      </template>
    </utils-field>
    <div class="relative sort-set rounded-lg">
      <span class="p-2 opacity-50 italic text-sm">
        <span class="text-xl">
          {{ $t("global.sort-by") }}
        </span>
        {{ current }}
      </span>
      <icon-selector class="opacity-50" />
      <ul class="sort-list absolute bg-white rounded-lg p-2">
        <li v-for="sort in sortList" :key="sort.name" class="link cursor-pointer" @click="sortBy(sort)">
          {{ sort.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import iconSearch from "@/assets/svg/search.svg"
import iconSelector from "@/assets/svg/selector.svg"
export default {

  components: {
    iconSearch,
    iconSelector
  },

  data () {
    return {
      current: null,
      search: "",
      sortList: [
        {
          name: this.$t("global.date"),
          fnc: (el1, el2) => el1.date > el2.date
        },
        {
          name: this.$t("global.created"),
          fnc: (el1, el2) => el1.created > el2.created
        },
      ]
    }
  },

  methods: {
    sortBy(current) {
      this.current = current.name
      this.$emit("sort", current.fnc)
    },
  }

}
</script>

<style lang="scss">

.sort-set {
  svg {
    transition: opacity .2s;
  }
  &:hover {
    svg {
      opacity: .8;
    }
    .sort-list {
      visibility: visible;
    }
  }
}

.sort-list {
  visibility: hidden;
}
</style>
