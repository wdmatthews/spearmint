<template>
  <v-navigation-drawer
    ref="navigationDrawer"
    v-model="show"
    clipped
    app
    :mini-variant="canBeMini"
    :expand-on-hover="canBeMini"
  >
    <v-list>
      <v-list-item
        v-for="(link, i) in links"
        v-show="!link.requiresAuthentication || realmApp && realmApp.currentUser"
        :key="i"
        router
        exact
        :to="link.to"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="link.label" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-show="realmApp && realmApp.currentUser">
      <div class="text-center my-4">
        <LogoutButton :only-icon="isMini" />
      </div>
    </div>
    <div v-show="!realmApp || !realmApp.currentUser || true">
      <div class="text-center mt-4">
        <LoginButton :only-icon="isMini" />
      </div>
      <div class="text-center my-4">
        <RegisterButton :only-icon="isMini" />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    realmApp: {
      type: Object,
      default: null,
    },
  },
  data: vm => ({
    isMounted: false,
    show: null,
    links: [
      {
        icon: 'mdi-home',
        label: 'Home',
        to: '/',
        requiresAuthentication: false,
      },
      {
        icon: 'mdi-account',
        label: 'Profile',
        to: '/profile',
        requiresAuthentication: true,
      },
      {
        icon: 'mdi-forum',
        label: 'Messages',
        to: '/messages',
        requiresAuthentication: true,
      },
    ],
  }),
  computed: {
    linksRequiringAuthentication() {
      return this.links.reduce((links, link) => links.concat(link.to), [])
    },
    canBeMini() {
      return !this.isMobile && this.$route.path === '/messages'
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    },
    isMini() {
      return this.canBeMini && this.isMounted && this.$refs.navigationDrawer.isMiniVariant
    },
  },
  mounted() {
    this.isMounted = true
    
    if (!this.realmApp?.currentUser && this.linksRequiringAuthentication.includes(this.$route.path)) {
      this.$router.push('/')
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
  },
}
</script>
