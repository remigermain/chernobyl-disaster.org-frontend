<template>
  <div class="bread-crumb text-md text-opacity-50 text-gray-700 mb-2">
    <nuxt-link  :to="localePath({name: 'contribute'})">
      {{ $t('menu-name.dashboard') }}
    </nuxt-link>
    <slot />
  </div>
</template>

<style lang="scss">

.bread-crumb {
  @apply font-semibold;
  @apply text-lg;
  @apply uppercase;
  @apply tracking-tighter;
  & > ::after {
    content: '/';
    padding: 0px 2px;
    color: rgb(33, 17, 105);
    cursor: default;
  }
}
.bread-crumb:not(:last-child) > :hover {
  color: rgba(85, 60, 154, 1);
}

.dark {
  .bread-crumb {
    @apply text-gray-200;
    > ::after {
      @apply text-gray-500;
    }
    &:not(:last-child) > :hover {
      @apply text-indigo-700
    }
  }
}
</style>
