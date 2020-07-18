<template>
  <div class="h-screen w-screen flex justify-center items-center flex-col">
    <cher-logo :site-name="true" />
    <div class="text-center w-full sm:w-2/3 xl:w-2/4 text-gray-300 text-xl">
      <p>
        {{ $t('pages.index.description') }}
      </p>
    </div>
    <cher-nuxt-link :to="{name: 'timeline'}" class="px-3 py-2 bg-cher-primary-rev rounded-md text-2xl text-gray-400">
      {{ $t('pages.index.see-more') }}
    </cher-nuxt-link>
  </div>
</template>
