<template>
  <div>
    Messages
  </div>
</template>

<script>
export default {
  layout: 'messages',
  data: vm => ({
    tab: 0,
    user: null,
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
  },
}
</script>
