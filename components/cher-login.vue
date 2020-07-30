<template>
  <div class="wrapper">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-2/4 -md:w-3/4 from-login" @submit.prevent="$emit('submit', credential)">
      <extra-field v-if="register" v-model="credential.username" :errors="errors.username" required>
        <template v-slot:label>
          {{ $t('global.username') }}
        </template>
        <template v-slot:icon>
          <icon-user class="inline text-gray-600 cursor-pointer" />
        </template>
      </extra-field>
      <extra-field v-model="credential.email" input-type="email" :errors="errors.email" required>
        <template v-slot:label>
          {{ $t('global.email') }}
        </template>
        <template v-slot:icon>
          <icon-email class="inline text-gray-600 cursor-pointer" />
        </template>
      </extra-field>
      <extra-field v-model="credential.password1" :input-type="showPassword1 ? 'text' : 'password'" :errors="errors.password1" required>
        <template v-slot:label>
          {{ $t('global.password') }}
        </template>
        <template v-slot:icon>
          <icon-lock-open v-if="showPassword1" class="inline text-gray-900 cursor-pointer" @click="tooglePassword1" />
          <icon-lock v-else class="inline text-gray-600 cursor-pointer" @click="tooglePassword1" />
        </template>
      </extra-field>
      <extra-field v-if="register" v-model="credential.password2" :input-type="showPassword2 ? 'text' : 'password'" :errors="errors.password2" required>
        <template v-slot:label>
          {{ $t('global.password-confirm') }}
        </template>
        <template v-slot:icon>
          <icon-lock-open v-if="showPassword2" class="inline text-gray-900 cursor-pointer" @click="tooglePassword2" />
          <icon-lock v-else class="inline text-gray-600 cursor-pointer" @click="tooglePassword2" />
        </template>
      </extra-field>
      <template v-else>
        <div class="flex justify-end mb-4 mx-auto text-center mt-4">
          <extra-nuxt-link :to="{name: 'auth-reset-password'}" class="text-purple-900 font-md m-sm:w-full my-auto">
            {{ $t('components.cher-login.ForgetPassword') }}
          </extra-nuxt-link>
        </div>
      </template>
      <button type="submit" class="px-2 py-2 bg-blue-600 rounded-lg text-gray-200 hover:scale-110 w-full mt-4">
        <template v-if="loading">
          loading ...
        </template>
        <template v-else-if="register">
          {{ $t("components.cher-login.login") }}
        </template>
        <template v-else>
          {{ $t("components.cher-login.register") }}
        </template>
      </button>
    </form>
  </div>
</template>

<script>
import iconLock from "@/assets/svg/lock.svg"
import iconLockOpen from "@/assets/svg/lock-open.svg"
import iconEmail from "@/assets/svg/mail.svg"
import iconUser from "@/assets/svg/user.svg"
export default {
  components: {
    iconLock,
    iconLockOpen,
    iconEmail,
    iconUser
  },
  props: {
    register: {
      type: [Boolean],
      defaultValue: false,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    errors: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data () {
    return {
      credential: {
        username: "",
        email: "",
        password1: "",
        password2: "",
      },
      showPassword1: false,
      showPassword2: false,
    }
  },
  methods: {
    submit () {
      return null
    },
    tooglePassword1 () {
      this.showPassword1 = !this.showPassword1
    },
    tooglePassword2 () {
      this.showPassword2 = !this.showPassword2
    }
  },

}
</script>

<style lang="scss" scoped>
.label {
  display: block;
}
.from-login > * + * {
    margin-top: 1em;
}
</style>
