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
            Incorrect username or password.
          </v-alert>
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
import * as Realm from 'realm-web'

export default {
  data: vm => ({
    show: false,
    isValid: false,
    username: '',
    password: '',
    loginFailed: false,
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
  },
}
</script>
