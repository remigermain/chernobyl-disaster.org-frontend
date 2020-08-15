<template>
  <div class="grid-layout-contribute-navbar">
    <div class="background-contribute-navbar" :class="{'active': active, 'hidden': !active }" />
    <label class="burger" :class="{'active': active }" @click="toogleNavbar">
      <span class="bg-gray-700" />
      <span class="bg-gray-700" />
      <span class="bg-gray-700" />
    </label>
    <nav class="contribute-navbar-items" :class="{'active': active }">
      <button class="contribute-navbar-link" @click="$auth.logout()">
        <icon-logout />
        {{ $t('auth.logout') }}
      </button>
      <lazy-extra-nuxt-link v-for="menu in menus" :key="menu.to.name" :to="menu.to" class="contribute-navbar-link" @click="active = false">
        {{ menu.name }}
      </lazy-extra-nuxt-link>
    </nav>
  </div>
</template>

<script>
import iconLogout from "@/assets/svg/logout.svg"

export default {

  components: {
    iconLogout
  },

  data () {
    return {
      active: false,
      menus: [
        {
          name: this.$t("admin.label.account"),
          to: {name: "contribute-account"}
        },
        {
          name: this.$t("admin.label.event"),
          to: {name: "contribute-event"}
        },
        {
          name: this.$t("admin.label.people"),
          to: {name: "contribute-people"}
        },
        {
          name: this.$t("admin.label.tag"),
          to: {name: "contribute-tag"}
        },
        {
          name: this.$t("admin.label.picture"),
          to: {name: "contribute-picture"}
        },
        {
          name: this.$t("admin.label.video"),
          to: {name: "contribute-video"}
        },
        {
          name: this.$t("admin.label.document"),
          to: {name: "contribute-document"}
        },
        {
          name: this.$t("admin.label.article"),
          to: {name: "contribute-article"}
        },
      ]
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

@media screen and (min-width: 900px){
  .grid-layout-contribute-navbar {
    display: block;
    margin-top: 5rem;
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
    &.nuxt-link-exact-active {
      opacity: 1;
      &::after, &::after {
        width: 100%;
        opacity: 1;
      }
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
}

@media screen and (max-width:900px){
  .grid-layout-contribute-navbar {
    padding-right: .5em;
    .contribute-navbar-items {
      transition: transform var(--contribute-navbar--annimation-duration);
      position: fixed;
      width: 50%;
      min-width: 250px;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgb(255, 255, 255);
      justify-content: center;
      flex-direction: column;
      visibility: hidden;
      font-size: 1.4em;
      transform: translateX(100%);
      & > * + * {
        margin-top: .8em
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

@media screen and (max-width:900px){
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
</style>
