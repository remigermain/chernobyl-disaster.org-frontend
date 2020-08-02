<template>
  <div class="wrapper">
    <div class="flex flex-col">
      <h1 class="text-3xl capitalize self-start">
        <slot name="label" />
        <span class="text-md italic text-gray-500">
          {{ $route.params.id }}
        </span>
      </h1>
    </div>
    <h2 class="capitalize text-xl italic">
      Detail object:
    </h2>
    <slot name="form" />
  </div>
</template>

