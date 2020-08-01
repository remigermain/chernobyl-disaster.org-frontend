<template>
  <div class="shadow-md p-4">
    <table class="w-full">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.field" class="border-b-2 border-gray-700  text-gray-800 text-xl capitalize">
            {{ field.label }}
            <template v-if="currentField.field == field.field">
              <icon-sort-descending v-if="reverse" class="cursor-pointer" @click="sort(field, false)" />
              <icon-sort-ascending v-else class="cursor-pointer" @click="sort(field, true)" />
            </template>
            <icon-arrow-sort v-else class="cursor-pointer" @click="sort(field, false)" />
          </th>
          <th class="border-b-2 border-gray-700  text-gray-800 text-xl capitalize">
            {{ $t('global.action') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in list" :key="obj.id" class="border-b-1 border-gray-700 text-gray-700 font-light">
          <template v-for="field in fields">
            <th :key="field.field" class="p-2">
              <template v-if="obj[field.label]">
                {{ obj[field.label] }}
              </template>
              <span v-else class="text-md text-gray-600 italic text-opacity-75">
                {{ $t('global.empty') }}
              </span>
            </th>
          </template>
          <th class="p-2 text-gray-800">
            <icon-eye class="cursor-pointer text-blue-700 action-btn" />
            <icon-edit class="cursor-pointer text-purple-700 action-btn" />
          </th>
        </tr>
      </tbody>
    </table>
    <pagination :length="length" @change="change" />
  </div>
</template>

<script>
import iconSortDescending from "@/assets/svg/sort-descending.svg"
import iconSortAscending from "@/assets/svg/sort-ascending.svg"
import iconArrowSort from "@/assets/svg/arrows-sort.svg"
import iconEye from "@/assets/svg/eye.svg"
import iconEdit from "@/assets/svg/edit.svg"

export default {
  components: {
    iconSortDescending,
    iconSortAscending,
    iconArrowSort,
    iconEye,
    iconEdit,
  },
  props: {
    fields: {
      type: Array[Object],
      required: true
    },
    url: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: false,
      default: ""
    }
  },
  data () {
    return {
      currentField: {field: null},
      reverse: false,
      datas: [],
      list: [],
      length: 0
    }
  },
  watch: {
    datas (value) {
      this.list = value
    }
  },
  beforeMount () {
    this.change(1)
  },
  methods: {
    sort (field, reverse) {
      this.reverse = reverse
      this.currentField = field
      this.list = this.datas.sort((el1, el2) => {
        const type = field.type
        const fel1 = type(el1[field.field])
        const fel2 = type(el2[field.field])
        return (reverse ? fel1 > fel2 : fel2 > fel1)
      })
    },
    change (val) {
      const query = (this.query ? `&${this.query}` : "")
      this.$axios.get(`${this.url}/?page=${val}${query}`)
        .then(response => {
          this.datas = response.data.results
          this.length = response.data.count
        })
        .catch(error => {
          this.$toast.error(error)
        })
    }
  }

}
</script>

<style lang="scss">

.action-btn {
  display: inline-block;
  transition: transform .4s;
  &:hover {
    transform: scale(1.2);
  }
}

</style>
