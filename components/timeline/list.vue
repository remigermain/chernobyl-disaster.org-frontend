<template>
  <div class="wrapper">
    <div
      class="timeline-list-grid shadow-lg rounded-md border-t-8 border-gray-800"
      :class="{ active: active }"
    >
      <section id="timeline" class="timeline overflow-y-scroll">
        <section
          v-for="obj in listCopy"
          :key="obj.id"
          class="timeline-content relative z-0 pl-2"
        >
          <header
            class="timeline-date flex items-center text-center flex-col px-4"
          >
            <time :datetime="obj.date.date.getFullYear()" class="text-3xl">
              {{ obj.date.date.getFullYear() }}
            </time>
            <time
              :datetime="getDate(obj.date.date, $i18n.locale)"
              class="text-md italic text-gray-700 dark:text-gray-400"
            >
              {{ getDate(obj.date.date, $i18n.locale) }}
            </time>
          </header>
          <section class="timeline-item mr-1">
            <nuxt-link
              v-for="element in obj.list"
              :id="element.id"
              :key="`${obj.id}-${element.id}`"
              :to="
                localePath({
                  name: 'timeline-slug',
                  params: { slug: element.slug }
                })
              "
              class="timeline-element group block p-4 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-700 text-white relative rounded-md mt-1"
              :class="{
                'bg-gray-700': current.id === element.id,
                'bg-gray-800 dark:bg-gray-900': current.id !== element.id
              }"
              :title="i18nAttr(element, 'title')"
            >
              <span
                class="timeline-point shadow-sm"
                :class="{
                  'active bg-indigo-600': current.id === element.id,
                  'bg-blue-800': current.id !== element.id
                }"
              />
              <lazy-timeline-min-time :date="element.date" />
              <h2 class="dark:text-gray-400 word-break">
                {{ i18nAttr(element, 'title') }}
              </h2>
            </nuxt-link>
          </section>
        </section>
      </section>
      <div
        class="w-full h-full flex justify-center bg-gray-900 rounded-b-md text-white overflow-hidden"
      >
        <nuxt-link
          :to="localePath({ name: 'timeline-slug', params: { slug: prevId } })"
          class="w-2/4 inline-block h-full"
          :title="$t('text.previous-event')"
        >
          <svg-icon
            name="arrow-left"
            class="h-full w-full hover:text-gray-300 hover:-translate-x-2 transform transition-transform duration-400"
            :aria-label="$t('text.previous-event')"
          />
        </nuxt-link>
        <nuxt-link
          :to="localePath({ name: 'timeline-slug', params: { slug: nextId } })"
          class="w-2/4 inline-block h-full"
          :title="$t('text.next-event')"
        >
          <svg-icon
            name="arrow-right"
            class="h-full w-full hover:text-gray-300 hover:translate-x-2 transform transition-transform duration-400"
            :aria-label="$t('text.next-event')"
          />
        </nuxt-link>
      </div>
      <div
        class="icon-timeline w-6 h-12 bg-blue-800 text-gray-800 shadow-lg dark:text-gray-400"
        :class="{ 'active rounded-l-full': active, 'rounded-r-full': !active }"
        :aria-label="$t('text.open-menu')"
        @click="toogleActive"
      >
        <svg-icon name="arrow-right" class="w-8 text-white text-xl" />
      </div>
    </div>
    <div
      class="background-navbar"
      :class="{ active: active, hidden: !active }"
      @click="active = false"
    />
  </div>
</template>

<script>
import { timelineElement } from '~/lib/timeline'
import { getDate } from '~/lib/date'

export default {
  props: {
    object: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      listCopy: this.listCreate(),
      current: {},
      active: false
    }
  },

  computed: {
    hasNext() {
      return this.object.indexOf(this.current) + 1 < this.object.length
    },
    hasPrev() {
      return this.object.indexOf(this.current) > 0
    },
    nextId() {
      if (this.hasNext) {
        return this.object[this.object.indexOf(this.current) + 1].slug
      }
      return this.current.slug
    },
    prevId() {
      if (this.hasPrev) {
        return this.object[this.object.indexOf(this.current) - 1].slug
      }
      return this.current.slug
    }
  },

  watch: {
    object() {
      this.listCopy = this.listCreate()
    },
    '$route.params': {
      handler(params) {
        return this.setCurrent(timelineElement(this.object, params.slug))
      }
    },
    current() {
      this.scroll()
    }
  },

  created() {
    return this.setCurrent(
      timelineElement(this.object, this.$route.params.slug)
    )
  },

  methods: {
    getDate,
    toogleActive() {
      this.active = !this.active
    },
    scroll() {
      if (process.client) {
        const el = document.getElementById(this.current.id)
        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          })
        }
      }
    },
    compareDate(original, newEl) {
      return (
        newEl.getFullYear() !== original.getFullYear() ||
        newEl.getMonth() !== original.getMonth() ||
        newEl.getDay() !== original.getDay()
      )
    },
    listCreate() {
      /*
       ** function to construct list of element
       */
      const list = []
      this.object.forEach((el, idx) => {
        if (
          list.length === 0 ||
          this.compareDate(list[list.length - 1].date.date, el.date.date)
        ) {
          list.push({ date: el.date, id: idx, list: [el] })
        } else {
          list[list.length - 1].list.push(el)
        }
      })
      return list
    },
    setCurrent(element) {
      this.$router.push(
        this.localePath({
          name: 'timeline-slug',
          params: { slug: element.slug }
        })
      )
      this.current = element
      this.scroll()
      this.$emit('select', element)
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  & > *:not(:first-child) {
    margin-top: 2em;
  }
  & > *:first-child {
    margin-top: 0.5em;
  }
  & > *:last-child {
    margin-bottom: 1em;
  }
}

.timeline-date {
  grid-area: 1 / 1 / 1 / 2;
}

.timeline-item {
  grid-area: 1 / 2 / 1 / 4;
}

@media screen and (min-width: 850px) {
  .timeline > *:nth-child(2n + 2) {
    & > .timeline-date {
      grid-area: 1 / 3 / 1 / 4;
      // order: 1;
    }
    & > .timeline-item {
      grid-area: 1 / 1 / 1 / 3;
    }
    .timeline-element {
      @apply border-r-8;
      @apply border-black;
      @apply border-l-0;
    }
    .timeline-point {
      right: calc((var(--size) + 8px) / 2 * -1);
      left: unset;
    }
  }
}

.word-break {
  word-break: break-word;
}

.timeline-element {
  @apply border-l-8;
  @apply border-black;
  @apply border-r-0;
}

.timeline-point {
  --size: 1em;
  position: absolute;
  top: var(--size);
  // 8 px === border size
  left: calc((var(--size) + 8px) / 2 * -1);
  right: unset;
  transform-origin: center;
  transition: transform 0.2s;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  &.active,
  &:hover {
    transform: scale(1.5);
  }
}

.timeline-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
}

.timeline-list-grid {
  grid-area: 2 / 1 / 4 / 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  background: linear-gradient(white 1%, #0909094d);
}

.dark .timeline-list-grid {
  background: unset;
  @apply bg-gray-800;
}

.icon-timeline {
  display: none;
  position: absolute;
  top: 50vh;
  right: 0;
  cursor: pointer;
  transition: transform 0.5s;
}

@media screen and (max-width: 850px) {
  .timeline-list-grid {
    position: absolute;
    top: 1vh;
    left: 1vw;
    width: 50vw;
    height: 98vh;
    max-width: 400px;
    transition: transform 0.5s;
    transform: translateX(calc(-100% - 1.1vw));
    z-index: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    background-color: white;
    &.active {
      z-index: 40;
      transform: translateX(0);
    }
  }
  .icon-timeline {
    display: flex;
    align-items: center;
    z-index: 0;
    transform: translateX(100%);
    transition: transform 0.5s;
    &:hover {
      transform: translateX(100%) scale(1.4);
    }
    & > svg {
      transition: transform 0.5s;
    }
    &.active {
      z-index: 41;
      transform: translateX(0);
      &:hover {
        transform: translateX(-0.3em) scale(1.4);
      }
      & > svg {
        transform: rotate(-180deg);
      }
    }
  }
  .timeline-content {
    display: grid;
    grid-template-columns: 1fr;
    .timeline-item {
      grid-area: 2 / 1 / 2 / 2;
    }
    .timeline-date {
      grid-area: 1 / 1 / 1 / 2;
    }
  }

  .background-navbar {
    transition: background-color 0.2s;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 39;
    &.active {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}

@media screen and (max-width: 450px) {
  .timeline-list-grid {
    width: 98vw;
    height: 98vh;
  }
}
</style>
