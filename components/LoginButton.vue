<template>
  <div>
    <v-btn
      color="primary darken-1"
      :icon="onlyIcon"
      @click="openDialog"
    >
      <v-icon :left="!onlyIcon">
        mdi-login-variant
      </v-icon>
      <span v-show="!onlyIcon">Login</span>
    </v-btn>
    <LoginDialog ref="loginDialog" />
  </div>
</template>

<script>
export default {
  props: {
    onlyIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openDialog() {
      this.$refs.loginDialog.open()
    },
  },
}
</script>
