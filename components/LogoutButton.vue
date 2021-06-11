<template>
  <v-btn
    color="primary darken-1"
    :icon="onlyIcon"
    @click="logout"
  >
    <v-icon :left="!onlyIcon">
      mdi-logout-variant
    </v-icon>
    <span v-show="!onlyIcon">Logout</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    onlyIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    logout() {
      const { realmApp } = window
      if (!realmApp || !realmApp.currentUser) { return }
      realmApp.currentUser.logOut()
      
      if (this.$route.path === '/profile' || this.$route.path === '/messages') {
        this.$router.push('/')
      }
    },
  },
}
</script>
