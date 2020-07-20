<template>
  <div class="flex justify-between text-xl capitalize items-center pr-10 grid-navbar">
    <input id="navbar" v-model="checkbox" type="checkbox" class="opacity-0 absolute w-10 h-10 z-50 cursor-pointer input-navbar" @click="setFixNavbar">
    <label for="navbar" class="opacity-0 absolute">
      navbar
    </label>
    <label class="burger cursor-pointer z-40">
      <span class="bg-gray-700 rounded-md" />
      <span class="bg-gray-700 rounded-md" />
      <span class="bg-gray-700 rounded-md" />
    </label>
    <div class="background-navbar z-20" />
    <nav class="navbar-items z-30 flex justify-between items-center w-full" :class="{'fix-navbar': fixNavbar}">
      <extra-nuxt-link :to="{name: 'index'}" class="home-link" @click="checkbox = false">
        {{ $t('global.home') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'timeline'}" class="home-link" @click="checkbox = false">
        {{ $t('global.timeline') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'gallery'}" class="home-link" @click="checkbox = false">
        {{ $t('global.gallery') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'about'}" class="home-link" @click="checkbox = false">
        {{ $t('global.about') }}
      </extra-nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkbox: false,
      fixNavbar: false,
      timeout: 0
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  methods: {
    setFixNavbar () {
      if (!this.checkbox) {
        this.fixNavbar = true
        clearTimeout(this.timeout)
      } else {
        this.timeout = setTimeout(() => {
          this.fixNavbar = false
        }, 400)
      }
    }
  }
}
</script>

<style lang="scss">

.fix-navbar {
  visibility: visible !important;
}

.grid-navbar {
  --navbar--annimation-duration: .4s;
}

.background-navbar {
  transition: background-color .4s;
}

.input-navbar {
  display: none;
}

.input-navbar:checked ~ .background-navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

@media screen and (max-width:900px){
  .input-navbar {
    display: inline-block;
  }
  .grid-navbar {
    padding-right: .5em;
    .burger {
      display: block;
    }
    .navbar-items {
      transition: transform var(--navbar--annimation-duration);
      position: fixed;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      background-color: rgb(255, 255, 255);
      justify-content: center;
      flex-direction: column;
      visibility: hidden;
      font-size: 1.4em;
      & > * + * {
        margin-top: 2em
      }
      transform: translateX(100%);
    }
    .input-navbar:checked ~ .navbar-items {
      visibility: visible;
      transform: translateX(0);
    }
  }
}

@keyframes menu-in {
  to {
    visibility: visible;
  }
}

@keyframes menu-out {
  to {
    visibility: hidden;
  }
}

.home-link {
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
  &.nuxt-link-exact-active::after {
    width: 100%;
    opacity: 1;
  }
  &:not(.nuxt-link-exact-active)
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

.burger {
  display: none;
  width: 40px;
}
.burger span {
  --height-span-burger: 6px;
  --margin-span-burger: 4px;
  display: block;
  height: var(--height-span-burger);
  transition: .2s transform, .2s opacity;
  margin-top: var(--margin-span-burger);
}
.burger span + span {
  margin-top: var(--margin-span-burger);
}

.input-navbar:checked ~ .burger span:nth-child(2){
  opacity: 0;
}

.input-navbar:checked ~ .burger span:first-child {
  transform-origin: center;
  transform:  translateY(calc(var(--margin-span-burger) + var(--height-span-burger)))  rotate(45deg);

}
.input-navbar:checked ~ .burger span:last-child {
  transform-origin: center;
  transform:  translateY(calc(-1 * (var(--margin-span-burger) + var(--height-span-burger)) )) rotate(-45deg);
}

</style>
