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
    messageWasReceived: false,
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
    
    // setInterval(() => {
    //   this.receiveMessage({
    //     _id: Date.now().toString(),
    //     time: Date.now(),
    //     content: 'Message',
    //     isOwnedByCurrentUser: Math.random() < 0.5,
    //   })
    // }, 1000)
  },
  updated() {
    if (this.messageWasReceived) {
      window.scrollTo(0, document.body.scrollHeight)
      this.messageWasReceived = false
    }
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
    receiveMessage(message) {
      this.messages.push(message)
      this.messageWasReceived = true
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
