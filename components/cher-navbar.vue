<template>
  <div class="grid-navbar flex justify-between text-xl capitalize items-center pr-10">
    <input id="navbar" v-model="checkbox" type="checkbox" class="opacity-0 absolute w-10 h-10 z-5 cursor-pointer input-navbar" @click="setFixNavbar">
    <label for="navbar" class="opacity-0 absolute">
      navbar
    </label>
    <label class="burger cursor-pointer z-4">
      <span class="bg-gray-700 rounded-md" />
      <span class="bg-gray-700 rounded-md" />
      <span class="bg-gray-700 rounded-md" />
    </label>
    <div class="background-navbar z-2" />
    <nav class="navbar-items z-3 flex justify-between items-center w-full" :class="{'fix-navbar': fixNavbar}">
      <extra-nuxt-link :to="{name: 'home'}" class="link" @click="checkbox = false">
        {{ $t('global.home') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'timeline'}" class="link" @click="checkbox = false">
        {{ $t('global.timeline') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'gallery'}" class="link" @click="checkbox = false">
        {{ $t('global.gallery') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'contribute'}" class="link" @click="checkbox = false">
        {{ $t('global.contribute') }}
      </extra-nuxt-link>
      <extra-nuxt-link :to="{name: 'about'}" class="link" @click="checkbox = false">
        {{ $t('global.about') }}
      </extra-nuxt-link>
      <div class="relative lang-set rounded-lg">
        <span class="p-2 opacity-50 italic text-sm">{{ languageName }}</span>
        <icon-selector class="opacity-50" />
        <ul class="lang-list absolute bg-white rounded-lg p-2">
          <li v-for="lang in locales" :key="lang.iso">
            <nuxt-link class="link text-sm" :to="switchLocalePath(lang.code)">
              {{ lang.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import iconSelector from "@/assets/svg/selector.svg"
export default {

  components: {
    iconSelector
  },

  data () {
    return {
      checkbox: false,
      fixNavbar: false,
      timeout: 0
    }
  },

  computed: {
    languageName () {
      return this.$i18n.locales.filter(el => el.code === this.$i18n.locale)[0].name
    },
    locales () {
      return this.$i18n.locales.filter(el => el.code !== this.$i18n.locale)
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

  },
}
</script>

<style lang="scss">
.fix-navbar {
  visibility: visible !important;
}

.grid-navbar {
  --navbar--annimation-duration: .4s;
  grid-area: 1 / 3 / 2 / 6;
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
  opacity: 1;
}

@media screen and (min-width:900px) {
  .background-navbar {
    opacity: 0 !important;
  }
}

@media screen and (max-width:900px){
  .input-navbar {
    display: inline-block;
  }
  .grid-navbar {
    grid-area: 1 / 5 / 2 / 6;
    justify-self: center;
    padding-right: .5em;
    .burger {
      display: block;
    }
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

.lang-set {
  svg {
    transition: opacity .2s;
  }
  &:hover {
    svg {
      opacity: .8;
    }
    .lang-list {
      visibility: visible;
    }
  }
}

.lang-list {
  visibility: hidden;
}

</style>
