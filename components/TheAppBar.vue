<template>
  <v-app-bar
    clipped-left
    app
  >
    <v-app-bar-nav-icon @click.stop="$emit('toggle-navigation')" />
    <v-toolbar-title v-text="title" />
  </v-app-bar>
</template>

<script>
export default {
  data: vm => ({
    title: 'Spearmint',
  }),
}
</script>
