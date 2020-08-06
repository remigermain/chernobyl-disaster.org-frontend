<template>
  <div class="shadow-md p-4">
    <div class="p-2 rounded-md bg-gray-200 shadow mb-2 w-max-content">
      <input v-model="searchValue" type="text" class="bg-gray-200" :placeholder="$t('global.search')">
      <span class="p-1 cursor-pointer">
        <icon-search class="table-search-icon hover:text-purple-700"
                     @click="$emit('search', searchValue)"
        />
      </span>
      <slot name="table-header" />
    </div>
    <table class="w-full table-list">
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
            <td :key="field.field" class="p-2">
              <template v-if="obj[field.field]">
                <template v-if="field.type === Array">
                  {{ obj[field.field].join() }}
                </template>
                <template v-else>
                  {{ obj[field.field] }}
                </template>
              </template>
              <span v-else class="text-xs text-gray-600 italic text-opacity-75">
                -- {{ $t('global.empty') }} --
              </span>
            </td>
          </template>
          <td class="p-2 text-gray-800 text-center">
            <extra-nuxt-link :to="{name: `contribute-${model}-id`, params:{ id: obj.id} }">
              <icon-eye class="cursor-pointer text-blue-700 action-btn" />
            </extra-nuxt-link>
            <extra-nuxt-link :to="{name: `contribute-${model}-update-id`, params:{ id: obj.id} }">
              <icon-edit class="cursor-pointer text-purple-700 action-btn" />
            </extra-nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-2 text-center">
      <span class="text-md italic float-left opacity-75">
        <slot name="table-footer" />
      </span>
      <field-pagination :length="length" @change="$emit('pagination', $event)" />
      <span class="text-md italic float-right opacity-75">
        {{ $t('global.total') }} : {{ length }}
      </span>
    </div>
  </div>
</template>

<script>
import iconSortDescending from "@/assets/svg/sort-descending.svg"
import iconSortAscending from "@/assets/svg/sort-ascending.svg"
import iconArrowSort from "@/assets/svg/arrows-sort.svg"
import iconEye from "@/assets/svg/eye.svg"
import iconEdit from "@/assets/svg/edit.svg"
import iconSearch from "@/assets/svg/search.svg"

export default {

  components: {
    iconSortDescending,
    iconSortAscending,
    iconArrowSort,
    iconEye,
    iconEdit,
    iconSearch
  },

  props: {
    objectList: {
      type: Array[Object],
      required: true,
    },
    fields: {
      type: Array[Object],
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    model: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      currentField: {field: null},
      reverse: false,
      list: this.objectList,
      searchValue: ""
    }
  },

  watch: {
    objectList (value) {
      this.list = value
    }
  },

  methods: {
    sort (field, reverse) {
      this.reverse = reverse
      this.currentField = field
      this.list = this.objectList.sort((el1, el2) => {
        const type = field.type
        const fel1 = type(el1[field.field])
        const fel2 = type(el2[field.field])
        return (reverse ? fel1 > fel2 : fel2 > fel1)
      })
    },
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

.table-search-icon {
  transition: transform .4s;
  &:hover {
    transform: scale(1.1);
  }
}

.table-list tr:nth-of-type(even) {
  background-color:  rgba(116, 116, 116, 0.1);
}

</style>
