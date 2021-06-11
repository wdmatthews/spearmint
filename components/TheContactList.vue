<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ user ? user.customData.name : '' }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item
      v-for="contact in contacts"
      :key="contact.userId"
      link
    >
      <v-list-item-content>
        <v-list-item-title>{{ contact.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data: vm => ({
    contacts: [
      {
        userId: '1',
        name: 'User 2',
      },
    ],
  }),
}
</script>
