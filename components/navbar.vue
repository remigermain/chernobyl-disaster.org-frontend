<template>
  <div class="grid-layout-navbar">
    <div class="background-navbar" :class="{'active': active, 'hidden': !active }" />
    <label class="burger" :class="{'active': active }" @click="toogleNavbar">
      <span class="bg-gray-700" />
      <span class="bg-gray-700" />
      <span class="bg-gray-700" />
    </label>
    <nav class="navbar-items" :class="{'active': active }">
      <lazy-extra-nuxt-link :to="{name: 'home'}" class="navbar-link" @click="active = false">
        {{ $t('menu.home') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'timeline'}" class="navbar-link" @click="active = false">
        {{ $t('menu.timeline') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'gallery'}" class="navbar-link" @click="active = false">
        {{ $t('menu.gallery') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'contribute'}" class="navbar-link" @click="active = false">
        {{ $t('menu.contribute') }}
      </lazy-extra-nuxt-link>
      <lazy-extra-nuxt-link :to="{name: 'about'}" class="navbar-link" @click="active = false">
        {{ $t('menu.about') }}
      </lazy-extra-nuxt-link>
      <select v-model="value" class="form-select block mt-1 bg-gray-100">
        <option v-for="lang in $i18n.locales" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
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
  grid-area: 1 / 6 / 2 / 11;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
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
    &.nuxt-link-active {
      opacity: 1;
      &::after, &::after {
        width: 100%;
        opacity: 1;
      }
    }
    &:not(.nuxt-link-active)
    {
      opacity: .5;
      &:hover {
        opacity: 1;
        &::after {
          width: 100%;
          opacity: 1;
        }
      }
    }
  }
}

@media screen and (max-width:1200px){
  .grid-layout-navbar {
    grid-area: 1 / 5 / 2 / 11;
  }
}

@media screen and (max-width:1100px){
  .grid-layout-navbar {
    grid-area: 1 / 4 / 2 / 11;
  }
}

@media screen and (max-width:900px){
  .grid-layout-navbar {
    grid-area: 1 / 10 / 2 / 11;
    justify-self: center;
    padding-right: .5em;
    .navbar-items {
      transition: transform var(--navbar--annimation-duration);
      position: fixed;
      width: 50%;
      min-width: 250px;
      height: 100%;
      top: 0;
      right: 0;
      background-color: rgb(255, 255, 255);
      justify-content: center;
      flex-direction: column;
      visibility: hidden;
      font-size: 1.4em;
      transform: translateX(100%);
      & > * + * {
        margin-top: 2em
      }
      &.active {
        visibility: visible;
        transform: translateX(0);
      }
    }
  }
}


</style>


// burger
<style lang="scss" scoped>
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
  &.active {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

</style>
