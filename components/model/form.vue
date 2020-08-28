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
    <form class="flex flex-col justify-end pt-16" enctype="multipart/form-data" @submit.prevent="$emit('submit', $event)">
      <slot name="form" />
      <div class="w-full">
        <table v-if="lang" class="overflow-x-scroll w-full table-lang">
          <thead>
            <tr>
              <th colspan="100%">
                <div class="bg-blue-700 text-white p-2 mt-4 capitalize  w-full rounded-t-sm">
                  <slot name="label" /> {{ $t('global.language') }}
                </div>
              </th>
            </tr>
            <tr class="text-center bg-head rounded-b-lg">
              <slot name="table-header" />
            </tr>
          </thead>
          <tbody class="text-center">
            <slot name="table-body" />
          </tbody>
        </table>
        <button type="button" class="p-1 text-md w-max-content rounded-md mt-2 hover:text-green-800" @click="$emit('add-extra')">
          <svg-icon name="plus" class="inline text-green-800" />
          {{ $t('tools.add') }}
        </button>
      </div>
      <div class="w-full text-right p-4 bg-gray-400 mt-2 text-white text-sm rounded-b-lg">
        <button type="submit" class="px-2 py-2 bg-blue-600 hover:bg-blue-800 rounded-md" @click.stop.prevent="$router.back()">
          {{ $t('tools.cancel') }}
        </button>
        <button type="submit" class="px-2 py-2 bg-blue-600 hover:bg-blue-800 rounded-md" data-type="new">
          {{ $t('tools.save-add-other') }}
        </button>
        <button type="submit" class="px-2 py-2 bg-blue-600 hover:bg-blue-800 rounded-md" data-type="continue">
          {{ $t('tools.save-continue-editing') }}
        </button>
        <button type="submit" class="px-2 py-2 bg-blue-700 hover:bg-blue-800 rounded-md" data-type="detail">
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
</style>
