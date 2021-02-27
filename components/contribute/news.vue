<template>
  <div class="flex flex-col dark:bg-gray-800 rounded-lg">
    <h2 class="text-4xl p-2">
      <svg-icon name="news" />
      {{ $t('text.last-news') }}
    </h2>
    <div class="flex flex-col space-y-3 px-2">
      <article v-for="obj in news" :key="obj.id" class="w-full shadow-md p-2 rounded-lg dark:bg-gray-700">
        <h2 class="text-2xl capitalize my-3 font-medium cursor-pointer hover:text-indigo-700 dark:hover:text-gray-900" @click="setActiveNews(obj)">
          <svg-icon name="arrow-right" class="transform transition-transform duration-300" :class="{'rotate-90': activeNews == obj}" />
          {{ obj.title }}
          <br />
          <time class="italic text-base">
            {{ getDate(toDate(obj.date), $i18n.locale) }}
          </time>
        </h2>
        <p class="text-base whitespace-pre-wrap dark:text-gray-400 font-medium" :class="{'truncate break-all': activeNews != obj}">{{ obj.text }}</p>
        <div v-if="activeNews === obj" class="p-2 mt-2 italic text-gray-700 dark:text-gray-400">
          {{ obj.author }}.
        </div>
      </article>
      <div v-if="news.length" class="mt-2 pb-2 text-center">
        <admin-utils-pagination :length="newsLength" @change="setPagination" />
        <span class="text-md italic float-right opacity-75">
          {{ $t('word.total') }} : {{ newsLength }}
        </span>
      </div>
      <div v-else class="shadow-md p-2 rounded-lg dark:bg-gray-700 text-center my-3 italic">
        {{ $t('text.no-news-available') }}
      </div>
    </div>
  </div>
</template>

<script>
import { getDate } from "~/lib/date"
export default {

  data () {
    return {
      news: [],
      newsLength: 0,
      page: 1,
      isCompleted: false,
      activeNews: null
    }
  },

  computed: {
    url () {
      return `news/?page=${this.page}`
    },
  },

  created () {
    this.refresh()
  },

  methods: {
    getDate,
    toDate (date) {
      return new Date(date)
    },
    setActiveNews (obj) {
      if (obj === this.activeNews) {
        this.activeNews = null
      } else {
        this.activeNews = obj
      }
    },
    setPagination (num) {
      this.page = num
      this.refresh()
    },
    refresh () {
      if (this.isCompleted) {
        return
      }
      this.$axios.get(this.url)
        .then(r => {
          if (r.status !== 200) {
            throw new Error("errer-server")
          }
          this.news = r.data.results
          this.newsLength = r.data.count
          this.isCompleted = !!r.data.next
        })
        .catch(this.responseError)
    }
  }

}
</script>
