<template>
  <div class="shadow-md md:p-4 -md:p-2 dark:bg-gray-800 rounded-lg">
    <slot name="header" />
    <table class="w-full">
      <thead>
        <tr class="shadow-sm">
          <slot name="thead" />
        </tr>
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
    <div class="mt-2 pb-2 text-center">
      <admin-utils-pagination v-show="pagination" :length="length" @change="$emit('pagination', $event)" />
      <span class="text-md italic float-right opacity-75">
        {{ $t('word.total') }} : {{ length }}
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
    pagination: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<style lang="scss">
table {
  overflow-wrap: anywhere;
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
    @apply shadow-sm;
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


@media
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

	/* Force table to not be like tables anymore */
	table, thead, tbody, th, td, tr {
		display: block;
	}

	/* Hide table headers (but not display: none;, for accessibility) */
	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr { border: 1px solid #ccc; }

	td {
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee;
		position: relative;
		padding-left: 50%;
	}

	td:before {
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
	}
}
</style>
