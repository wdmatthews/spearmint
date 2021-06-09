<template>
  <div>
    <v-btn
      color="secondary"
      @click="openDialog"
    >
      Register
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
