<template>
  <div class="grid-layout-navbar">
    <div class="background-navbar" :class="{'active': active, 'hidden': !active }" @click="ative = false" />
    <label class="burger" :class="{'active': active }" @click="toogleNavbar">
      <span class="bg-gray-700 dark:bg-gray-100" />
      <span class="bg-gray-700 dark:bg-gray-100" />
      <span class="bg-gray-700 dark:bg-gray-100" />
    </label>
    <nav class="navbar-items relative" :class="{'active': active }" :role="$t('utils.navigation')" aria-label="$t('utils.site-navigation ')">
      <nuxt-link :to="localePath({name: 'index'})" class="navbar-link exact" :title="$t('utils.goto-home')" @click.native="active = false">
        {{ $t('menu.home') }}
      </nuxt-link>
      <nuxt-link :to="localePath({name: 'timeline'})" class="navbar-link" :title="$t('utils.goto-timeline')" @click.native="active = false">
        {{ $t('menu.timeline') }}
      </nuxt-link>
      <nuxt-link :to="localePath({name: 'gallery'})" class="navbar-link" :title="$t('utils.goto-gallery')" @click.native="active = false">
        {{ $t('menu.gallery') }}
      </nuxt-link>
      <nuxt-link :to="localePath(contributeLink)" class="navbar-link" :title="$t('utils.goto-contribute')" @click.native="active = false">
        {{ $t('menu.contribute') }}
      </nuxt-link>
      <nuxt-link :to="localePath({name: 'about'})" class="navbar-link" :title="$t('utils.goto-about')" @click.native="active = false">
        {{ $t('menu.about') }}
      </nuxt-link>
      <div class="absolute settings-child right-0 top-0 p-6 shadow-md rounded-md space-y-4 mt-8" :class="{'settings-show': activeSetting, 'settings-hide': !activeSetting}">
        <button v-if="$auth.loggedIn" class="transform transition-transform duration-300 hover:scale-105" @click="$auth.logout()">
          <svg-icon name="logout" />
          {{ $t('auth.logout') }}
        </button>
        <div class="flex justify-around">
          <svg-icon name="sun"  class="w-10 h-10 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer p-2 bg-white text-gray-800"
                    @click="setLight"
          />
          <svg-icon name="moon" class="w-10 h-10 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer p-2 bg-black text-white dark:bg-gray-900"
                    @click="setDark"
          />
        </div>
        <label for="lang" class="flex justify-center items-center flex-col gap-y-2">
          <span class="text-lg leading-3 italic text-gray-700 font-medium dark:text-gray-200">
            {{ $t('utils.language') }}:
          </span>
          <select v-model="value" name="lang" class="form-select block mt-1 bg-gray-400 bg-opacity-50 text-center">
            <option v-for="lang in $i18n.locales" :key="lang.code" :value="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </label>
      </div>
      <svg-icon name="settings" class="relative settings-btn cursor-pointer transform transition-transform duration-300 hover:scale-110 block text-xl"
                @click="activeSetting = !activeSetting"
      />
    </nav>
  </div>
</template>

<script>

export default {

  data () {
    return {
      active: false,
      value: this.$i18n.locale,
      activeSetting: false,
    }
  },

  computed: {
    contributeLink () {
      return {name: (this.$auth.loggedIn ? "contribute" : "auth")}
    },
  },

  watch: {
    value (val) {
      this.$router.push(this.switchLocalePath(val))
    }
  },

  methods: {
    toogleNavbar () {
      this.active = !this.active
    },
    setLight () {
      this.$colorMode.preference = "light"
    },
    setDark () {
      this.$colorMode.preference = "dark"
    }
  }

}
</script>

<style lang="scss">

.grid-layout-navbar {
  grid-area: 1 / 5 / 2 / 11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  font-size: 1.2rem;
}

.navbar-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 3;
  padding-bottom: .5em;
  .navbar-link {
    opacity: .5;
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
    &::first-letter {
      text-transform: capitalize;
    }
    &:not(.exact).nuxt-link-active, &.exact.nuxt-link-exact-active {
      opacity: 1;
      &::after, &::after {
        width: 100%;
        opacity: 1;
      }
    }
  }
}

.dark .navbar-items .navbar-link::after {
  background-color: white;
}

@media screen and (max-width:1300px){
  .grid-layout-navbar {
    grid-area: 1 / 4 / 2 / 11;
  }
}

@media screen and (max-width:1200px){
  .grid-layout-navbar {
    grid-area: 1 / 3 / 2 / 11;
  }
}

.burger {
  --height-span-burger: 6px;
  --margin-span-burger: 4px;
  display: none;
  width: 40px;
  cursor: pointer;
  z-index: 4;
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

.background-navbar {
  transition: background-color .2s;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.dark .background-navbar.active {
  background-color: rgba(38, 38, 38, 0.83);
}

@media screen and (min-width:1000px){
  .settings-hide {
    visibility: hidden;
  }
}

.settings-child {
  @apply bg-white
}

.dark {
  .settings-child {
    @apply bg-gray-800
  }
}


@media screen and (max-width:1000px){

  .settings-child {
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: unset
  }
  .settings-btn {
    display: none;
  }

  .burger {
    display: inline;
  }
  .background-navbar {
    display: hidden;
  }
  .grid-layout-navbar {
    grid-area: 1 / 10 / 2 / 11;
    justify-self: center;
    padding-right: .5em;
    .navbar-items {
      transition: transform .5s;
      position: fixed;
      height: 100%;
      width: 50%;
      min-width: 250px;
      top: 0;
      right: 0;
      background-color: rgb(255, 255, 255);
      justify-content: center;
      flex-direction: column;
      transform: translateX(110%);
      font-size: 1.4em;
      & > * + * {
        margin-top: 2em
      }
      &.active {
        transform: translateX(0);
      }
    }
  }
  .dark .grid-layout-navbar .navbar-items {
    @apply bg-gray-800
  }
}

</style>
