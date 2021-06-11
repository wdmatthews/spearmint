<template>
  <v-footer
    app
    inset
    class="px-4 pt-4 pb-0"
  >
    <v-row
      no-gutters
      align="center"
    >
      <v-col>
        <v-form
          v-model="messageIsValid"
          @submit.prevent="sendMessage"
        >
          <MessageField
            ref="messageField"
            v-model="message"
            @submit="sendMessage"
          />
        </v-form>
      </v-col>
      <v-btn
        color="primary"
        icon
        class="ml-4"
        style="padding-bottom: 30px"
        :disabled="!messageIsValid"
        @click="sendMessage"
      >
        <v-icon>
          mdi-send
        </v-icon>
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: vm => ({
    messageIsValid: false,
    message: '',
  }),
  methods: {
    sendMessage() {
      if (!this.messageIsValid) { return }
      console.log(this.message)
      this.message = ''
      this.$refs.messageField.resetValidation()
    },
  },
}
</script>
