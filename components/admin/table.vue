<template>
  <div class="shadow-md md:p-4 -md:p-2 dark:bg-gray-800 rounded-lg">
    <slot name="header" />
    <table class="w-full">
      <thead>
        <tr class="shadow-xs">
          <slot name="thead" />
        </tr>
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
    <div class="mt-2 text-center">
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
    length: {
      type: Number,
      required: true
    },
  },
}
</script>

<style lang="scss">
table {
  & > thead > tr > th:first-child {
    @apply rounded-tl-md;
  }
  & > thead > tr > th:last-child {
    @apply rounded-tr-md;
  }
  & > thead > tr > th {
    @apply text-center;
    @apply text-gray-100;
    @apply p-2;
    @apply bg-indigo-600;
  }
  & > tbody > tr {
    @apply text-center;
    @apply text-gray-700;
    @apply shadow-xs;
    @apply font-medium;
    & > td {
      @apply p-2;
    }
    &:nth-of-type(even) {
      @apply bg-gray-600;
      @apply bg-opacity-25
    }
  }
}
.dark {
  table {
    & > thead > tr {
      & > th {
        @apply text-gray-200;
      }
    }
    & > tbody > tr {
      @apply text-gray-200;
    }
  }
}
</style>
