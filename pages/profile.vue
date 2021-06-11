<template>
  <div>
    <v-tabs
      v-model="tab"
      centered
    >
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Account
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-shield-account
        </v-icon>
        Security
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="tab"
      style="background-color: transparent;"
    >
      <v-tab-item>
        <v-row
          no-gutters
          justify="center"
          align="center"
          class="pa-4"
        >
          <v-col
            cols="12"
            md="6"
          >
            <v-card class="mb-4">
              <v-card-title class="pa-4">
                <span class="mx-auto">Change Name</span>
              </v-card-title>
              <v-card-text class="px-4 py-0">
                <v-form
                  v-model="changeNameIsValid"
                  @submit.prevent="changeName"
                >
                  <NameField v-model="changeNameValue" />
                </v-form>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer />
                <v-btn
                  color="primary darken-1"
                  :disabled="!changeNameIsValid || !user || user.customData.name === changeNameValue"
                  @click="changeName"
                >
                  <v-icon left>
                    mdi-pencil
                  </v-icon>
                  Change
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
            <v-card>
              <v-card-title class="pa-4">
                <span class="mx-auto">Delete Account (Example)</span>
              </v-card-title>
              <v-card-text class="px-4 py-0">
                <v-form
                  v-model="deleteAccountIsValid"
                  @submit.prevent="deleteAccount"
                >
                  <v-alert
                    color="info"
                    text
                  >
                    This UI is meant to serve as an example, and therefore does not actually delete your account
                  </v-alert>
                  <p class="text-center">
                    Are you sure? <strong class="error--text">This cannot be undone</strong>
                  </p>
                  <NameField
                    v-model="deleteAccountNameValue"
                    hint="Enter your name to confirm"
                    :additional-rules="[v => user && v === user.customData.name || 'Must match account name']"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer />
                <v-btn
                  color="error"
                  :disabled="!deleteAccountIsValid || !user || user.customData.name !== deleteAccountNameValue"
                  @click="deleteAccount"
                >
                  <v-icon left>
                    mdi-account-remove
                  </v-icon>
                  Delete
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row
          no-gutters
          justify="center"
          align="center"
          class="pa-4"
        >
          <v-col
            cols="12"
            md="6"
          >
            <v-card class="mb-4">
              <v-card-title class="pa-4">
                <span class="mx-auto">Reset Password (Example)</span>
              </v-card-title>
              <v-card-text class="px-4 py-0">
                <v-form
                  v-model="resetPasswordIsValid"
                  @submit.prevent="resetPassword"
                >
                  <v-alert
                    color="info"
                    text
                  >
                    This UI is meant to serve as an example, and therefore does not actually send you a password reset email
                  </v-alert>
                  <EmailField v-model="resetPasswordEmail" />
                </v-form>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer />
                <v-btn
                  color="primary darken-1"
                  :disabled="!resetPasswordIsValid || !user"
                  @click="resetPassword"
                >
                  <v-icon left>
                    mdi-email
                  </v-icon>
                  Reset
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
            <v-card>
              <v-card-title class="pa-4">
                <span class="mx-auto">Change Password (Example)</span>
              </v-card-title>
              <v-card-text class="px-4 py-0">
                <v-form
                  v-model="changePasswordIsValid"
                  @submit.prevent="changePassword"
                >
                  <v-alert
                    color="info"
                    text
                  >
                    This UI is meant to serve as an example, and therefore does not actually change your password
                  </v-alert>
                  <PasswordField
                    v-model="changePasswordOldValue"
                    label="Old Password"
                    @submit="changePassword"
                  />
                  <PasswordField
                    v-model="changePasswordNewValue"
                    label="New Password"
                    :additional-rules="[v => v !== changePasswordOldValue || 'Must be different from old password']"
                    @submit="changePassword"
                  />
                  <PasswordField
                    v-model="changePasswordConfirmValue"
                    label="Confirm Password"
                    :additional-rules="[v => v === changePasswordNewValue || 'Must match new password']"
                    @submit="changePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-spacer />
                <v-btn
                  color="primary darken-1"
                  :disabled="!changePasswordIsValid || !user || changePasswordOldValue === changePasswordNewValue
                    || changePasswordNewValue !== changePasswordConfirmValue"
                  @click="changePassword"
                >
                  <v-icon left>
                    mdi-pencil
                  </v-icon>
                  Change
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
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
  </div>
</template>

<script>
import userSetName from '@/assets/js/functions/userSetName.js'

export default {
  data: vm => ({
    tab: 0,
    user: false,
    changeNameIsValid: false,
    changeNameValue: '',
    deleteAccountIsValid: false,
    deleteAccountNameValue: '',
    resetPasswordIsValid: false,
    resetPasswordEmail: '',
    changePasswordIsValid: false,
    changePasswordOldValue: '',
    changePasswordNewValue: '',
    changePasswordConfirmValue: '',
    snackbar: {
      show: false,
      color: '',
      message: '',
    },
  }),
  mounted() {
    const { realmApp } = window
    
    if (!realmApp) {
      const interval = setInterval(() => {
        const { realmApp } = window
        if (!realmApp) { return }
        this.load()
        clearInterval(interval)
      }, 1)
      return
    }
    
    this.load()
  },
  methods: {
    load() {
      const { realmApp } = window
      
      if (!realmApp.currentUser) {
        this.$router.push('/')
        return
      }
      
      this.user = realmApp.currentUser
      this.changeNameValue = this.user.customData.name
    },
    showSnackbar(color, message) {
      this.snackbar.show = true
      this.snackbar.color = color
      this.snackbar.message = message
    },
    async changeName() {
      if (!this.changeNameIsValid || !this.user
        || this.user.customData.name === this.changeNameValue) { return }
      const { realmApp } = window
      const usernameWasSet = await userSetName(realmApp, this.changeNameValue)
      this.showSnackbar(usernameWasSet ? 'success darken-2' : 'error',
        usernameWasSet ? 'Name changed successfully' : 'Error changing name')
    },
    deleteAccount() {
      if (!this.deleteAccountIsValid || !this.user
        || this.user.customData.name !== this.deleteAccountNameValue) { return }
      const accountWasDeleted = true
      this.showSnackbar(accountWasDeleted ? 'success darken-2' : 'error',
        accountWasDeleted ? 'Account deleted successfully' : 'Error deleting account')
    },
    resetPassword() {
      if (!this.resetPasswordIsValid || !this.user) { return }
      const passwordWasReset = true
      this.showSnackbar(passwordWasReset ? 'success darken-2' : 'error',
        passwordWasReset ? 'Password reset successfully' : 'Error resetting password')
    },
    changePassword() {
      if (!this.changePasswordIsValid || !this.user
        || this.changePasswordOldValue === this.changePasswordNewValue
        || this.changePasswordNewValue !== this.changePasswordConfirmValue) { return }
      const passwordWasSet = true
      this.showSnackbar(passwordWasSet ? 'success darken-2' : 'error',
        passwordWasSet ? 'Password changed successfully' : 'Error changing password')
    },
  },
}
</script>
