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
            <v-form
              v-model="changeNameIsValid"
              @submit.prevent="changeName"
            >
              <NameField v-model="changeNameValue" />
              <div class="text-center">
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
              </div>
            </v-form>
          </v-col>
        </v-row>
        <v-snackbar
          v-model="changeNameResult.show"
          :color="changeNameResult.isSuccessful ? 'success darken-2' : 'error'"
        >
          {{ changeNameResult.isSuccessful ? 'Name changed successfully' : 'Error changing name' }}
          <template #action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="changeNameResult.show = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-tab-item>
      <v-tab-item>
        Security Details
      </v-tab-item>
    </v-tabs-items>
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
    changeNameResult: {
      show: false,
      isSuccessful: true,
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
    async changeName() {
      if (!this.changeNameIsValid || this.user.customData.name === this.changeNameValue) { return }
      const { realmApp } = window
      const usernameWasSet = await userSetName(realmApp, this.changeNameValue)
      this.changeNameResult.isSuccessful = usernameWasSet
      this.changeNameResult.show = true
    },
  },
}
</script>
