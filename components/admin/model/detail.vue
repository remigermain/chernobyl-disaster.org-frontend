<template>
  <div class="dark:bg-gray-800 rounded-md shadow-lg py-4">
    <slot name="head" />
    <div class="p-4 space-y-2">
      <div
        class="rounded-full text-center text-gray-800 bg-gray-400 text-2xl py-2 dark:bg-indigo-700 dark:text-gray-300"
      >
        <svg-icon name="language" />
        {{ $t('word.translation') }}
      </div>
      <div class="grid-lang">
        <admin-utils-navbar-lang v-model="currentLang" :object="object.langs" />
        <div class="p-2">
          <div v-if="currentObj">
            <admin-action-delete
              v-if="currentObj._new || $auth.hasScope('staff')"
              @click="acticeModalDelete = true"
            >
              {{ $t('word.delete') }}
            </admin-action-delete>
            <slot
              name="lang"
              :current-obj="currentObj"
              :language="currentLang"
            />
          </div>
          <div
            v-else-if="currentLang.value"
            class="flex justify-center items-center flex-col h-full space-y-4"
          >
            <span class="text-xl capitalize">{{
              currentLang.display_name
            }}</span>
            <p
              class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700"
            >
              {{ $t('message.language-dosent-exist') }}
            </p>
            <nuxt-link
              :to="linkEditAddLang"
              type="button"
              class="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-full shadow-md text-gray-200"
            >
              <svg-icon name="plus" />
              {{ $t('word.add') }}
            </nuxt-link>
          </div>
          <div
            v-else
            class="flex justify-center items-center flex-col h-full space-y-4"
          >
            <p
              class="p-2 bg-gray-300 whitespace-pre-line rounded-md dark:bg-gray-700"
            >
              {{ $t('message.language-no-selected') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <admin-utils-modal
      v-if="acticeModalDelete"
      @close="acticeModalDelete = false"
      @delete="submitDelete"
    />
  </div>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      required: true
    },
    toEdit: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currentLang: {},
      acticeModalDelete: false
    }
  },

  computed: {
    currentObj() {
      return this.object.langs.find(x => x.language === this.currentLang.value)
    },
    currentIndex() {
      return this.object.langs.indexOf(this.currentObj)
    },
    linkEditAddLang() {
      return this.localePath({
        ...this.toEdit,
        query: { add: this.currentLang.value }
      })
    }
  },
  methods: {
    submitDelete() {
      this.acticeModalDelete = false
      this.$emit('delete', this.currentIndex)
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
