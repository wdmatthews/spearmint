<template>
  <v-app>
    <TheNavigationDrawer ref="navigationDrawer" />
    <TheAppBar
      ref="appBar"
      @toggle-navigation="$refs.navigationDrawer.toggleShow()"
    />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  
}
</script>
