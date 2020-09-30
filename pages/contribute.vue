<template>
  <div class="grid-contribute">
    <contribute-navbar :menus="menus" />
    <div class="grid-contribute-content overflow-y-scroll md:p-4 -md:pt-4 min-h-full">
      <nuxt-child :key="$route.fullPath" />
      <div v-if="haveChild" class="flex flex-wrap justify-center p-4 gap-4 space-y-2">
        <contribute-user :object="object" />
        <div v-for="el in menus" :key="el.to.name" class="card-model shadow-lg rounded-md border-t-4 border-gray-500">
          <div>
            <h1 class="text-2xl capitalize italic text-opacity-75">
              {{ el.name }}
            </h1>
            {{ el.help }}
          </div>
          <extra-nuxt-link :to="el.to" class="text-center bg-gray-800 hover:bg-gray-700 text-white rounded-bl-lg"
                           :class="{'col-span-2 rounded-br-lg': !el.toCreate, 'border-gray-900 border-r-4': el.toCreate}"
          >
            {{ $t('utils.list') }}
          </extra-nuxt-link>
          <extra-nuxt-link v-if="el.toCreate" :to="el.toCreate" class="text-center bg-gray-800 hover:bg-gray-700 text-white rounded-br-lg">
            {{ $t('utils.create') }}
          </extra-nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contribute",

  middleware: [
    "model",
    "auth",
  ],

  layout: "default",
  transition: "page",

  asyncData({app}) {
    return app.$axios.get("populate/overview")
      .then(response => {
        if (response.status!==200) {
          throw new Error("error-server")
        }
        const results = response.data.results.map(o => {
          o.date = new Date(o.date)
          return o
        })
        return {
          object: {
            ...response.data,
            results
          }
        }
      })
      .catch((error) => {
        console.log(error)
        // TODO
      })
  },

  data () {
    return {
      menus: [
        {
          name: this.$t("admin.label.event"),
          help: this.$t("help.event.global-description"),
          to: {name: "contribute-event"},
          toCreate: {name: "contribute-event-create"}
        },
        {
          name: this.$t("admin.label.people"),
          help: this.$t("help.people.global-description"),
          to: {name: "contribute-people"},
          toCreate: {name: "contribute-people-create"}
        },
        {
          name: this.$t("admin.label.tag"),
          help: this.$t("help.tag.global-description"),
          to: {name: "contribute-tag"},
          toCreate: {name: "contribute-tag-create"}
        },
        {
          name: this.$t("admin.label.picture"),
          help: this.$t("help.picture.global-description"),
          to: {name: "contribute-picture"},
          toCreate: {name: "contribute-picture-create"}
        },
        {
          name: this.$t("admin.label.video"),
          help: this.$t("help.video.global-description"),
          to: {name: "contribute-video"},
          toCreate: {name: "contribute-video-create"}
        },
        {
          name: this.$t("utils.translation"),
          help: this.$t("help.translate.global-description"),
          to: {name: "contribute-translate"},
        },
      ]
    }
  },

  computed: {
    haveChild () {
      return this.$route.matched.length === 1
    }
  },

  mounted () {
    // refesh component when have not child
    if (this.haveChild) {
      this.__$timeout = setInterval(this.$nuxt.refresh, 20000)
    }
  },

  beforeDestroy () {
    clearInterval(this.__$timeout)
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
  &:hover {
    color: rgb(128, 9, 128);
    transform: translateX(10%);
  }
}


@media screen and (max-width:900px){
  .grid-contribute {
    display: block;
  }
}

.card-model {
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 1fr;
  & > *:first-child {
    grid-area: 1 / 1 / 1 / 3;
  }
  & > * {
    padding: 1em;
  }
}

</style>
