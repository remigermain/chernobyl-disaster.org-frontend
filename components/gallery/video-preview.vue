<template>
  <div class="relative w-inherit h-inherit rounded-lg">
    <img class="w-full h-full object-cover rounded-lg"
         :src="urlPreview"
         loading="lazy"
         role="button"
         tabindex="0"
         :alt="object.title || title || 'video'"
         type="image/jpeg"
         @click="setCurrent(el, idx)"
    >
    <h1 v-if="!mini" class="absolute top-0 left-0 bg-gray-900 m-3 rounded-full bg-opacity-75 z-2 p-2 truncate size-title block text-gray-400 font-medium">
      <admin-action-edit v-if="$auth.loggedIn && object.id" :to="toEdit" />
      <span class="truncate">
        {{ object.title || title }}
      </span>
    </h1>
    <a class="w-full h-full absolute top-0 left-0 duration-300 transition-opacity justify-center rounded-lg
          items-center flex z-1 video-hover group"
          target="_blank" rel="noopener,noreferer" :href="link"
    >
      <div class="bg-gray-900 bg-opacity-100 shadow-inner cursor-pointer border-b-indigo-700 border-b-4 transition-all duration-200 rounded-full p-1 text-center"
          :class="{'w-24': !mini, 'w-8': mini}"
      >
        <svg-icon name="player-play" class="text-gray-300 group-hover:scale-110 transform transition-transform duration-300"
            :class="{'text-5xl': !mini, 'text-base': mini}"
        />
      </div>
    </a>
  </div>
</template>

<script>
export default {

  props: {
    link: {
      type: String,
      default: "",
    },
    object: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: "title"
    },
    mini: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    url () {
      const reg = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9_-]+)/
      const matches = this.link.match(reg)
      if (matches && matches.length >= 2)
        return matches[1]
      return ""
    },
    urlPreview () {
      return `https://i.ytimg.com/vi/${this.url}/hqdefault.jpg`
    },
    toEdit () {
      return {name: 'contribute-video-id', params: {id: this.object.id}}
    }
  },

}
</script>


<style lang="scss" scoped>
.size-title {
  max-width: calc(100% - 4em);
  width: min-content;
}
.video-hover:hover {
  @apply bg-white;
  @apply bg-opacity-25;
}

.dark .video-hover:hover {
  @apply bg-gray-700;
  @apply bg-opacity-25;
}

</style>
