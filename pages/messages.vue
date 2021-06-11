<template>
  <div class="mt-n4 pa-4">
    <MessageCard
      v-for="message in messages"
      :key="message._id"
      class="mt-4"
      :message="message"
      @edit="editMessage(message, $event)"
      @delete="deleteMessage(message)"
    />
  </div>
</template>

<script>
export default {
  layout: 'messages',
  data: vm => ({
    tab: 0,
    user: null,
    messages: [
      {
        _id: '1',
        time: Date.now(),
        content: 'Message 1',
        isOwnedByCurrentUser: true,
      },
      {
        _id: '2',
        time: Date.now(),
        content: 'Message 2',
        isOwnedByCurrentUser: false,
      },
    ],
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
    },
    editMessage(message, newContent) {
      message.content = newContent
    },
    deleteMessage(message) {
      this.messages.splice(this.messages.indexOf(message), 1)
    },
  },
}
</script>
