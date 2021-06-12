<template>
  <v-list>
    <div class="px-4 pt-4 text-center">
      <v-btn
        color="primary"
        @click="startAddingContact"
      >
        <v-icon left>
          mdi-account-plus
        </v-icon>
        Contact
      </v-btn>
    </div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ user ? user.customData.name : '' }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item
      v-for="contact in contacts"
      :key="contact.userId"
      link
    >
      <v-list-item-content>
        <v-list-item-title>{{ contact.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-dialog
      v-model="showAddContactDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="pa-4">
          <span class="mx-auto">Add Contact</span>
        </v-card-title>
        <v-card-text class="px-4 py-0">
          <v-form
            ref="addContactForm"
            v-model="addContactIsValid"
            @submit.prevent="addContact"
          >
            <UsernameField
              ref="usernameField"
              v-model="addContactUsernameValue"
              @submit="addContact"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            text
            @click="cancelAddingContact"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            :disabled="!addContactIsValid"
            @click="addContact"
          >
            Add
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data: vm => ({
    contacts: [
      {
        userId: '1',
        name: 'User 2',
      },
    ],
    showAddContactDialog: false,
    addContactIsValid: false,
    addContactUsernameValue: '',
  }),
  methods: {
    startAddingContact() {
      this.addContactUsernameValue = ''
      this.$refs.addContactForm?.resetValidation()
      this.showAddContactDialog = true
    },
    cancelAddingContact() {
      this.showAddContactDialog = false
    },
    addContact() {
      console.log(this.addContactUsernameValue)
    },
  },
}
</script>
