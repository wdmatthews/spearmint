<template>
  <v-dialog
    v-model="show"
    max-width="500"
    @click:outside="close"
  >
    <v-card>
      <v-card-title class="pa-4">
        <span class="mx-auto">Login</span>
      </v-card-title>
      <v-card-text class="px-4 py-0">
        <v-form
          v-model="isValid"
          @submit.prevent="login"
        >
          <UsernameField
            ref="usernameField"
            v-model="username"
            @submit="login"
          />
          <PasswordField
            ref="passwordField"
            v-model="password"
            @submit="login"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="py-4">
        <v-spacer />
        <v-btn
          text
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          text
          :disabled="!isValid"
          @click="login"
        >
          Login
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: vm => ({
    show: false,
    isValid: false,
    username: '',
    password: '',
  }),
  methods: {
    open() {
      this.show = true
      this.username = ''
      this.password = ''
      this.$refs.usernameField?.resetValidation()
      this.$refs.passwordField?.resetValidation()
    },
    close() {
      this.show = false
    },
    login() {
      if (!this.isValid) { return }
      this.close()
    },
  },
}
</script>
