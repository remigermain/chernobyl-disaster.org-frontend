<template>
  <div class="shadow-md md:p-4">
    <div class="flex justify-between items-center">
      <div class="w-2/4 capitalize text-2xl">
        <slot name="table-title" />
      </div>
      <div class="p-2 mb-2 w-2/4">
        <field-text v-model="search" :field="{label: $t('utils.search') }">
          <template v-slot:icon>
            <svg-icon name="search" class="cursor-pointer hover:text-purple-700" @click="$emit('search', search)" />
          </template>
        </field-text>
      </div>
    </div>
    <table class="w-full table">
      <thead>
        <tr class="shadow-xs">
          <th v-for="field in fields" :key="field.field"
              class="text-gray-600 hover:text-gray-800 table-head cursor-pointer p-2"
              :class="{
                'text-gray-800': current.field === field.field
              }"
              @click="sort(field)"
          >
            {{ field.label }}
            <svg-icon name="arrow-up" class="transform w-5"
                      :class="{
                        '-rotate-180': reverse,
                        'invisible': current.field != field.field
                      }"
            />
          </th>
          <th class="text-gray-700 table-head align-middle text-center">
            {{ $t('tools.action') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in list" :key="obj.id" class="border-b-1 border-gray-700 text-gray-700 font-light shadow-xs">
          <template v-for="field in fields">
            <td :key="field.field" class="p-2">
              <template v-if="obj[field.field]">
                {{ convertName(field, obj[field.field]) }}
              </template>
              <span v-else class="text-xs text-gray-600 italic text-opacity-75">
                {{ empty }}
              </span>
            </td>
          </template>
          <td class="p-2 text-gray-800 text-center">
            <lazy-extra-nuxt-link :to="{name: `contribute-${model}-id`, params:{ id: obj.id} }">
              <svg-icon name="eye" class="cursor-pointer text-blue-700 action-btn" />
            </lazy-extra-nuxt-link>
            <lazy-extra-nuxt-link :to="{name: `contribute-${model}-update-id`, params:{ id: obj.id} }">
              <svg-icon name="edit" class="cursor-pointer text-purple-700 action-btn" />
            </lazy-extra-nuxt-link>
          </td>
        </tr>
        <tr v-if="list.length === 0" class="text-center">
          <td :colspan="fields.length + 1" class="p-2 bg-gray-300 text-xs text-gray-600 italic text-opacity-75">
            {{ empty }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-2 text-center">
      <span class="text-md italic float-left opacity-75">
        <slot name="table-footer" />
      </span>
      <admin-pagination :length="length" @change="$emit('pagination', $event)" />
      <span class="text-md italic float-right opacity-75">
        {{ $t('utils.total') }} : {{ length }}
      </span>
    </div>
  </div>
</template>

<script>
export default {

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
      current: {field: null},
      reverse: false,
      list: this.objectList,
      search: ""
    }
  },

  watch: {
    objectList (value) {
      this.list = value
    }
  },

  methods: {
    sort (field) {
      this.current = field
      this.reverse = !this.reverse
      const f = field.field
      if (this.reverse) {
        this.list = this.list.sort((el1, el2) => el1[f] > el2[f])
      } else {
        this.list = this.list.sort((el1, el2) => el1[f] < el2[f])
      }
    },
    convertName(field, value) {
      return field.fnc?.(value) || (Array.isArray(value) ? value.join() : value)
    }
  }

}
</script>

<style lang="scss">

.action-btn {
  width: 1.5rem;
  height: 1.5rem;
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

.table tr:nth-of-type(even) {
  background-color:  rgba(116, 116, 116, 0.1);
}

.table-head {
  & > svg {
    transition: transform .2s;
    display: inline-block;
  }
  &:hover > svg {
    visibility: visible;
  }
}

</style>
