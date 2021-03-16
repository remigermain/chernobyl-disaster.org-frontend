<template>
  <article class="wrapper">
    <div class="timeline-date -sm:flex-row">
      <time
        :datetime="current.date.date"
        class="text-4xl -sm:text-lg -sm:font-semibold"
      >
        {{ getDateYear(current.date.date) }}
      </time>
      <lazy-timeline-time :date="current.date" />
    </div>
    <h1
      class="timeline-title text-4xl -sm:text-lg capitalize italic text-center"
    >
      <nuxt-link
        v-if="$auth.loggedIn && toEdit"
        :to="localePath(toEdit)"
        class="toolbar-item"
        :title="$t('word.edit')"
      >
        <svg-icon name="edit" class="w-inherit h-inherit" />
      </nuxt-link>
      {{ i18nAttr(current, 'title') }}
    </h1>
    <section class="overflow-y-scroll ql-snow">
      <div
        class=" inline timeline-text p-4 leading-6 ql-editor antialiased text-lg"
        v-html="i18nAttr(current, 'description')"
      />
    </section>
    <lazy-timeline-extra class="timeline-extra" :object="current" />
  </article>
</template>

<script>
import 'quill/dist/quill.snow.css'
export default {
  name: 'TimelineDetail',

  props: {
    current: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      toEdit: { name: 'contribute-event-id', params: { id: this.current.id } }
    }
  },

  head() {
    const title = this.i18nAttr(this.current, 'title')
    const description = this.i18nAttr(this.current, '_description').slice(
      0,
      159
    )
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:card', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  },

  computed: {
    hours() {
      const h = this.current.date.getHours().toString()
      return h.length === 1 ? `0${h}` : h
    },
    minutes() {
      const h = this.current.date.getMinutes().toString()
      return h.length === 1 ? `0${h}` : h
    },
    seconds() {
      const h = this.current.date.getSeconds().toString()
      return h.length === 1 ? `0${h}` : h
    }
  },

  methods: {
    getDateYear(date) {
      return date.toLocaleDateString(this.$i18n.locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 850px) {
  .timeline-date,
  .timeline-list,
  .timeline-text,
  .timeline-extra,
  .timeline-title {
    grid-area: unset !important;
  }
}

.timeline-date {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
}
.timeline-title {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timeline-text {
  grid-area: 2 / 2 / 2 / 3;
}
.timeline-extra {
  grid-area: 3 / 2 / 4 / 3;
}

.toolbar-item {
  height: inherit;
  margin-right: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: rgb(185, 185, 185);
  }
}
</style>
