<template>
  <admin-form-tag :create="true" />
</template>

<script>
export default {
  head() {
    const title = `${this.$t('menu-name.tag')} - ${this.$t('word.create')}`
    return {
      title,
      meta: [
        { property: 'og:title', content: title },
        { name: 'twitter:title', content: title },
        { name: 'twitter:image:alt', content: title }
      ]
    }
  }
}
</script>
