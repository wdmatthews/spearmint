<template>
  <v-row
    no-gutters
    align="center"
  >
    <v-spacer v-show="message.isOwnedByCurrentUser" />
    <v-card
      :class="{
        'rounded-0': true,
        'rounded-bl': !message.isOwnedByCurrentUser,
        'rounded-br': message.isOwnedByCurrentUser,
        'rounded-tl': message.isOwnedByCurrentUser,
        'rounded-tr': !message.isOwnedByCurrentUser,
      }"
    >
      <v-card-subtitle>
        {{ formatTime(message.time) }}
      </v-card-subtitle>
      <v-card-text class="white--text">
        {{ message.content }}
      </v-card-text>
    </v-card>
    <v-menu
      offset-y
      nudge-bottom="8px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-show="message.isOwnedByCurrentUser"
          color="primary"
          icon
          class="ml-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="startEditing">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item @click="showDeleteDialog = true">
          <v-list-item-icon>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="showEditDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="pa-4">
          <span class="mx-auto">Edit Message</span>
        </v-card-title>
        <v-card-text class="px-4 py-0">
          <v-form
            v-model="editMessageIsValid"
            @submit.prevent="editMessage"
          >
            <MessageField
              ref="messageField"
              v-model="editMessageValue"
              :additional-rules="[v => v !== message.content || '']"
              @submit="editMessage"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            text
            @click="cancelEditing"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            :disabled="!editMessageIsValid"
            @click="editMessage"
          >
            Edit
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showDeleteDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="pa-4">
          <span class="mx-auto">Delete Message</span>
        </v-card-title>
        <v-card-text class="px-4 py-0">
          <p class="text-center mb-0">
            Are you sure? <strong class="error--text">This cannot be undone</strong>
          </p>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            text
            @click="cancelDeleting"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="deleteMessage"
          >
            Delete
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {},
    },
  },
  data: vm => ({
    isEditing: false,
    showEditDialog: false,
    editMessageIsValid: false,
    editMessageValue: '',
    showDeleteDialog: false,
  }),
  mounted() {
    this.$watch('message', this.cancelEditing, { deep: true })
  },
  methods: {
    formatTime(time) {
      const date = new Date(time)
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substring(2)} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    startEditing() {
      this.editMessageValue = this.message.content
      this.$refs.messageField?.resetValidation()
      this.showEditDialog = true
    },
    cancelEditing() {
      this.showEditDialog = false
    },
    editMessage() {
      this.$emit('edit', this.editMessageValue)
    },
    startDeleting() {
      this.showDeleteDialog = true
    },
    cancelDeleting() {
      this.showDeleteDialog = false
    },
    deleteMessage() {
      this.$emit('delete')
    },
  },
}
</script>
