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
          <v-alert
            v-model="loginFailed"
            color="error"
            text
            dismissible
          >
            Incorrect username or password
          </v-alert>
          <EmailField
            ref="emailField"
            v-model="email"
            disabled
            hint="Example"
            @submit="login"
          />
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
          <p class="mb-0 text-center">
            Forgot password?
            <a @click.prevent="resetPassword">Send email</a>
          </p>
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
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import * as Realm from 'realm-web'

export default {
  data: vm => ({
    show: false,
    isValid: false,
    email: '',
    username: '',
    password: '',
    loginFailed: false,
    snackbar: {
      show: false,
      color: '',
      message: '',
    },
  }),
  methods: {
    open() {
      this.show = true
      this.email = ''
      this.username = ''
      this.password = ''
      this.$refs.emailField?.resetValidation()
      this.$refs.usernameField?.resetValidation()
      this.$refs.passwordField?.resetValidation()
    },
    close() {
      this.show = false
    },
    showSnackbar(color, message) {
      this.snackbar.show = true
      this.snackbar.color = color
      this.snackbar.message = message
    },
    async login() {
      if (!this.isValid) { return }
      const { realmApp } = window
      if (!realmApp || realmApp.currentUser) { return }
      const credentials = Realm.Credentials.emailPassword(this.username, this.password)
      
      try {
        await realmApp.logIn(credentials)
        this.close()
      } catch (error) {
        this.loginFailed = true
      }
    },
    resetPassword() {
      // if (!this.email) { return }
      this.showSnackbar('info darken-2', 'This UI is meant to serve as an example, and therefore does not actually send a password reset email')
    },
  },
}
</script>
