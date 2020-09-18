<template>
  <section class="bg-white shadow-md border pt-4 rounded flex flex-col justify-center items-center -md:w-full xl:w-3/4 w-3/4">
    <p class="font-bold text-gray-900 text-2xl">
      {{ $t('utils.contact') }}
    </p>
    <p class="text-sm text-gray-600">
      {{ $t('pages.contact.description') }}
    </p>
    <form class="my-4 mx-8 w-3/4 form" @submit.prevent="submit">
      <field-email v-model="data.email" :field="email" :errors="errors.email" />
      <field-textarea v-model="data.message" :field="message" :errors="errors.message" />
      <field-submit>
        {{ $t('utils.send') }}
      </field-submit>
    </form>
  </section>
</template>

<script>

export default {
  name: "Contact",

  layout: "auth",
  transition: "auth",

  data () {
    return {
      message: {
        label: this.$t("admin.model.your-message"),
        name: "message",
        required: true,
      },
      email: {
        label: this.$t("auth.field.email"),
        name: "email",
        required: true,
      },
      data: {
        email: (this.$auth.loggedIn ? this.$auth.user.email : ""),
        message: ""
      },
      errors: {
        message: [],
        email: []
      }
    }
  },

  methods: {
    submit () {
      this.loading = true
      this.errors = {
        message: [],
        email: []
      }

      this.$axios.post("contact/", this.data)
        .then(response => {
          if (response.status != 201) {
            throw Error("")
          }
          this.i18nToast.success(this.$t("success.contact"))
          this.data = {
            email: "",
            message: ""
          }
        })
        .catch(error => { this.requestError(error) })
        .finally(() => { this.loading = false })
    }
  },

  head () {
    return {
      title: this.$t("utils.contact"),
      meta: [
          { hid: "description", name: "description", content: this.$t("pages.meta.contact.description") },
          { property: "og:title", content: this.$t("pages.meta.contact.title")},
          { property: "og:site_name", content: this.$siteName },
          { property: "og:description", content: this.$t("pages.meta.contact.description")},
          { property: "og:type", content: "website"},
          { property: "og:url", content: this.$siteName},
          { name: "twitter:card", content: this.$t("pages.meta.contact.description") },
          { name: "twitter:site", content: this.$siteName},
          { name: "twitter:title", content: this.$t("pages.meta.contact.title") },
          { name: "twitter:description", content: this.$t("pages.meta.contact.description") },
          { name: "twitter:image", content: "/favicon.ico" },
          { name: "twitter:image:alt", content: this.$t("pages.meta.contact.title") }
      ]
    }
  }
}
</script>
