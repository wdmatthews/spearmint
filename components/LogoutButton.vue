<template>
  <v-btn
    color="primary darken-1"
    @click="logout"
  >
    <v-icon left>
      mdi-logout-variant
    </v-icon>
    Logout
  </v-btn>
</template>

<script>
export default {
  methods: {
    logout() {
      const { realmApp } = window
      if (!realmApp || !realmApp.currentUser) { return }
      realmApp.currentUser.logOut()
      
      if (this.$route.path === '/profile') {
        this.$router.push('/')
      }
    },
  },
}
</script>
