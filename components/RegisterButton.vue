<template>
  <div>
    <v-btn
      color="secondary darken-1"
      :icon="onlyIcon"
      @click="openDialog"
    >
      <v-icon :left="!onlyIcon">
        mdi-account-plus
      </v-icon>
      <span v-show="!onlyIcon">Register</span>
    </v-btn>
    <RegisterDialog ref="registerDialog" />
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
      this.$refs.registerDialog.open()
    },
  },
}
</script>
