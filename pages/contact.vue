<template>
  <div class="grid-contact">
    <section class="contact-description">
      <p class="font-bold text-gray-900 text-2xl">
        {{ $t('utils.contact') }}
      </p>
      <p class="text-sm text-gray-600">
        <extra-nuxt-link :to="{name : 'auth-register'}" class="text-md text-purple-700"
                         :title="$t('auth.connection-account')"
        >
          {{ $t('auth.connection-account') }}
        </extra-nuxt-link>
      </p>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-3/4 -md:w-full xl:w-3/4 form" @submit.prevent="submit">
        <field-email v-if="!$auth.loggedIn" v-model="data.email" :field="email" :errors="errors.email" />
        <field-textarea v-model="data.message" :field="message" :errors="errors.message" />
        <field-submit>
          {{ $t('utils.send') }}
        </field-submit>
      </form>
    </section>
    <div class="contact-image">
      <picture>
        <img loading="lazy" src="~/assets/img/background-home.jpeg" alt="home-img" class="contact-image-item">
      </picture>
    </div>
  </div>
</template>

<script>

export default {
  name: "Contact",

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
        email: "",
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
          this.$i18nToast().success(this.$t("success.contact"))
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

<style lang="scss" scoped>
.grid-contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.contact-description {
  grid-area: 1 / 1 / 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
}

.contact-image {
  grid-area: 1 / 2 / 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 4rem;
  margin-left: 4rem;
  .contact-image-item {
    object-fit: cover;
  }
}

@media screen and (max-width:1200px){
  .contact-description  {
    padding: 2rem;
  }
}

@media screen and (max-width:1000px){
  .contact-image {
    width: 100vw;
    height: 100vh;
    justify-content: end;
    margin: 0;
    transform: translate(0, -50%);
    top: 50%;
    right: 0;
    position: absolute;
    z-index: -1;
    opacity: .3;
    .contact-image-item {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  .contact-description  {
    grid-area: 1 / 1 / 1 / 3;
  }
}

.form > * + * {
  margin-top: 2rem
}
</style>
