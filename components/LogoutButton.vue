<template>
  <v-btn
    color="primary"
    @click="logout"
  >
    Logout
  </v-btn>
</template>

<script>
export default {
  methods: {
    logout() {
      const { realmApp } = window
      realmApp.currentUser?.logOut()
    },
  },
}
</script>
