<template>
  <div class="bread-crumb text-md text-opacity-50 text-gray-700">
    <extra-nuxt-link :to="{name: 'contribute'}">
      {{ $t('global.contribute') }}
    </extra-nuxt-link>
    <slot />
  </div>
</template>

<style lang="scss">

.bread-crumb > ::after {
  content: '/';
  padding: 0px 2px;
  color: rgb(33, 17, 105);
  cursor: default;
}
.bread-crumb:not(:last-child) > :hover {
  color: rgba(85, 60, 154, 1);
}
</style>
