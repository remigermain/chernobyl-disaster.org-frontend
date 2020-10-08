<template>
  <div>
    <form class="dark:bg-gray-800 rounded-md shadow-lg" @submit.prevent="$emit('submit', $event)">
      <slot name="head" />
      <div class="p-4 space-y-2">

        <div class="rounded-md text-center text-gray-800 bg-gray-400 text-2xl py-2 dark:bg-indigo-700 dark:text-gray-300">
          <svg-icon name="language" />
          {{ $t('word.language')}}
        </div>
        <div class="grid-lang">

          <!-- start menu  -->
          <model-navbar-lang v-model="currentLang" :object="value.langs" :errors="errors.langs" />
          <!-- end menu  -->

          <div class="p-2">

            <!-- slot -->
            <div v-if="currentObj">
              <button v-if="currentObj._new || $auth.hasScope('staff')" class="bg-red-200 py-1 px-3 rounded-md" @click.stop.prevent="deleteObject">
                <action-delete  />
              </button>
              <slot name="lang" :current-obj="currentObj" :current-error="getErrorIdx()"/>
            </div>

            <!-- no current language -->
            <div v-else-if="currentLang.value" class="flex justify-center items-center flex-col h-full space-y-4">
              <span class="text-xl capitalize">{{ currentLang.display_name }}</span>
              <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-dosent-exist') }}</p>
              <button type="button" class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md shadow-md text-gray-200"
                      @click.stop.prevent="$emit('add', currentLang.value)"
              >
                <svg-icon name="plus" />
                {{ $t('word.add') }}
              </button>
            </div>

            <!-- no current selected -->
            <div v-else class="flex justify-center items-center flex-col h-full space-y-4">
              <p class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700">{{ $t('help.language-no-selected') }}</p>
            </div>

          </div>

          <!-- all submit action -->
          <form-submit class="col-span-2"/>
        </div>
      </div>
    </form>

    <!-- modal for delete lang -->
    <admin-modal v-if="activeModal" @close="activeModal = false" @delete="submitDelete"/>
  </div>
</template>

<script>

export default {

  props: {
    errors: {
      type: Object,
      required: true,
    },
    deleteModel: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      activeModal: false,
      currentLang: {},
    }
  },

  computed: {
    currentObj () {
      return this.value.langs.find(x => x.language === this.currentLang.value)
    },
    currentIndex () {
      return this.value.langs.indexOf(this.currentObj)
    },
  },

  watch: {
    value: {
      handler (newValue) {
        this.$emit('input', newValue)
      },
      deep: true
    },
  },

  methods: {

    getErrorIdx() {
      /* get idx of error langs */
      return this.errors.langs[this.currentIndex] || {}
    },

    submitDelete() {
      /* remove only lang object ( only admin user ) */
      this.$store.commit("ON_LOADING")
      this.activeModal = false

      this.$axios.delete(`${this.deleteModel}/${this.currentObj.id}/`)
        .then(response => {
          if (response.status !== 204) {
            throw new Error("errer-server")
          }
          this.i18nToast.success(this.$t('message.delete'))
          // delete object
          this.$delete(this.value.langs, this.currentIndex)
        })
        .catch(error => { this.responseError(error) })
        .finally(() => this.$store.commit("ON_LOADING"))
    },
    deleteObject () {
      if (this.currentObj._new) {
        /* remove directly in array if is a new elements */
        this.$delete(this.value.langs, this.currentIndex)
      } else {
        this.activeModal = true
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.grid-lang {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
