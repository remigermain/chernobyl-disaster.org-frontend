<template>
  <form-base :field="field" :errors="errors">
    <multiselect
      v-model="valueModel"
      :placeholder="field.label"
      label="display_name"
      track-by="value"
      :options="choices"
      :allow-empty="!field.required"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    />
  </form-base>
</template>

<script>
import Multiselect from 'vue-multiselect'
import FieldMixins from "~/mixins/field"

export default {
  components: { Multiselect },

  mixins: [FieldMixins],

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      choices: [...this.field.choices]
    }
  },

  watch: {
    valueModel (newValue) {
      this.$emit('input', newValue)
    }
  },

  mounted () {
    if (process.client && this.field.max_length) {
      const selectInput = document.querySelector('.multiselect__input')
      if (selectInput) {
        selectInput.setAttribute('maxlength', this.field.max_length)
      }
    }
  },

  methods: {
    addTag (name) {
      const tag = {display_name: name, value: -1}
      this.choices.push(tag)
      this.valueModel.push(tag)
    }
  }

}
</script>

<style lang="scss">
@import "vue-multiselect/dist/vue-multiselect.min.css";


.multiselect {
  min-width: 280px;
}

.multiselect__spinner::after, .multiselect__spinner::before {
  border-top-color: #3182ce;
}

.multiselect__tags, .multiselect__input {
  @apply bg-gray-200
}

.multiselect__tag {
  @apply bg-blue-700;
  @apply text-gray-200;
}
.multiselect__tag-icon::after {
  @apply text-gray-900;
}
.multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
  @apply bg-blue-600;
  @apply text-gray-900;
}

.multiselect__option--highlight {
  @apply bg-blue-600;
  @apply text-gray-900;
}
.multiselect__option--highlight::after {
  @apply bg-blue-500;
  @apply text-gray-900;
}


.dark {
  .multiselect__tags, .multiselect__input, .multiselect__content-wrapper, .multiselect__spinner {
    @apply bg-gray-700
  }

  .multiselect, .multiselect__placeholder {
    @apply text-gray-200;
  }
  .multiselect__input::placeholder {
    @apply text-gray-500;
  }

  .multiselect__tag {
    @apply bg-blue-700;
    @apply text-gray-200;
  }
  .multiselect__tag-icon::after {
    @apply text-gray-200;
  }
  .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
    @apply bg-blue-600;
    @apply text-gray-200;
  }

  .multiselect__option--highlight {
    @apply bg-blue-600;
    @apply text-gray-200;
  }
  .multiselect__option--highlight::after {
    @apply bg-blue-500;
    @apply text-gray-200;
  }
}

</style>
