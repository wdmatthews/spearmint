<template>
  <div>
    <v-btn
      color="secondary darken-1"
      @click="openDialog"
    >
      <v-icon left>
        mdi-account-plus
      </v-icon>
      <span>Register</span>
    </v-btn>
    <RegisterDialog ref="registerDialog" />
  </div>
</template>

<script>
export default {
  methods: {
    openDialog() {
      this.$refs.registerDialog.open()
    },
  },
}
</script>
