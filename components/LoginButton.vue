<template>
  <div>
    <v-btn
      color="primary darken-1"
      @click="openDialog"
    >
      <v-icon left>
        mdi-login-variant
      </v-icon>
      Login
    </v-btn>
    <LoginDialog ref="loginDialog" />
  </div>
</template>

<script>
export default {
  methods: {
    openDialog() {
      this.$refs.loginDialog.open()
    },
  },
}
</script>
