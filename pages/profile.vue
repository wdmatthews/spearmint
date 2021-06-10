<template>
  <span>Profile</span>
</template>

<script>
export default {
  mounted() {
    const { realmApp } = window
    
    if (realmApp && !realmApp.currentUser) {
      this.$router.push('/')
    }
  },
}
</script>
