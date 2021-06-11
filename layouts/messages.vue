<template>
  <v-app>
    <TheNavigationDrawer
      ref="navigationDrawer"
      :realm-app="realmApp"
    />
    <TheAppBar
      ref="appBar"
      @toggle-navigation="$refs.navigationDrawer.toggleShow()"
    />
    <v-main>
      <nuxt />
    </v-main>
    <TheMessageFooter />
  </v-app>
</template>

<script>
import * as Realm from 'realm-web'

export default {
  data: vm => ({
    realmApp: null,
  }),
  mounted() {
    if (!window.realmApp) {
      window.realmApp = new Realm.App(this.$config.realmAppId)
    }
    
    this.realmApp = window.realmApp
  },
}
</script>
