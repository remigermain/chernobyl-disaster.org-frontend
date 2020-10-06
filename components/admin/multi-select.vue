<template>
  <component :is="component" v-bind="$attrs" :field="fieldCopy">
    <template #label>
      <span :class="{'text-gray-500': !field.required}">
        {{ field.label }}
      </span>
    </template>
    <template #input>
      <select v-model="valueModel" :name="name" multiple="true" class="md:invisible md:w-0 md:h-0 -md:field-select-multiple"
              :required="field.required"
              @input="$emit('input', valueModel)"
              @change="$emit('input', valueModel)"
      >
        <option v-for="choice in field.choices"
                :key="choice.display_name"
                :value="choice.value"
        >
          {{ choice.display_name }}
        </option>
      </select>
      <div class="w-full h-full -md:hidden">
        <div class="space-y-2 space-x-2 flex flex-wrap items-baseline select-new overflow-y-scroll">
          <admin-tag v-for="v in valueModel" :key="v" :name="findChoices(v).display_name" @close="unselect(v)" />
        </div>
        <field-text :field="fieldSearch" class="relative" @input="find" @focus="focus = true" @blur="focus = false" />
        <div class="relative w-full">
          <div v-if="focus || hover" class="bg-white shadow-lg rounded-md overflow-y-scroll options-select-search absolute top-0 right-0 w-full"
               @mouseover="hover = true"
               @mouseout="hover = false"
          >
            <ol>
              <li v-for="s in searchOption" :key="s.value"
                  class="text-gray-800 leading-4 p-2 hover:bg-gray-300 cursor-pointer data"
                  @click.prevent.stop="select(s.value)"
              >
                {{ s.display_name }}
              </li>
              <li v-if="searchOption.length === 0" class="p-2 italic text-opacity-75 text-gray-800 text-center empty">
                {{ empty }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <admin-action v-if="action" :field="field" :edit="false" />
    </template>
  </component>
</template>

<script>
import FieldMixins from "~/mixins/admin/field"
export default {

  mixins: [FieldMixins],

  data () {
    return {
      valueModel: this.value || [],
      searchValue: "",
      focus: false,
      hover: false,
      fieldSearch: {
        max_length: 999,
        label: this.$t("utils.search")
      }
    }
  },

  computed: {
    optionAvailable () {
      const a =  this.field.choices.filter(x => {
        return !this.valueModel.find(t => t === x.value)
      })
      return a
    },
    searchOption () {
      // get only 30 element
      return this.optionAvailable.filter(x => x.display_name.includes(this.searchValue)).slice(0, 30)
    }
  },

  watch: {
    value (value) {
      this.valueModel = (Array.isArray(value) ? value : [])
      return value
    }
  },

  methods: {
    findChoices(id) {
      return this.field.choices.find(x => x.value === id)
    },
    find (value) {
      this.searchValue = value
    },
    select (id) {
      this.valueModel.push(id)
    },
    unselect (id) {
      this.$delete(this.valueModel, this.valueModel.indexOf(id))
    },
  },


}
</script>

<style lang="scss" scoped>
.field-select-multiple {
  height: auto;
  min-height: 200px;
  min-width: 180px;
  width: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 6px;
  margin-top: 0;
}
.select-new {
  height: auto;
  max-height: 150px
}

.options-select-search {
  max-height: 180px;
}

.dark .options-select-search {
  @apply bg-gray-700 text-gray-300;
  .data {
    @apply text-gray-300;
    &:hover {
      @apply bg-gray-800
    }
  }
  .empty {
    @apply text-gray-500
  }
}
</style>
