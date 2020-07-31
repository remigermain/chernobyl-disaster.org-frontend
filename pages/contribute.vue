<template>
  <div class="wrapper">
    <div class="shadow-lg">
      <h2 class="text-center text-3xl capitalize font-normal italic">
        {{ $t('global.menu') }}
      </h2>
      <ul class="ml-2">
        <li class="px-2 py-3">
          <icon-user />
          <extra-nuxt-link :to="{name: 'contribute-account'}" class="contribut-link italic capitalize rounded-lg">
            {{ $t("pages.contribute.account") }}
          </extra-nuxt-link>
        </li>
        <li class="px-2 py-3">
          <icon-inbox />
          <extra-nuxt-link :to="{name: 'contribute-contact'}" class="contribut-link italic capitalize rounded-lg">
            {{ $t("pages.contribute.contact") }}
          </extra-nuxt-link>
        </li>
      </ul>
      <ul class="ml-2">
        <li v-for="el in menus" :key="el.name" class="px-2 py-3">
          <icon-arrow-bar-left v-show="exactLink(el.to)" />
          <extra-nuxt-link :to="el.to" class="contribut-link italic capitalize rounded-lg">
            {{ el.name }}
          </extra-nuxt-link>
        </li>
      </ul>
    </div>
    <div class="p-4">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import iconArrowBarLeft from "@/assets/svg/arrow-bar-left.svg"
import iconUser from "@/assets/svg/user.svg"
import iconInbox from "@/assets/svg/inbox.svg"
export default {
  components: {
    iconArrowBarLeft,
    iconUser,
    iconInbox
  },
  data () {
    return {
      menus: [
        {
          name: this.$t("pages.contribute.event"),
          to: {name: "contribute-event"}
        },
        {
          name: this.$t("pages.contribute.picture"),
          to: {name: "contribute-picture"}
        },
        {
          name: this.$t("pages.contribute.article"),
          to: {name: "contribute-article"}
        },
        {
          name: this.$t("pages.contribute.video"),
          to: {name: "contribute-video"}
        },
        {
          name: this.$t("pages.contribute.document"),
          to: {name: "contribute-document"}
        },
        {
          name: this.$t("pages.contribute.people"),
          to: {name: "contribute-people"}
        },
      ],
    }
  }
}
</script>

<style lang="scss">
.contribute-menu > * {
  padding: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
.contribut-link {
  transition: transform .4s;
  &.nuxt-link-exact-active {
    transform: translateX(15%);
    color: rgba(66, 18, 155, 0.925)
  }
}
</style>
