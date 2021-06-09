<template>
  <v-navigation-drawer
    v-model="show"
    clipped
    app
  >
    <v-list>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="link.label" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-if="true">
      <div class="text-center mt-4">
        <LoginButton />
      </div>
      <div class="text-center my-4">
        <RegisterButton />
      </div>
    </template>
    <template v-else>
      <div class="text-center my-4">
        <LogoutButton />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: vm => ({
    show: null,
    links: [
      {
        icon: 'mdi-home',
        label: 'Home',
        to: '/',
      },
    ],
  }),
  methods: {
    toggleShow() {
      this.show = !this.show
    },
  },
}
</script>
