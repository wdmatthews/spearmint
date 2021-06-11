<template>
  <v-navigation-drawer
    v-model="show"
    clipped
    app
  >
    <v-row
      no-gutters
      class="fill-height"
    >
      <v-navigation-drawer
        ref="navigationDrawer"
        permanent
        :mini-variant="isMessagesPage"
      >
        <v-list>
          <v-list-item
            v-for="(link, i) in links"
            v-show="!link.requiresAuthentication && (!realmApp || !realmApp.currentUser)
              || !link.requiresNoAuthentication && realmApp && realmApp.currentUser"
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
            <LogoutButton :only-icon="isMessagesPage" />
          </div>
        </div>
        <div v-show="!realmApp || !realmApp.currentUser">
          <div class="text-center mt-4">
            <LoginButton />
          </div>
          <div class="text-center my-4">
            <RegisterButton />
          </div>
        </div>
      </v-navigation-drawer>
      <TheContactList
        v-if="isMessagesPage"
        class="grow"
        :user="realmApp ? realmApp.currentUser : null"
      />
    </v-row>
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
    show: null,
    links: [
      {
        icon: 'mdi-home',
        label: 'Home',
        to: '/',
        requiresNoAuthentication: true,
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
    isMessagesPage() {
      return this.$route.path === '/messages'
    },
  },
  mounted() {
    addEventListener('resize', this.showSubNavigationDrawer)
  },
  methods: {
    toggleShow() {
      this.show = !this.show
      this.showSubNavigationDrawer()
    },
    showSubNavigationDrawer() {
      if (this.$refs.navigationDrawer) {
        this.$refs.navigationDrawer.isActive = true
      }
    },
  },
}
</script>
