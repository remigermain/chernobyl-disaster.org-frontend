<template>
  <div class="grid-layout-navbar">
    <div
      class="background-navbar"
      :class="{ active: active, hidden: !active }"
      @click="ative = false"
    />
    <span class="burger" :class="{ active: active }" @click="toogleNavbar">
      <span class="bg-gray-700 dark:bg-gray-100" />
      <span class="bg-gray-700 dark:bg-gray-100" />
      <span class="bg-gray-700 dark:bg-gray-100" />
    </span>
    <nav
      class="navbar-items relative"
      :class="{ active: active }"
      :aria-label="$t('text.site-navigation')"
    >
      <nuxt-link
        :to="localePath({ name: 'index' })"
        class="navbar-link exact"
        :title="$t('text.goto-home')"
      >
        {{ $t('menu-name.home') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath({ name: 'timeline' })"
        class="navbar-link"
        :title="$t('text.goto-timeline')"
      >
        {{ $t('menu-name.timeline') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath({ name: 'gallery' })"
        class="navbar-link"
        :title="$t('text.goto-gallery')"
      >
        {{ $t('menu-name.gallery') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath(contributeLink)"
        class="navbar-link"
        :title="$t('text.goto-contribute')"
      >
        {{ $t('menu-name.contribute') }}
      </nuxt-link>
      <nuxt-link
        :to="localePath({ name: 'about' })"
        class="navbar-link"
        :title="$t('text.goto-about')"
      >
        {{ $t('menu-name.about') }}
      </nuxt-link>
      <div class="settings-box">
        <svg-icon
          name="settings"
          class="relative settings-btn cursor-pointer transform transition-transform duration-300 hover:scale-110 block text-xl"
        />
        <div class="absolute settings-child right-0 top-0 pt-6 rounded-md">
          <div
            class="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg mobile:shadow-lg dark:shadow-none"
          >
            <button
              v-if="$auth.loggedIn"
              type="button"
              class="transform transition-transform duration-300 hover:scale-105"
              @click="$auth.logout()"
            >
              <svg-icon name="logout" />
              {{ $t('authentication.logout') }}
            </button>
            <div class="flex justify-around">
              <svg-icon
                name="sun"
                class="w-10 h-10 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer p-2 bg-white text-gray-800"
                @click="setLight"
              />
              <svg-icon
                name="moon"
                class="w-10 h-10 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer p-2 bg-black text-white dark:bg-gray-900"
                @click="setDark"
              />
            </div>
            <label class="flex justify-center items-center flex-col gap-y-2">
              <span
                class="text-lg leading-3 italic text-gray-700 font-medium dark:text-gray-200"
              >
                {{ $t('word.language') }}:
              </span>
              <select
                v-model="value"
                class="form-select block mt-1 bg-gray-400 bg-opacity-50 text-center"
              >
                <option
                  v-for="lang in $i18n.locales"
                  :key="lang.code"
                  :value="lang.code"
                >
                  {{ lang.name }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      value: this.$i18n.locale,
      activeSetting: false
    }
  },

  computed: {
    contributeLink() {
      return { name: this.$auth.loggedIn ? 'contribute' : 'auth-login' }
    }
  },

  watch: {
    value(val) {
      this.$router.push(this.switchLocalePath(val))
    },
    $route() {
      this.active = false
    }
  },

  methods: {
    toogleNavbar() {
      this.active = !this.active
    },
    setLight() {
      this.$colorMode.preference = 'light'
    },
    setDark() {
      this.$colorMode.preference = 'dark'
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
  z-index: 5;
  padding-bottom: 0.5em;
  .navbar-link {
    opacity: 0.5;
    &:hover {
      opacity: 1;
      &::after {
        width: 100%;
        opacity: 1;
      }
    }
    &::after {
      transition: width 0.4s, opacity 0.5s;
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
    &:not(.exact).nuxt-link-active,
    &.exact.nuxt-link-exact-active {
      opacity: 1;
      &::after,
      &::after {
        width: 100%;
        opacity: 1;
      }
    }
  }
}

.dark .navbar-items .navbar-link::after {
  background-color: white;
}

@media screen and (max-width: 1300px) {
  .grid-layout-navbar {
    grid-area: 1 / 4 / 2 / 11;
  }
}

@media screen and (max-width: 1200px) {
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
  z-index: 6;
  span {
    display: block;
    border-radius: 0.25rem;
    height: var(--height-span-burger);
    transition: 0.2s transform, 0.2s opacity;
    margin-top: var(--margin-span-burger);
  }
  span + span {
    margin-top: var(--margin-span-burger);
  }
  &.active {
    span:first-child {
      transform-origin: center;
      transform: translateY(
          calc(var(--margin-span-burger) + var(--height-span-burger))
        )
        rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform-origin: center;
      transform: translateY(
          calc(-1 * (var(--margin-span-burger) + var(--height-span-burger)))
        )
        rotate(-45deg);
    }
  }
}

.background-navbar {
  transition: background-color 0.2s;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.dark .background-navbar.active {
  background-color: rgba(38, 38, 38, 0.83);
}

@media screen and (min-width: 1000px) {
  .settings-child {
    z-index: 6;
    visibility: hidden;
    &:hover {
      visibility: visible;
    }
  }

  .settings-box:hover .settings-child {
    visibility: visible;
  }
}

.settings-child {
  background-color: transparent;
}

@media screen and (max-width: 1000px) {
  .settings-child {
    position: relative;
    display: flex;
    flex-direction: column;
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
    padding-right: 0.5em;
    .navbar-items {
      transition: transform 0.5s;
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
      overflow-y: scroll;
      & > * + * {
        margin-top: 2em;
      }
      &.active {
        transform: translateX(0);
      }
    }
  }
  .dark .grid-layout-navbar .navbar-items {
    @apply bg-gray-800;
  }
}

@media screen and (max-width: 700px) {
  .grid-layout-navbar .navbar-items > * + * {
    margin-top: 0;
  }
}
</style>
