<template>
  <div class="grid-layout-contribute-navbar ">
    <div class="background-contribute-navbar" :class="{'active': active, 'hidden': !active }" @click="active = false" />
    <label class="burger" :class="{'active': active }" @click="toogleNavbar">
      <span class="bg-gray-700 dark:bg-gray-100" />
      <span class="bg-gray-700 dark:bg-gray-100" />
      <span class="bg-gray-700 dark:bg-gray-100" />
    </label>
    <nav class="contribute-navbar-items -mobile:dark:bg-black" :class="{'active': active }">
      <nuxt-link  :to="localePath({name: 'contribute'})" class="contribute-navbar-link exact ml-4">
        <svg-icon name="dashboard" />
        {{ $t('menu.dashboard') }}
      </nuxt-link>
      <nuxt-link  :to="localePath({name: 'contribute-account'})" class="contribute-navbar-link ml-4" @click="active = false">
        {{ $t("admin.label.account") }}
      </nuxt-link>
      <nuxt-link v-for="menu in menus" :key="menu.to.name"  :to="localePath(menu.to)" class="contribute-navbar-link ml-4" @click="active = false">
        {{ menu.name }}
      </nuxt-link>
    </nav>
  </div>
</template>

<script>

export default {

  props: {
    menus: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      active: false,
    }
  },

  methods: {
    toogleNavbar () {
      this.active = !this.active
    }
  }

}
</script>

<style lang="scss">

.grid-layout-contribute-navbar {
  display: flex;
  align-items: center;
  text-transform: capitalize;
  padding-right: 10px;
  font-size: 1.2rem;
}

@media screen and (min-width: 1000px){
  .grid-layout-contribute-navbar {
    display: block;
    margin-top: 1.5rem;
  }
}

.contribute-navbar-items {
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 13;
  & > * + * {
    margin-top: .7em
  }
  .contribute-navbar-link {
    width: max-content;
    opacity: .7;
    &:hover {
      opacity: 1;
      &::after {
        width: 100%;
        opacity: 1;
      }
    }
    &::after {
      transition: width .4s, opacity .5s;
      content: '';
      width: 0;
      height: 3px;
      background-color: black;
      display: block;
      border-radius: 3px;
      opacity: 0;
    }
    &.nuxt-link-active:not(.exact), &.nuxt-link-exact-active.exact {
      opacity: 1;
      &::after {
        width: 100%;
        opacity: 1;
      }
    }
  }
}

.burger {
  --height-span-burger: 6px;
  --margin-span-burger: 4px;
  display: none;
  width: 40px;
  z-index: 0;
  cursor: pointer;
  span {
    display: block;
    border-radius: 0.25rem;
    height: var(--height-span-burger);
    transition: .2s transform, .2s opacity;
    margin-top: var(--margin-span-burger);
  }
  span + span {
    margin-top: var(--margin-span-burger);
  }
  &.active {
    z-index: 14;
    span:first-child {
    transform-origin: center;
    transform:  translateY(calc(var(--margin-span-burger) + var(--height-span-burger)))  rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform-origin: center;
      transform:  translateY(calc(-1 * (var(--margin-span-burger) + var(--height-span-burger)) )) rotate(-45deg);
    }
  }
}

@media screen and (max-width:1000px){
  .grid-layout-contribute-navbar {
    padding-right: .5em;
  }
  .contribute-navbar-items {
    transition: transform .5s;
    position: fixed;
    width: auto;
    height: 100%;
    top: 0;
    background-color: rgb(255, 255, 255);
    justify-content: center;
    flex-direction: column;
    font-size: 1.4em;
    left: 0;
    transform: translateX(-110%);
    & > * + * {
      margin-top: .8em;
    }
    &.active {
      padding: 0 1.5em;
      transform: translateX(0);
    }
  }
  .burger {
    display: inline;
  }
}

.background-contribute-navbar {
  transition: background-color .2s;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.dark .background-contribute-navbar.active {
  background-color: rgba(38, 38, 38, 0.83);
}

.dark .contribute-navbar-items .contribute-navbar-link::after {
  background-color: white;
}

.dark .burger > span {
  background-color: white;
}
</style>
