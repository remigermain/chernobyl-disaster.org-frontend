<template>
  <div class="shadow-md md:p-4 mt-4">
    <div class="flex justify-between items-center -md:flex-col -md:justify-center -md:items-center">
      <div class="w-2/4 capitalize text-2xl -md:text-center">
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
          <th v-for="(col, idx) in columns" :key="`thead-${idx}-${convertLabel(col)}`"
              class="text-gray-600 hover:text-gray-800 table-head cursor-pointer p-2"
              :class="{'text-gray-800': current === getField(col)}"
              @click="sort(col)"
          >
            {{ convertLabel(col) }}
            <svg-icon name="arrow-up" class="transform w-5"
                      :class="{'-rotate-180': reverse, 'invisible': current!==getField(col)}"
            />
          </th>
          <th class="text-gray-700 table-head align-middle text-center">
            {{ $t('tools.action') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(obj,idx) in list" :key="`${idx}-${obj.id}`" class="border-b-1 border-gray-700 text-gray-700 shadow-xs font-medium">
          <td v-for="col in columns" :key="`tbody-${idx}-${convertLabel(col)}`" class="p-2">
            <slot v-if="$slots.default" :obj="obj" :col="col" />
            <template v-else-if="isNotEmpty(obj[getField(col)])">
              {{ convertName(obj, col) }}
            </template>
            <span v-else class="text-xs text-gray-600 italic text-opacity-75">
              {{ empty }}
            </span>
          </td>
          <td class="p-2 text-gray-800 text-center">
            <lazy-extra-nuxt-link v-if="detail && !obj.query" :to="{name: `contribute-${obj.uuid || model}-id`, params:{ id: obj.object_id || obj.id} }">
              <svg-icon name="eye" class="cursor-pointer text-blue-700 action-btn" />
            </lazy-extra-nuxt-link>
            <lazy-extra-nuxt-link :to="genLink(obj)">
              <svg-icon name="edit" class="cursor-pointer text-purple-700 action-btn" />
            </lazy-extra-nuxt-link>
            <template v-if="$auth.hasScope('staff')">
              <slot name="delete" :obj="obj" />
              <button v-if="deleted" @click="setDeleted(obj)">
                <svg-icon name="trash" class="cursor-pointer text-red-700 action-btn" />
              </button>
            </template>
          </td>
        </tr>
        <tr v-if="list.length === 0" class="text-center">
          <td :colspan="columns.length + 1" class="p-2 bg-gray-300 text-xs text-gray-600 italic text-opacity-75 empty">
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
    <admin-modal v-if="deletedId" :object="deletedId" :model="deletedModel" @close="close" />
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
      type: Object,
      required: true
    },
    columns: {
      type: Array[String],
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    model: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: true
    },
    detail: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      current: null,
      reverse: false,
      list: this.objectList,
      search: "",
      deletedId: null,
      deletedModel: null
    }
  },

  watch: {
    objectList (value) {
      this.list = value
    }
  },

  methods: {
    close () {
      this.deletedId = null
      this.$nuxt.refresh()
    },
    genLink (obj) {
      const link = {
        name: `contribute-${obj.uuid || this.model}-update-id`,
        params:{ id: obj.object_id || obj.id}
      }
      if (obj.query) {
        link.query = obj.query
      }
      return link
    },
    isNotEmpty (value) {
      return typeof value !== "undefined" && value!==null
    },
    setDeleted (obj) {
      this.deletedId = (obj.detail ? obj.detail : obj.object_id || obj.id)
      this.deletedModel = (obj.detail ? "translatelang" : obj.uuid || this.model)
    },
    getField (col) {
      return (col.field || col)
    },
    sort (order) {
      this.current = this.getField(order)
      this.reverse = !this.reverse
      const f = this.getField(order)
      if (this.reverse) {
        this.list = this.list.sort((el1, el2) => el1[f] > el2[f])
      } else {
        this.list = this.list.sort((el1, el2) => el1[f] < el2[f])
      }
    },
    convertName (obj, col) {
      const key = this.getField(col)
      return (
        this.fields[key] && this.fields[key].display && this.fields[key].display(obj) ||
        col.display && col.display(obj) ||
        obj[key] ||
        obj
      )
    },
    convertLabel (col) {
      const key = this.getField(col)
      return (
        this.fields[key] && this.fields[key].label ||
        col.label ||
        col
      )
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

.dark-mode {
  .table  {
    tr, td {
      @apply text-gray-300;
    }
    tr:nth-of-type(even) {
      background-color:  rgba(116, 116, 116, 0.3);
    }
    tr > td.empty {
      @apply bg-gray-700
    }
  }
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
