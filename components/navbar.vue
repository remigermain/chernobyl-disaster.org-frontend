<template>
  <div class="grid-layout-navbar">
    <div class="background-navbar" :class="{'active': active, 'hidden': !active }" @click="ative = false" />
    <label class="burger" :class="{'active': active }" @click="toogleNavbar">
      <span class="bg-gray-700" />
      <span class="bg-gray-700" />
      <span class="bg-gray-700" />
    </label>
    <nav class="navbar-items" :class="{'active': active }" :role="$t('utils.navigation')" aria-label="$t('utils.site-navigation ')">
      <lazy-extra-nuxt-link :to="{name: 'index'}" class="navbar-link exact"
                            :title="$t('utils.goto-home')"
                            @click="active = false"
      >
        {{ $t('menu.home') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'timeline'}" class="navbar-link"
                            :title="$t('utils.goto-timeline')"
                            @click="active = false"
      >
        {{ $t('menu.timeline') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery'}" class="navbar-link"
                            :title="$t('utils.goto-gallery')"
                            @click="active = false"
      >
        {{ $t('menu.gallery') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="contributeLink" class="navbar-link"
                            :title="$t('utils.goto-contribute')"
                            @click="active = false"
      >
        {{ $t('menu.contribute') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'about'}" class="navbar-link"
                            :title="$t('utils.goto-about')"
                            @click="active = false"
      >
        {{ $t('menu.about') }}
      </lazy-extra-nuxt-link>
      <label :name="$t('utils.change-language')">
        <select v-model="value" class="form-select block mt-1 bg-gray-400 bg-opacity-25">
          <option v-for="lang in $i18n.locales" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </label>
      <button v-if="$auth.loggedIn" class="hover:text-gray-700 transform transition-transform duration-300 hover:scale-105" @click="$auth.logout()">
        <svg-icon name="logout" />
        {{ $t('auth.logout') }}
      </button>
    </nav>
  </div>
</template>

<script>

export default {

  data () {
    return {
      active: false,
      value: this.$i18n.locale
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

@media screen and (max-width:1000px){
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

@media screen and (max-width:900px){
  .burger {
    display: inline;
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
  z-index: 1;
  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

@media screen and (max-width: 900px){
  .background-navbar {
    display: hidden;
  }
}

</style>
