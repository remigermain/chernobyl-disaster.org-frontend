<template>
  <div class="grid-contribute">
    <div class="flex flex-col p-4 contribute-menu">
      <h2 class="text-3xl capitalize font-normal shadow-md w-full text-center p-2">
        {{ $t('global.menu') }}
      </h2>
      <div class="ml-2 shadow-md p-2">
        <div class="capitalize shadow-md text-md w-full h-full text-center p-2">
          {{ $t('global.model') }}
        </div>
        <ul class="ml-2 mt-2">
          <li v-for="el in menus" :key="el.name" class="p-1">
            <lazy-extra-nuxt-link :to="el.to" class="contribute-link italic rounded-lg">
              {{ el.name }}
            </lazy-extra-nuxt-link>
          </li>
        </ul>
      </div>
      <div class="ml-2 shadow-md p-2">
        <div class="capitalize shadow-md text-md w-full h-full text-center p-2">
          {{ $t('global.settings') }}
        </div>
        <ul class="ml-2 mt-2">
          <li class="p-1">
            <lazy-extra-nuxt-link :to="{name: 'contribute-contact'}" class="contribute-link italic rounded-lg">
              {{ $t('global.contact') }}
            </lazy-extra-nuxt-link>
          </li>
          <li class="p-1">
            <lazy-extra-nuxt-link :to="{name: 'contribute-account'}" class="contribute-link italic rounded-lg">
              {{ $t('global.account') }}
            </lazy-extra-nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid-contribute-content overflow-y-scroll p-4">
      <nuxt-child :key="$route.fullPath">
        iciciciici
      </nuxt-child>
    </div>
  </div>
</template>

<script>
export default {

  middleware: [
    "model",
    "auth",
  ],

  data () {
    return {
      menus: [
        {
          name: "event",
          to: {name: "contribute-event"}
        },
        {
          name: "people",
          to: {name: "contribute-people"}
        },
        {
          name: "tag",
          to: {name: "contribute-tag"}
        },
        {
          name: "picture",
          to: {name: "contribute-picture"}
        },
        {
          name: "video",
          to: {name: "contribute-video"}
        },
        {
          name: "document",
          to: {name: "contribute-document"}
        },
        {
          name: "article",
          to: {name: "contribute-article"}
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-contribute {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.contribute-menu > * + * {
  margin-top: 2rem
}

.contribute-link {
  display: block;
  transition: color .4s, transform .2s;
  &.nuxt-link-exact-active {
    color: rgb(128, 9, 128);
    transform: translateX(10%);
  }
}
</style>
