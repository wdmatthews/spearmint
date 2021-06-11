<template>
  <v-dialog
    v-model="show"
    max-width="500"
    @click:outside="close"
  >
    <v-card>
      <v-card-title class="pa-4">
        <span class="mx-auto">Register</span>
      </v-card-title>
      <v-card-text class="px-4 py-0">
        <v-form
          v-model="isValid"
          @submit.prevent="register"
        >
          <v-alert
            v-model="registerFailed"
            color="error"
            text
            dismissible
          >
            Account already exists
          </v-alert>
          <NameField
            ref="nameField"
            v-model="name"
            @submit="register"
          />
          <EmailField
            ref="emailField"
            v-model="email"
            disabled
            hint="Example"
            @submit="register"
          />
          <UsernameField
            ref="usernameField"
            v-model="username"
            @submit="register"
          />
          <PasswordField
            ref="passwordField"
            v-model="password"
            @submit="register"
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
          @click="register"
        >
          Register
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as Realm from 'realm-web'
import userInitialize from '@/assets/js/functions/userInitialize.js'

export default {
  data: vm => ({
    show: false,
    isValid: false,
    name: '',
    email: '',
    username: '',
    password: '',
    registerFailed: false,
  }),
  methods: {
    open() {
      this.show = true
      this.name = ''
      this.email = ''
      this.username = ''
      this.password = ''
      this.$refs.nameField?.resetValidation()
      this.$refs.emailField?.resetValidation()
      this.$refs.usernameField?.resetValidation()
      this.$refs.passwordField?.resetValidation()
    },
    close() {
      this.show = false
    },
    async register() {
      if (!this.isValid) { return }
      const { realmApp } = window
      if (!realmApp || realmApp.currentUser) { return }
      
      try {
        await realmApp.emailPasswordAuth.registerUser(this.username, this.password)
        const credentials = Realm.Credentials.emailPassword(this.username, this.password)
        
        try {
          await realmApp.logIn(credentials)
          await userInitialize(realmApp, this.name)
          this.close()
          
          if (this.$route.path === '/') {
            this.$router.push('/messages')
          }
        } catch (error) {
          this.loginFailed = true
        }
      } catch (error) {
        this.registerFailed = true
      }
    },
  },
}
</script>
