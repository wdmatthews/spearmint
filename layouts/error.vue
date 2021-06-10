<template>
  <v-app>
    <v-row
      no-gutters
      justify="center"
      align="center"
    >
      <v-card>
        <v-img
          class="mx-auto"
          style="max-width: 512px; max-height: 512px;"
          :src="isError404 ? '/404.png' : '/error.png'"
        />
        <v-card-title class="pa-4">
          <span class="mx-auto">{{ isError404 ? 'Page Not Found' : 'Error' }}</span>
        </v-card-title>
        <v-card-text class="px-4 py-0 text-center">
          {{ isError404 ? 'This page was not found.' : 'An error occurred.' }}
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="primary"
            to="/"
          >
            <v-icon left>
              mdi-home
            </v-icon>
            Home
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: vm => ({
    title: vm.isError404 ? 'Page Not Found' : 'Error',
  }),
  computed: {
    isError404() {
      return this.error.statusCode === 404
    },
  },
}
</script>
