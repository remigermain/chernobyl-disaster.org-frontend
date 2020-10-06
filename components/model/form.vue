<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <slot name="breadcrumbs" />
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
        <span class="text-md italic text-gray-500">
          {{ $route.params.id }}
        </span>
      </h1>
    </div>
    <form class="flex flex-col justify-end pt-16 form-border" enctype="multipart/form-data" @submit.prevent="$emit('submit', $event)">
      <slot name="form" />
      <div v-if="lang" class="w-full mt-1">
        <div class="w-full bg-blue-700 rounded-md text-white p-2 text-center">
          <slot name="label" /> {{ $t('utils.language') }}
          <svg-icon name="language" />
        </div>
        <div class="w-full space-y-2 mt-2">
          <slot name="form-lang" />
        </div>
      </div>
      <button type="button" class="p-2 mt-2 text-gray-200 bg-blue-600 hover:bg-blue-800 rounded-md w-max-content" @click="$emit('add-extra')">
        <svg-icon name="plus" class="inline" />
        {{ $t('tools.add') }}
      </button>
      <div class="button-model w-full text-right p-4 bg-gray-400 mt-2 text-white text-sm rounded-b-lg">
        <button type="submit" class="p-2 bg-blue-600 hover:bg-blue-800 rounded-md" @click.stop.prevent="$router.back()">
          {{ $t('tools.cancel') }}
        </button>
        <button type="submit" class="p-2 bg-blue-600 hover:bg-blue-800 rounded-md" data-type="new">
          {{ $t('tools.save-add-other') }}
        </button>
        <button type="submit" class="p-2 bg-blue-600 hover:bg-blue-800 rounded-md" data-type="continue">
          {{ $t('tools.save-continue-editing') }}
        </button>
        <button type="submit" class="p-2 bg-blue-700 hover:bg-blue-800 rounded-md" data-type="detail">
          {{ $t('tools.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {

  props: {
    lang: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style lang="scss">
.bg-head {
  background-color:  rgba(74, 85, 104, .2);
  & > th {
    padding: .5em;
  }
}
.table-lang {
  tbody > tr {
    border-bottom-width: 1px;
    border-color: rgba(74, 85, 104, .5);
  }
  tbody tr:nth-of-type(even) {
    background-color:  rgba(116, 116, 116, 0.1);
  }
}
.button-model > * {
  margin-top: .5em;
}

.form-border > * {
  @apply border-b border-gray-700 border-opacity-50;
}

.dark {
  .button-model {
    @apply bg-gray-800
  }
}
</style>
