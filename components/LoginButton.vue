<template>
  <div>
    <v-btn
      color="primary"
      @click="openDialog"
    >
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
